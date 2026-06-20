# Architecture

## System Architecture Overview

```
                         ┌──────────────────────────────────┐
                         │          Browser (React 19 SPA)   │
                         │  React Router · TanStack Query    │
                         │  Framer Motion · Three.js (R3F)  │
                         └──────────────┬───────────────────┘
                                        │
                                        │ HTTPS / WSS
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Vercel CDN (Static SPA)                      │
│         Serves built assets · Edge caching · SSL                │
└─────────────────────────────────────────────────────────────────┘
                                        │
                                        │ REST API (JSON)
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│               Spring Boot 3 — Railway (Docker)                  │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Blog    │  │ Contact  │  │Analytics │  │   Security    │  │
│  │  Module  │  │ Module   │  │ Module   │  │   (JWT/OAuth) │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────────────┘  │
│       │              │             │                            │
│  ┌────▼──────────────▼─────────────▼──────────────────────┐    │
│  │              Common Layer                               │    │
│  │  ApiResponse · PagedResponse · GlobalExceptionHandler   │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────┬────────────────────────────────┬─────────────────────┘
           │                                │
           ▼                                ▼
┌──────────────────┐           ┌──────────────────────┐
│   PostgreSQL 16  │           │   Redis 7 (Cache)    │
│  (Railway PG)    │           │  (Railway/Upstash)   │
│  Flyway Migrate  │           │  Session · Rate Limit│
└──────────────────┘           └──────────────────────┘
           │
           ▼
┌──────────────────┐
│   Apache Kafka   │
│ (Confluent/      │
│  Railway Kafka)  │
│  Event Bus       │
└──────────────────┘
```

## Frontend Architecture

### Module Organization (Feature-Based)

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, About, Skills, Projects, Experience, Blog, AI, Contact
│   ├── three/           # R3F scenes: ParticleBackground, NetworkNodes, KafkaStream, SkillSphere
│   └── ui/              # Button, Card, Badge, Section, GradientText, etc.
├── hooks/               # useScrollProgress (custom)
├── lib/                 # constants.ts (site data, skills, projects, experience, blog posts), types.ts
├── pages/               # Route-level components (lazy-loaded)
├── stores/              # Zustand store (theme)
└── App.tsx              # Router + Layout wrapper
```

### Lazy Loading

All pages are lazy-loaded via `React.lazy()` + `Suspense`:

```tsx
const HomePage = lazy(() => import('@/pages/HomePage'))
```

This splits each route into its own chunk, reducing initial bundle size.

### State Management

| Concern | Solution |
|---------|----------|
| Server state | TanStack Query 5 (cache, refetch, pagination) |
| UI/theme state | Zustand 5 (dark mode, mobile detection) |
| URL state | React Router v7 (path params, search params) |
| Animation state | Framer Motion (in-view triggers, gestures) |

### Data Flow

```
User Action → React Router → Lazy Page → TanStack Query → API → Spring Boot
                              ↓
                         Framer Motion (animations)
                              ↓
                         R3F Canvas (3D scenes, on-demand)
```

## Backend Architecture

### Hexagonal (Ports & Adapters) Per Module

Each module follows a clean architecture within the monolithic Spring Boot app:

```
┌────────────────────────────────────────────────────┐
│                    Controller (Web Adapter)          │
│  @RestController · @RequestMapping                  │
│  Receives HTTP, delegates to Service                │
└────────────────────┬───────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────┐
│                   Service (Application Core)        │
│  Business logic · Validation · Orchestration        │
│  No framework annotations (pure Java)              │
└────────────────────┬───────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────┐
│              Repository (Persistence Adapter)        │
│  Spring Data JPA · Custom @Query methods            │
└────────────────────┬───────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────┐
│                  Entity (Domain Model)               │
│  @Entity · JPA mappings · Business methods          │
└────────────────────────────────────────────────────┘
```

### Module Breakdown

| Module | Package | Entities | Endpoints |
|--------|---------|----------|-----------|
| Blog | `blog/` | `BlogPost` | CRUD `/api/public/blog` |
| Contact | `contact/` | `ContactMessage` | Submit, List, Mark Read `/api/public/contact` |
| Analytics | `analytics/` | `PageView` | Record pageview, Stats `/api/analytics` |
| Common | `common/` | — | `ApiResponse`, `PagedResponse`, `GlobalExceptionHandler` |
| Config | `config/` | — | `SecurityConfig`, CORS, JWT |

### Technology Choices

- **Spring Boot 3.5** — Latest stable, virtual threads support
- **Spring Data JPA + Hibernate** — ORM with Flyway migrations
- **Spring Security + OAuth2 Resource Server** — JWT bearer auth
- **Spring Data Redis** — Caching layer
- **Spring Kafka** — Event streaming
- **springdoc-openapi** — Auto-generated OpenAPI docs (`/swagger-ui.html`)
- **Jakarta Validation** — Bean validation on DTOs
- **Lombok** — Boilerplate reduction

## Data Model

### Core Entities

```
BlogPost
├── id: UUID (PK)
├── title: String (required)
├── slug: String (unique, required)
├── excerpt: String (500)
├── content: TEXT (MDX)
├── category: String
├── tags: String (comma-separated, 500)
├── coverImage: String
├── publishedAt: LocalDateTime
├── isPublished: boolean
├── createdAt: LocalDateTime (audit)
└── updatedAt: LocalDateTime (audit)

ContactMessage
├── id: UUID (PK)
├── name: String (required)
├── email: String (required, validated)
├── subject: String (required)
├── message: TEXT (required, 2000)
├── isRead: boolean
└── createdAt: LocalDateTime (pre-persist)

PageView
├── id: UUID (PK)
├── path: String (500)
├── ipAddress: String (45)
├── userAgent: String (500)
├── referrer: String (500)
└── timestamp: LocalDateTime
```

### Database Migrations

Managed via Flyway (`V1__init.sql`, `V2__*.sql`) in `backend/src/main/resources/db/migration/`.

## Security Architecture

### Authentication

```
Client → POST /api/auth/login → JWT Token
Client → Bearer Token in Authorization header
Spring Security → OAuth2 Resource Server → JWT Decoder
            ↓
Principal extracted → @AuthenticationPrincipal in controllers
```

### Authorization

| Route | Access |
|-------|--------|
| `/api/health` | Public |
| `/api/public/**` | Public |
| `/api/**` | Authenticated (JWT) |

### CORS

Allowed origins:
- `http://localhost:5173` (dev)
- `https://hareesh-y.vercel.app` (production)

Allowed methods: `GET`, `POST`, `PUT`, `DELETE`

### CSRF

Disabled (stateless JWT auth).

## Deployment Architecture

### Production Topology

```
┌──────────────┐       ┌──────────────┐
│   Vercel     │       │   Railway    │
│  (Frontend)  │──────▶│  (Backend)   │
│  Static SPA  │ REST  │  Spring Boot │
│  hareesh-y.  │       │  .railway    │
│  vercel.app  │       │  app         │
└──────────────┘       └──────┬───────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              ┌─────▼─────┐     ┌──────▼──────┐
              │ PostgreSQL │     │    Redis    │
              │  Managed   │     │   Managed   │
              └───────────┘     └─────────────┘
```

### Local Development

Docker Compose provides all services — see `docker-compose.yml` for configuration.