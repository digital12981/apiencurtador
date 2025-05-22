import { 
  users, 
  urls, 
  referrers, 
  browsers, 
  type User, 
  type InsertUser, 
  type Url,
  type Referrer,
  type Browser,
  type UrlStats
} from "@shared/schema";
import { nanoid } from "nanoid";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // URL shortener methods
  createUrl(originalUrl: string, customSlug?: string): Promise<Url>;
  getUrlBySlug(slug: string): Promise<Url | undefined>;
  incrementUrlClicks(slug: string, referrer?: string, browserName?: string): Promise<void>;
  getAllUrls(limit?: number): Promise<Url[]>;
  getUrlStats(slug: string): Promise<UrlStats | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private urls: Map<string, Url>; // Map by slug for fast lookup
  private urlsById: Map<number, Url>; // Map by ID
  private referrers: Map<number, Referrer[]>; // Map urlId to referrer array
  private browsers: Map<number, Browser[]>; // Map urlId to browser array
  
  currentId: number;
  urlCurrentId: number;
  referrerCurrentId: number;
  browserCurrentId: number;

  constructor() {
    this.users = new Map();
    this.urls = new Map();
    this.urlsById = new Map();
    this.referrers = new Map();
    this.browsers = new Map();
    
    this.currentId = 1;
    this.urlCurrentId = 1;
    this.referrerCurrentId = 1;
    this.browserCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // URL shortener methods
  async createUrl(originalUrl: string, customSlug?: string): Promise<Url> {
    // Generate a slug if not provided, ensuring it's unique
    let slug = customSlug;
    if (!slug) {
      // Generate a relatively short but unique slug (7 chars)
      do {
        slug = nanoid(7);
      } while (this.urls.has(slug));
    } else if (this.urls.has(slug)) {
      throw new Error("This custom slug is already in use");
    }
    
    const id = this.urlCurrentId++;
    const now = new Date();
    const url: Url = {
      id,
      originalUrl,
      slug,
      clicks: 0,
      createdAt: now,
      lastClickedAt: null,
      userId: null
    };
    
    this.urls.set(slug, url);
    this.urlsById.set(id, url);
    this.referrers.set(id, []);
    this.browsers.set(id, []);
    
    return url;
  }
  
  async getUrlBySlug(slug: string): Promise<Url | undefined> {
    return this.urls.get(slug);
  }
  
  async incrementUrlClicks(slug: string, referrer?: string, browserName?: string): Promise<void> {
    const url = this.urls.get(slug);
    if (!url) return;
    
    // Update click count and timestamp
    url.clicks += 1;
    url.lastClickedAt = new Date();
    
    // Update referrer if available
    if (referrer) {
      const referrers = this.referrers.get(url.id) || [];
      const existingReferrer = referrers.find(r => r.domain === referrer);
      
      if (existingReferrer) {
        existingReferrer.count += 1;
      } else {
        referrers.push({
          id: this.referrerCurrentId++,
          urlId: url.id,
          domain: referrer,
          count: 1
        });
      }
      
      this.referrers.set(url.id, referrers);
    }
    
    // Update browser stats if available
    if (browserName) {
      const browsers = this.browsers.get(url.id) || [];
      const existingBrowser = browsers.find(b => b.name === browserName);
      
      if (existingBrowser) {
        existingBrowser.count += 1;
      } else {
        browsers.push({
          id: this.browserCurrentId++,
          urlId: url.id,
          name: browserName,
          count: 1
        });
      }
      
      this.browsers.set(url.id, browsers);
    }
  }
  
  async getAllUrls(limit = 10): Promise<Url[]> {
    // Convert to array, sort by creation date (newest first) and limit
    return Array.from(this.urlsById.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  async getUrlStats(slug: string): Promise<UrlStats | undefined> {
    const url = this.urls.get(slug);
    if (!url) return undefined;
    
    // Get base URL for constructing the short URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    return {
      slug: url.slug,
      originalUrl: url.originalUrl,
      shortUrl: `${baseUrl}/${url.slug}`,
      created: url.createdAt.toISOString(),
      clicks: url.clicks,
      lastClickedAt: url.lastClickedAt ? url.lastClickedAt.toISOString() : null,
      referrers: (this.referrers.get(url.id) || []).map(r => ({
        domain: r.domain,
        count: r.count
      })),
      browsers: (this.browsers.get(url.id) || []).map(b => ({
        name: b.name,
        count: b.count
      }))
    };
  }
}

export const storage = new MemStorage();
