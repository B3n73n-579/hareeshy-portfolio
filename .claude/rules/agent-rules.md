# Engineering Rules

1. No blind rewrites — read before editing
2. Every change must update memory files
3. All new features must have tests
4. All new APIs must have OpenAPI specs
5. Never commit secrets or tokens
6. Always preserve backward compatibility
7. Document every architecture decision (ADR)
8. Run lint + typecheck before any commit

# Architecture Rules

1. Frontend: feature-based folders under `src/features/`
2. Backend: hexagonal architecture (ports + adapters)
3. No circular dependencies between features
4. Shared UI components in `src/components/ui/`
5. API contracts defined before implementation
6. 3D components must be lazy-loaded

# Frontend Rules

1. Use TailwindCSS only — no CSS modules or styled-components
2. All interactive elements must be keyboard accessible
3. Lazy load all route-level chunks
4. 3D Canvas must have `prefers-reduced-motion` check
5. Keep bundle splitting granular (one chunk per route)
6. Use `useMemo`/`useCallback` only after profiling
7. All forms must have validation + error states
8. Provide loading/skeleton states for every async operation

# Backend Rules

1. Global exception handler with problem+json format
2. All endpoints return proper HTTP status codes
3. Use records for DTOs, not classes
4. Flyway for all schema migrations
5. Never expose JPA entities directly in REST responses
6. All services must have interface-based contracts
7. CORS configured for frontend domain only
8. Rate limiting on public endpoints

# Security Rules

1. JWT tokens expire in 15 minutes (access) / 7 days (refresh)
2. CORS whitelist — no wildcard in production
3. All inputs sanitized (XSS prevention)
4. Content-Type and X-Content-Type-Options headers set
5. No sensitive data in logs
6. Environment variables for all secrets
7. OAuth2 state parameter + PKCE for OAuth flows

# Testing Rules

1. 90%+ coverage target
2. Tests must be deterministic (no flaky tests)
3. Mock external services in unit tests
4. Use Testcontainers for integration tests
5. One assertion pattern per test method
6. Tests must run in CI on every push
7. Accessibility tests on all pages (axe-core)
8. Performance budget enforced in CI

# Documentation Rules

1. README must have setup, run, test instructions
2. CLAUDE.md must have project context for AI agents
3. ADRs for all significant decisions
4. API.md for public API documentation
5. CHANGELOG.md maintained with semver
6. Architecture diagrams in system-design.md
7. Deployment guide in DEPLOYMENT.md
8. All documentation updated with every release

# Agent Rules

1. Read memory files before beginning work
2. Update memory files after completing work
3. If blocked, document in known-issues.md
4. Always ask about design reference files
5. Never assume unconfirmed technologies
6. Cross-agent handoffs via documented interfaces
7. Progress Agent audits all outputs for consistency
8. Fetch web resources when appropriate