# Deployment Guide

## Prerequisites

- Node.js 22+
- Java 21 (Temurin JDK)
- Docker & Docker Compose
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)
- [Railway CLI](https://docs.railway.app/develop/cli) (`npm i -g @railway/cli`)
- GitHub account (for CI/CD)

## Local Development with Docker Compose

Full stack with all dependencies:

```bash
# Start all services
docker compose up -d

# Verify
docker compose ps

# View logs
docker compose logs -f

# Stop
docker compose down

# Stop and remove volumes
docker compose down -v
```

### Services

| Service | Port | URL |
|---------|------|-----|
| Frontend (nginx) | 80 | http://localhost |
| Backend (Spring Boot) | 8080 | http://localhost:8080 |
| PostgreSQL | 5432 | `jdbc:postgresql://localhost:5432/hareesh_portfolio` |
| Redis | 6379 | `redis://localhost:6379` |
| ZooKeeper | 2181 | `localhost:2181` |
| Kafka | 9092 | `localhost:9092` |

### Local Dev Without Docker

**Backend:**
```bash
# Ensure PostgreSQL 16 is running locally
createdb hareesh_portfolio

cd backend
export DB_HOST=localhost DB_PORT=5432 DB_NAME=hareesh_portfolio DB_USER=hareesh DB_PASSWORD=hareesh_dev
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm run dev
# Opens at http://localhost:5173, proxies API to http://localhost:8080
```

## Vercel Deployment (Frontend)

### 1. Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select the `frontend` directory as root

### 2. Configure Project

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node Version | 22.x |

### 3. Environment Variables

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend.railway.app` |

### 4. Deploy

Vercel auto-deploys on push to `main`. Manual deploy:

```bash
cd frontend
vercel --prod
```

### 5. Custom Domain

1. Go to Vercel Dashboard → Project → Domains
2. Add `hareesh-y.com` (or your domain)
3. Update DNS CNAME record to `cname.vercel-dns.com`

## Railway Deployment (Backend)

### 1. Install Railway CLI

```bash
npm i -g @railway/cli
railway login
```

### 2. Initialize Project

```bash
cd backend
railway init
railway link
```

### 3. Provision Services

```bash
# PostgreSQL
railway service create postgres

# Redis
railway service create redis

# Backend app
railway up
```

### 4. Environment Variables

Set in Railway dashboard or via CLI:

```bash
railway variables set SPRING_DATASOURCE_URL=$(railway variables get DATABASE_URL)
railway variables set SPRING_DATASOURCE_USERNAME=hareesh
railway variables set SPRING_DATASOURCE_PASSWORD=hareesh_prod
railway variables set SPRING_REDIS_HOST=$(railway variables get REDIS_URL)
railway variables set JWT_ISSUER_URI=https://your-auth-domain
railway variables set SPRING_PROFILES_ACTIVE=prod
```

### 5. Deploy

```bash
railway up
# Or auto-deploy from GitHub via Railway integration
```

### 6. Custom Domain

1. Railway Dashboard → Project → Settings → Domains
2. Add `api.hareesh-y.com`
3. Update DNS CNAME

## Environment Variables Reference

### Backend (`backend/src/main/resources/application.properties`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DB_HOST` | Yes | `localhost` | PostgreSQL host |
| `DB_PORT` | Yes | `5432` | PostgreSQL port |
| `DB_NAME` | Yes | `hareesh_portfolio` | Database name |
| `DB_USER` | Yes | `hareesh` | Database user |
| `DB_PASSWORD` | Yes | — | Database password |
| `SPRING_DATASOURCE_URL` | Yes | — | Full JDBC URL (overrides host/port/name) |
| `SPRING_REDIS_HOST` | No | `localhost` | Redis host |
| `SPRING_REDIS_PORT` | No | `6379` | Redis port |
| `SPRING_KAFKA_BOOTSTRAP_SERVERS` | No | `localhost:9092` | Kafka brokers |
| `JWT_ISSUER_URI` | No | — | OAuth2 issuer for JWT validation |
| `SPRING_PROFILES_ACTIVE` | No | `dev` | Active Spring profile |
| `SERVER_PORT` | No | `8080` | HTTP port |
| `CORS_ALLOWED_ORIGINS` | No | `http://localhost:5173` | Comma-separated allowed origins |

### Frontend (`frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Yes | `http://localhost:8080` | Backend API base URL |

## Post-Deployment Checklist

- [ ] Frontend accessible at custom domain (HTTPS)
- [ ] Backend health endpoint returns `{"status":"ok"}`
- [ ] API `/api/public/blog` returns blog posts
- [ ] Contact form submission persists to database
- [ ] Analytics pageview tracking working
- [ ] CORS configured for production domain
- [ ] Database backups scheduled (Railway automated backups)
- [ ] SSL certificate valid (auto via Vercel + Railway)
- [ ] Monitoring via Railway dashboard
- [ ] CI/CD pipeline green on `main` branch
- [ ] Environment variables verified in production