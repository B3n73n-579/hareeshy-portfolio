# System Design

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser    │────▶│  Vercel CDN  │────▶│  Frontend   │
│  (React 19)  │     │  (Static)    │     │  (Vite SPA) │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │ REST API
                                                ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  PostgreSQL  │◀───▶│   Backend    │◀───▶│   Redis     │
│              │     │ Spring Boot  │     │   (Cache)   │
└─────────────┘     │   (Railway)  │     └─────────────┘
                    └──────┬───────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Kafka     │
                    │  (Events)   │
                    └─────────────┘
```

## Frontend Architecture
- SPA with client-side routing (React Router v7)
- Feature-based module organization
- Lazy loading at route level
- 3D scenes loaded on-demand
- Zustand for theme + UI state
- TanStack Query for API data

## Backend Architecture
- Monolithic Spring Boot (modular packages)
- Hexagonal architecture per module
- RESTful JSON APIs
- JWT bearer auth
- Flyway DB migrations
- OpenAPI docs via springdoc

## Data Model (Key Entities)
- BlogPost: id, title, slug, excerpt, content (MDX), category, tags, publishedAt, status
- ContactMessage: id, name, email, subject, message, createdAt, isRead
- Skill: id, name, category, proficiency, icon
- Project: id, title, slug, description, techStack, links, images, featured
- Experience: id, company, role, startDate, endDate, description, technologies

## Deployment
- Frontend → Vercel (static SPA)
- Backend → Railway (Docker container)
- Database → Railway Postgres
- Cache → Railway Redis (or Upstash)
- Events → Railway Kafka or Confluent Cloud