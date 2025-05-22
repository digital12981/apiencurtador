import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// URL schema for our URL shortener
export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  originalUrl: text("original_url").notNull(),
  slug: text("slug").notNull().unique(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastClickedAt: timestamp("last_clicked_at"),
  userId: integer("user_id").references(() => users.id),
});

// Optional referrer tracking table
export const referrers = pgTable("referrers", {
  id: serial("id").primaryKey(),
  urlId: integer("url_id").notNull().references(() => urls.id),
  domain: text("domain").notNull(),
  count: integer("count").notNull().default(0),
});

// Browser statistics tracking table
export const browsers = pgTable("browsers", {
  id: serial("id").primaryKey(),
  urlId: integer("url_id").notNull().references(() => urls.id),
  name: text("name").notNull(),
  count: integer("count").notNull().default(0),
});

// Insert schemas with validation
export const insertUrlSchema = createInsertSchema(urls)
  .pick({
    originalUrl: true,
    slug: true,
  })
  .extend({
    customSlug: z.string().optional(),
  });

export const shortenUrlSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  customSlug: z.string().optional(),
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Url = typeof urls.$inferSelect;
export type Referrer = typeof referrers.$inferSelect;
export type Browser = typeof browsers.$inferSelect;
export type ShortenUrlInput = z.infer<typeof shortenUrlSchema>;

// Stats response type
export type UrlStats = {
  slug: string;
  originalUrl: string;
  shortUrl: string;
  created: string;
  clicks: number;
  lastClickedAt: string | null;
  referrers: Array<{
    domain: string;
    count: number;
  }>;
  browsers: Array<{
    name: string;
    count: number;
  }>;
};
