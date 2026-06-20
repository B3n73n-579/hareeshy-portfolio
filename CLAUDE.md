# Hareesh Y — Portfolio Platform

## Project Context
Personal brand platform + technical blog for a Senior Java Developer.

## Commands
```bash
# Frontend
cd frontend && npm run dev        # Dev server
cd frontend && npm run build       # Production build
cd frontend && npm run lint        # Lint
cd frontend && npm run typecheck   # TypeScript check
cd frontend && npm run test        # Vitest
cd frontend && npm run test:e2e    # Playwright

# Backend
cd backend && ./mvnw spring-boot:run
cd backend && ./mvnw verify

# Full stack
docker compose up -d
```

## Tech Stack
- Frontend: React 19, TypeScript, Vite, TailwindCSS, Framer Motion, R3F
- Backend: Java 21, Spring Boot 3, PostgreSQL, Redis, Kafka
- Deployment: Vercel + Railway

## Design System
- Luxury Cyberpunk Engineering theme
- Colors: #050816 bg, #00E5FF primary, #7C4DFF secondary, #FF00E5 accent
- Fonts: Satoshi (headings), Inter (body), JetBrains Mono (code)
- Contact: hareeshyeluri595@outlook.com, +91 9704788835, Hyderabad, India
- GitHub: https://github.com/B3n73n-579
- LinkedIn: https://www.linkedin.com/in/hareeshyeluri

## Key Files
- `memory/` — Project state, backlog, decisions
- `.skills/` — Skill definitions for agents
- `.claude/rules/` — Behavioral rules