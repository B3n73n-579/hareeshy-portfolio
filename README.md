# Hareesh Y — Portfolio Platform

![CI/CD](https://github.com/B3n73n-579/portfolio/actions/workflows/ci.yml/badge.svg)
![Java 21](https://img.shields.io/badge/Java-21-%23ED8B00)
![Spring Boot 3](https://img.shields.io/badge/Spring%20Boot-3.5-%236DB33F)
![React 19](https://img.shields.io/badge/React-19-%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6-%233178C6)
![License](https://img.shields.io/badge/License-MIT-blue)

Premium luxury cyberpunk personal brand platform and technical blog for **Hareesh Y**, a Senior Java Developer specializing in microservices, cloud-native architecture, and AI-powered applications.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript 6, Vite 8, TailwindCSS 4 |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion 12 |
| State | TanStack Query 5, Zustand 5 |
| Backend | Java 21, Spring Boot 3.5, Maven |
| Database | PostgreSQL 16, Flyway, Redis 7 |
| Messaging | Apache Kafka, Confluent Platform |
| Auth | OAuth2 Resource Server, JWT |
| Infra | Docker Compose, nginx |
| CI/CD | GitHub Actions, Trivy |
| Deploy | Vercel (frontend), Railway (backend) |

## Features

- **Landing Page** — 3D particle background with animated hero section
- **About Page** — Skills radar chart, bio, and tech area highlights
- **Projects Showcase** — Sticky scroll narrative with 4 featured projects
- **Experience Timeline** — Chronological career progression
- **Technical Blog** — MDX content, categories, tags, full-text search
- **AI Lab** — Interactive 3D visualizations (Network nodes, Kafka streams, Skill sphere)
- **Contact Form** — Server-validated form with backend persistence
- **Admin APIs** — Blog CRUD, contact message management, analytics
- **Analytics** — Page view tracking with aggregated stats
- **Responsive** — Mobile, tablet, desktop breakpoints
- **Dark Theme** — Luxury cyberpunk design system (#050816, #00E5FF, #7C4DFF, #FF00E5)

## Quick Start

### Prerequisites

- Node.js 22+
- Java 21 (Temurin)
- Docker & Docker Compose
- PostgreSQL 16 (for local backend dev)

### Clone

```bash
git clone https://github.com/B3n73n-579/portfolio.git
cd portfolio
```

### Install & Run (Frontend)

```bash
cd frontend
npm install
npm run dev       # → http://localhost:5173
```

### Install & Run (Backend)

```bash
cd backend
./mvnw spring-boot:run   # → http://localhost:8080
```

### Docker Compose

```bash
docker compose up -d
```

Starts all services: PostgreSQL, Redis, ZooKeeper, Kafka, backend, frontend (nginx).

## Available Commands

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run preview` | Preview production build |
| `npm test` | Vitest (unit + integration) |
| `npm run test:e2e` | Playwright (E2E) |

### Backend

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Start Spring Boot |
| `./mvnw verify` | Compile + test + verify |
| `./mvnw test` | Run unit/integration tests |
| `./mvnw clean` | Clean build artifacts |

## Project Structure

```
.
├── .github/workflows/     # CI/CD pipeline
├── .skills/               # Agent skill definitions
├── architecture/          # ADRs and system design
├── backend/               # Spring Boot API
│   ├── src/main/java/     # Java sources (hexagonal modules)
│   └── src/test/java/     # Tests
├── frontend/              # React SPA
│   └── src/
│       ├── components/    # UI, layout, sections, three
│       ├── hooks/         # Custom hooks
│       ├── lib/           # Types, constants
│       ├── pages/         # Route pages (lazy loaded)
│       └── stores/        # Zustand stores
├── docker-compose.yml     # Full stack local dev
├── memory/                # Project tracking
├── testing/               # Test artifacts
└── docs/                  # Documentation
```

## Deployment

| Component | Platform |
|-----------|----------|
| Frontend (SPA) | [Vercel](https://vercel.com) |
| Backend (Spring Boot) | [Railway](https://railway.app) |
| PostgreSQL | Railway Managed Postgres |
| Redis | Railway Managed Redis |
| Kafka | Confluent Cloud or Railway Kafka |

See `DEPLOYMENT.md` for step-by-step guides.

## Contributing

See `CONTRIBUTING.md` for guidelines.

## License

MIT