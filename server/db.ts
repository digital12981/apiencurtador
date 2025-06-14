import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Verificar se a DATABASE_URL está configurada
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// No Heroku, parâmetros SSL são necessários para conexão segura
const connectionString = process.env.DATABASE_URL;
const poolConfig = {
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? 
    { 
      rejectUnauthorized: false 
    } : undefined
};

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });