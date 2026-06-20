# Architecture Decisions

## ADR-001: Monorepo with Separate Frontend/Backend Directories
**Status:** Accepted  
**Context:** Need shared code ownership with independent deployability.  
**Decision:** Use a monorepo at root with `frontend/` and `backend/` directories. Shared configs at root.  
**Consequences:** Simple local dev, single repo, shared CI. Each side deploys independently.

## ADR-002: Feature-Based Frontend Architecture
**Status:** Accepted  
**Context:** Need scalable, maintainable frontend codebase.  
**Decision:** Organize by feature (`src/features/{feature}/`) with shared `components/ui/` primitives.  
**Consequences:** Clear ownership per feature, easy code splitting, minimal cross-feature coupling.

## ADR-003: React Three Fiber with Lazy Loading
**Status:** Accepted  
**Context:** 3D experiences must not block initial page load.  
**Decision:** All R3F components are lazy-loaded with `React.lazy`. Canvas wrapped in Suspense.  
**Consequences:** 3D chunks load async; main bundle stays lean.

## ADR-004: Hexagonal Backend Architecture
**Status:** Accepted  
**Context:** Need testable, domain-centric Spring Boot services.  
**Decision:** Use ports-and-adapters pattern within each backend module.  
**Consequences:** Domain logic is framework-agnostic; easy to swap adapters (e.g. JPA → MongoDB).

## ADR-005: JWT + OAuth2 for API Security
**Status:** Accepted  
**Context:** Blog/CMS APIs need auth without session overhead.  
**Decision:** Stateless JWT bearer tokens issued via OAuth2 authorization flow.  
**Consequences:** No server-side session; token revocation handled via short expiry + refresh.

## ADR-006: MDX Blog with Static Generation
**Status:** Accepted  
**Context:** Blog content should be authorable in Markdown with embedded React components.  
**Decision:** MDX files stored in `frontend/content/blog/`, built at compile time. Dynamic features (search) use client-side Fuse.js.  
**Consequences:** Fast static delivery with rich interactive components.

## ADR-007: Docker Compose for Local Development
**Status:** Accepted  
**Context:** Multiple services (frontend, backend, postgres, redis, kafka) need coordinated local setup.  
**Decision:** Single `docker-compose.yml` at root with profiles for individual services.  
**Consequences:** One command to start full stack; consistent across team members.