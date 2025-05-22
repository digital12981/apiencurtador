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
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// Keep the storage interface the same
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

// Implement the database storage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async createUrl(originalUrl: string, customSlug?: string): Promise<Url> {
    // Generate a slug if not provided
    let slug = customSlug;
    if (!slug) {
      // Generate a relatively short but unique slug (7 chars)
      slug = nanoid(7);
      
      // Check if slug exists
      const existingUrl = await this.getUrlBySlug(slug);
      if (existingUrl) {
        // If collision, regenerate
        return this.createUrl(originalUrl);
      }
    } else {
      // Check if custom slug is already in use
      const existingUrl = await this.getUrlBySlug(slug);
      if (existingUrl) {
        throw new Error("This custom slug is already in use");
      }
    }
    
    // Insert the URL
    const [url] = await db.insert(urls).values({
      originalUrl,
      slug,
      clicks: 0,
      createdAt: new Date(),
      lastClickedAt: null,
      userId: null
    }).returning();
    
    return url;
  }
  
  async getUrlBySlug(slug: string): Promise<Url | undefined> {
    const [url] = await db.select().from(urls).where(eq(urls.slug, slug));
    return url;
  }
  
  async incrementUrlClicks(slug: string, referrer?: string, browserName?: string): Promise<void> {
    // Get URL
    const url = await this.getUrlBySlug(slug);
    if (!url) return;
    
    // Update click count and timestamp
    await db.update(urls)
      .set({ 
        clicks: url.clicks + 1,
        lastClickedAt: new Date()
      })
      .where(eq(urls.id, url.id));
    
    // Update referrer if available
    if (referrer) {
      // Check if referrer exists
      const existingReferrers = await db.select()
        .from(referrers)
        .where(eq(referrers.urlId, url.id));
      
      const existingReferrer = existingReferrers.find(r => r.domain === referrer);
      
      if (existingReferrer) {
        // Update count
        await db.update(referrers)
          .set({ count: existingReferrer.count + 1 })
          .where(eq(referrers.id, existingReferrer.id));
      } else {
        // Insert new referrer
        await db.insert(referrers).values({
          urlId: url.id,
          domain: referrer,
          count: 1
        });
      }
    }
    
    // Update browser stats if available
    if (browserName) {
      // Check if browser exists
      const existingBrowsers = await db.select()
        .from(browsers)
        .where(eq(browsers.urlId, url.id));
      
      const existingBrowser = existingBrowsers.find(b => b.name === browserName);
      
      if (existingBrowser) {
        // Update count
        await db.update(browsers)
          .set({ count: existingBrowser.count + 1 })
          .where(eq(browsers.id, existingBrowser.id));
      } else {
        // Insert new browser
        await db.insert(browsers).values({
          urlId: url.id,
          name: browserName,
          count: 1
        });
      }
    }
  }
  
  async getAllUrls(limit = 10): Promise<Url[]> {
    return db.select()
      .from(urls)
      .orderBy(desc(urls.createdAt))
      .limit(limit);
  }
  
  async getUrlStats(slug: string): Promise<UrlStats | undefined> {
    const url = await this.getUrlBySlug(slug);
    if (!url) return undefined;
    
    // Get referrers
    const urlReferrers = await db.select()
      .from(referrers)
      .where(eq(referrers.urlId, url.id));
    
    // Get browsers
    const urlBrowsers = await db.select()
      .from(browsers)
      .where(eq(browsers.urlId, url.id));
    
    // Get base URL for constructing the short URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    return {
      slug: url.slug,
      originalUrl: url.originalUrl,
      shortUrl: `${baseUrl}/${url.slug}`,
      created: url.createdAt.toISOString(),
      clicks: url.clicks,
      lastClickedAt: url.lastClickedAt ? url.lastClickedAt.toISOString() : null,
      referrers: urlReferrers.map(r => ({
        domain: r.domain,
        count: r.count
      })),
      browsers: urlBrowsers.map(b => ({
        name: b.name,
        count: b.count
      }))
    };
  }
}

// Use database storage instead of memory storage
export const storage = new DatabaseStorage();
