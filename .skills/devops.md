# DevOps Skill

## Purpose
Automate build, test, containerization, and deployment.

## CI/CD (GitHub Actions)
1. Lint + Type check → Unit tests → Integration tests → Build
2. Security scan (Trivy or Snyk)
3. Docker image build (multi-stage)
4. Deploy to Railway / Vercel

## Docker
- Multi-stage builds for both frontend (Nginx) and backend (JRE slim)
- docker-compose.yml for local development (frontend + backend + db + redis + kafka)
- Health checks on all services

## Deployment
- Vercel for frontend (static export or SSR)
- Railway for backend
- Supabase or Railway Postgres for database
