import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { shortenUrlSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Add simple user agent parser function directly in this file
function parseUserAgent(userAgent: string): string {
  if (!userAgent) return "Unknown";
  
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) return "Internet Explorer";
  if (userAgent.includes("Opera") || userAgent.includes("OPR/")) return "Opera";
  
  return "Other";
}

// Rate limiting implementation
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const RATE_LIMIT_MAX = 100; // Requests per hour

// Simple API key validation - in a real system, this would be more robust
const API_KEYS = new Set(["demo-api-key"]); // Demo key for testing

// Middleware to validate API key
function validateApiKey(req: Request, res: Response, next: () => void) {
  const apiKey = req.headers["x-api-key"];
  
  if (!apiKey || !API_KEYS.has(apiKey.toString())) {
    return res.status(401).json({
      error: "Invalid or missing API key",
      details: "Please provide a valid API key in the X-API-Key header"
    });
  }
  
  next();
}

// Middleware for rate limiting
function rateLimiter(req: Request, res: Response, next: () => void) {
  // Use IP address or API key as identifier (or both)
  const identifier = req.headers["x-api-key"]?.toString() || req.ip || "unknown";
  const now = Date.now();
  
  let entry = rateLimits.get(identifier);
  
  if (!entry || entry.resetAt < now) {
    // New entry or expired window
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW };
    rateLimits.set(identifier, entry);
    next();
    return;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader("Retry-After", retryAfter.toString());
    return res.status(429).json({
      error: "Rate limit exceeded",
      retryAfter
    });
  }
  
  // Increment and continue
  entry.count += 1;
  rateLimits.set(identifier, entry);
  next();
}

// Helper to parse the referrer domain
function parseReferrer(req: Request): string | undefined {
  const referer = req.headers.referer;
  if (!referer) return undefined;
  
  try {
    const url = new URL(referer);
    return url.hostname;
  } catch (error) {
    return undefined;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the static HTML page
  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
  });
  
  // Add API Routes
  
  // 1. Shorten URL endpoint
  app.post("/api/shorten", validateApiKey, rateLimiter, async (req: Request, res: Response) => {
    try {
      // Validate request body
      const { url, customSlug } = shortenUrlSchema.parse(req.body);
      
      try {
        // Create shortened URL
        const shortenedUrl = await storage.createUrl(url, customSlug);
        
        // Get base URL for constructing the short URL
        const baseUrl = process.env.BASE_URL || 
                        `http://${req.headers.host || 'localhost:5000'}`;
        
        // Return success response
        res.status(200).json({
          success: true,
          shortUrl: `${baseUrl}/${shortenedUrl.slug}`,
          originalUrl: shortenedUrl.originalUrl,
          created: shortenedUrl.createdAt.toISOString(),
          expiresAt: null // Our URLs don't expire
        });
      } catch (error) {
        // Handle duplicate slug error
        if (error instanceof Error && error.message.includes("already in use")) {
          return res.status(409).json({
            error: "Conflict",
            details: "The requested custom slug is already in use"
          });
        }
        
        // Handle other errors
        console.error("Error creating shortened URL:", error);
        res.status(500).json({
          error: "Internal Server Error",
          details: "An error occurred while creating the shortened URL"
        });
      }
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          error: "Bad Request",
          details: validationError.message
        });
      }
      
      // Handle other errors
      console.error("Error processing request:", error);
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  });
  
  // 2. URL Stats endpoint
  app.get("/api/stats/:slug", validateApiKey, rateLimiter, async (req: Request, res: Response) => {
    const { slug } = req.params;
    
    try {
      const stats = await storage.getUrlStats(slug);
      
      if (!stats) {
        return res.status(404).json({
          error: "Not Found",
          details: "The requested shortened URL does not exist"
        });
      }
      
      res.status(200).json(stats);
    } catch (error) {
      console.error("Error fetching URL stats:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: "An error occurred while fetching URL statistics"
      });
    }
  });
  
  // 3. Get all URLs (for dashboard)
  app.get("/api/urls", validateApiKey, rateLimiter, async (_req: Request, res: Response) => {
    try {
      const urls = await storage.getAllUrls();
      
      // Format response
      const baseUrl = process.env.BASE_URL || 
                     `http://${_req.headers.host || 'localhost:5000'}`;
      
      const formattedUrls = urls.map(url => ({
        slug: url.slug,
        shortUrl: `${baseUrl}/${url.slug}`,
        originalUrl: url.originalUrl,
        clicks: url.clicks,
        created: url.createdAt.toISOString(),
        lastClickedAt: url.lastClickedAt ? url.lastClickedAt.toISOString() : null
      }));
      
      res.status(200).json(formattedUrls);
    } catch (error) {
      console.error("Error fetching URLs:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: "An error occurred while fetching URLs"
      });
    }
  });
  
  // 4. Redirect endpoint for shortened URLs
  app.get("/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    
    try {
      const url = await storage.getUrlBySlug(slug);
      
      if (!url) {
        return res.status(404).send("URL not found");
      }
      
      // Parse user agent and referrer for stats
      const browserName = parseUserAgent(req.headers["user-agent"] || "");
      const referrer = parseReferrer(req);
      
      // Increment click count asynchronously (don't wait for it)
      storage.incrementUrlClicks(slug, referrer, browserName)
        .catch(err => console.error("Error incrementing click count:", err));
      
      // Redirect to the original URL
      res.redirect(url.originalUrl);
    } catch (error) {
      console.error("Error processing redirect:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}

// Additional utility functions can be added here
