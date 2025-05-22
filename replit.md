# ShortLink API - URL Shortening Service

## Overview

This project is a URL shortening service with a React frontend and Express backend. It provides both a user interface for creating and managing shortened URLs, as well as a RESTful API for programmatic access. The application uses Drizzle ORM with PostgreSQL for data storage, React for the frontend UI with Tailwind CSS and Shadcn/UI components, and Express for the backend API server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React, using a modern stack:
- **Framework**: React for UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server state management
- **UI Components**: Shadcn/UI component library with Tailwind CSS for styling
- **Forms**: React Hook Form with Zod validation

The frontend is structured with a clean component hierarchy:
- Pages (home, dashboard, not-found)
- Reusable components (forms, UI elements)
- UI components library (based on Radix UI primitives)

### Backend Architecture

The backend uses a Node.js Express server:
- **API Framework**: Express.js
- **Database ORM**: Drizzle ORM for PostgreSQL
- **Validation**: Zod for schema validation
- **Development**: Vite for development server and HMR

The server handles:
- API requests for URL shortening
- URL redirection
- Click tracking and analytics
- User authentication

### Database Schema

The database model includes several tables:
- `users`: User accounts
- `urls`: Shortened URLs with their original URLs and metadata
- `referrers`: Tracks referrer domains for analytics
- `browsers`: Tracks browser usage for analytics

### Development & Deployment

- **Development**: Uses Vite for fast development with HMR
- **Build**: Vite builds the frontend, esbuild bundles the server
- **Deployment**: Configured for deployment to Replit

## Key Components

### 1. URL Shortening Engine

The core functionality allows users to:
- Create shortened URLs from long URLs
- Optionally specify custom slugs
- Track usage statistics

Implementation consists of:
- Express routes for API endpoints
- Storage layer for persistence
- Schema validation with Zod

### 2. Frontend Dashboard

The dashboard provides:
- URL creation interface
- Management of existing URLs
- Analytics visualization
- API documentation

### 3. RESTful API

The API offers endpoints for:
- Creating shortened URLs
- Retrieving URL statistics
- Managing URLs
- Authentication

Features API key authentication and rate limiting for security.

### 4. Analytics Tracking

The system tracks:
- Click counts
- Referrer sources
- Browser information
- Temporal data (time of clicks)

## Data Flow

1. **URL Creation Flow**:
   - User submits URL via form or API
   - Server validates input
   - Server generates slug (or uses custom one)
   - URL is stored in database
   - Short URL is returned to user

2. **URL Redirection Flow**:
   - User visits short URL
   - Server looks up original URL
   - Server records analytics data
   - User is redirected to original URL

3. **Analytics Flow**:
   - Dashboard requests analytics data
   - Server aggregates data from clicks, referrers, and browsers tables
   - Data is formatted and returned to frontend
   - Dashboard renders visualizations

## External Dependencies

### Frontend Dependencies
- **React**: UI framework
- **Wouter**: Lightweight routing
- **React Query**: Data fetching and caching
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Backend Dependencies
- **Express**: Web server framework
- **Drizzle ORM**: Database ORM
- **Drizzle Zod**: Integration between Drizzle and Zod
- **Neon Database**: PostgreSQL database provider

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Build Process**:
   - Frontend is built with Vite (`vite build`)
   - Backend is bundled with esbuild
   - Assets are placed in the `dist` directory

2. **Database Strategy**:
   - Uses PostgreSQL database (Neon Database)
   - Database connection string provided via environment variables
   - Schema migrations managed through Drizzle ORM

3. **Runtime Configuration**:
   - Production mode uses Node.js to serve the built application
   - Static assets served from the `dist/public` directory
   - API runs on the same server as the static file server

4. **Environment Configuration**:
   - `DATABASE_URL` for database connection
   - `NODE_ENV` for environment detection
   - API keys should be configured securely

The application is configured to run on port 5000 in development and port 80 when deployed.