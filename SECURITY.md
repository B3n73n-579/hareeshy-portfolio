# Security

## Authentication

The platform uses **JWT Bearer Token** authentication via Spring Security's OAuth2 Resource Server.

### Flow

1. Client obtains a JWT from an external OAuth2 provider (Auth0, Okta, or custom)
2. Client includes `Authorization: Bearer <token>` in API requests
3. Spring Security validates the token signature, expiry, and claims
4. Authenticated principal is available via `@AuthenticationPrincipal`

### Token Requirements

| Claim | Description |
|-------|-------------|
| `iss` | Issuer URI (configured in `JWT_ISSUER_URI`) |
| `sub` | Subject (user identifier) |
| `exp` | Expiration time |
| `iat` | Issued at time |
| `scope` or `roles` | Authorization scopes |

### Public Endpoints (No Auth Required)

- `GET /api/health`
- All `GET /api/public/**` endpoints
- `POST /api/public/contact`
- `POST /api/public/analytics/pageview`

### Protected Endpoints (JWT Required)

- `POST/PUT/DELETE /api/public/blog/**`
- `GET /api/public/contact`
- `PUT /api/public/contact/{id}/read`
- `GET /api/analytics/stats`

## API Security

### CORS

Configured in `SecurityConfig.java`:

```java
config.setAllowedOrigins(List.of(
    "http://localhost:5173",               // Dev
    "https://hareesh-y.vercel.app"         // Production
));
config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
config.setAllowedHeaders(List.of("*"));
```

### CSRF

CSRF protection is **disabled** — the API is stateless (JWT auth) and CSRF tokens are unnecessary for bearer-token-based APIs. CSRF only applies to cookie-based session auth.

### Rate Limiting

Recommended to implement at the reverse proxy (nginx or Railway edge):

```nginx
# nginx.conf
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
```

### Input Validation

- All request DTOs use **Jakarta Validation** annotations (`@NotBlank`, `@Email`, `@Size`)
- Validation errors return `400 Bad Request` with field-level messages via `GlobalExceptionHandler`
- Blog post content is stored as TEXT with no HTML rendering (MDX is rendered client-side)

## Data Protection

### Input Validation

| Field | Validation |
|-------|-----------|
| `ContactRequest.name` | `@NotBlank` |
| `ContactRequest.email` | `@NotBlank @Email` |
| `ContactRequest.subject` | `@NotBlank` |
| `ContactRequest.message` | `@NotBlank @Size(max=2000)` |
| `BlogPostRequest.title` | `@NotBlank` |
| `BlogPostRequest.slug` | `@NotBlank` |
| `BlogPostRequest.content` | `@NotBlank` |

### XSS Prevention

- Frontend uses React's built-in **automatic XSS escaping** (JSX escapes all values)
- Blog content (MDX) is **not rendered as raw HTML** — it uses a safe MDX renderer
- API responses return JSON only (no HTML in response bodies)
- All user input is treated as text, not executable content

### SQL Injection Prevention

- All database queries use **Spring Data JPA** with parameterized queries
- No raw SQL concatenation anywhere in the codebase
- Custom queries use `@Query` with named parameters (`:param` syntax)
- Flyway migrations are static SQL files (not user-influenced)

### Password & Secrets

- No passwords are stored — auth is delegated to OAuth2 providers
- Database credentials are injected via environment variables (never committed)
- `.env` is in `.gitignore`
- Production secrets managed via Railway dashboard (not in source code)

## HTTPS Enforcement

- **Vercel**: Enforces HTTPS automatically, redirects HTTP → HTTPS
- **Railway**: Provides TLS termination at the edge
- **Local dev**: HTTP only (127.0.0.1) — acceptable for development
- **nginx**: Configured with security headers (see below)

## Secure Headers

Configured in `frontend/nginx.conf`:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; ..." always;
```

### Recommended CSP

```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';  # Required for Three.js + Vite
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' https://fonts.googleapis.com;
connect-src 'self' https://*.railway.app;
```

## Dependency Scanning

### Trivy (CI/CD)

Every push and PR triggers a **Trivy filesystem scan** in CI:

```yaml
- uses: aquasecurity/trivy-action@master
  with:
    scan-type: fs
    scan-ref: .
    format: table
    exit-code: 1
    severity: HIGH,CRITICAL
```

The pipeline **fails on any HIGH or CRITICAL vulnerability**.

### npm Audit

Run locally:

```bash
cd frontend
npm audit
```

### Maven Dependency Check

Run locally:

```bash
cd backend
./mvnw org.owasp:dependency-check-maven:check
```

## Incident Response Plan

### Severity Levels

| Level | Definition | Response Time |
|-------|-----------|---------------|
| **CRITICAL** | Data breach, service outage | Immediate |
| **HIGH** | Authentication bypass, data exposure | < 1 hour |
| **MEDIUM** | XSS, CSRF in non-critical path | < 24 hours |
| **LOW** | Missing headers, info disclosure | < 1 week |

### Response Steps

1. **Detect** — Via CI/CD alert, monitoring dashboard, or user report
2. **Triage** — Determine severity and affected systems
3. **Contain** — Rotate secrets, block IPs, disable vulnerable endpoints
4. **Remediate** — Deploy fix through CI/CD pipeline
5. **Verify** — Confirm fix in staging environment
6. **Postmortem** — Document root cause, update security docs, add regression test

### Contact

For security issues, email **hareeshyeluri595@outlook.com** or open a GitHub Security Advisory.