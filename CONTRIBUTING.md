# Contributing

Thank you for considering contributing to the Hareesh Y Portfolio Platform!

## How to Report Bugs

1. **Check existing issues** — Search GitHub Issues to see if the bug has already been reported
2. **Open a new issue** — Use the "Bug Report" template
3. **Include details**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots or logs
   - Environment (browser, OS, Node/Java version)

## Feature Request Process

1. **Open a feature request** — Use the "Feature Request" template
2. **Describe the feature** — What problem does it solve? How should it work?
3. **Discuss** — Maintainers will review and provide feedback
4. **Implement** — Once approved, submit a PR

## Development Workflow

### Branch Strategy

```
main         — Production-ready code (protected)
├── dev      — Integration branch
├── feat/*   — Feature branches
├── fix/*    — Bug fix branches
└── docs/*   — Documentation branches
```

### Workflow

1. Fork or create a feature branch from `dev`
2. Make changes following code style guidelines
3. Write/update tests
4. Run linting and typechecking
5. Submit pull request to `dev`

## Code Style

### Frontend (React + TypeScript)

- **Formatting**: Prettier (single quotes, 2-space indent, trailing commas)
- **Linting**: ESLint with `@eslint/js` + `typescript-eslint`
- **TypeScript**: Strict mode, explicit return types on functions
- **Components**: Functional components with hooks, no class components
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Group by: React → libraries → components → styles
- **CSS**: TailwindCSS utility classes (no separate CSS files unless necessary)
- **State**: TanStack Query for server state, Zustand for UI state

### Backend (Java + Spring Boot)

- **Java Version**: 21 features (records, pattern matching, sealed classes)
- **Formatting**: IDE defaults (4-space indent, no tabs)
- **Naming**: PascalCase (classes), camelCase (methods/variables), SCREAMING_SNAKE (constants)
- **Architecture**: Hexagonal — Controller → Service → Repository
- **DTOs**: Java records for request/response objects
- **Validation**: Jakarta Validation annotations on DTOs
- **Comments**: Minimal — prefer self-documenting code
- **Lombok**: Allowed for boilerplate (getters, constructors excluded)

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add blog search functionality
fix: resolve 404 on contact form submission
docs: update API endpoints in README
chore: upgrade Spring Boot to 3.5.0
refactor: extract analytics service interface
test: add unit tests for BlogPostService
```

## Testing Requirements

### Frontend

| Type | Tool | Coverage Target |
|------|------|----------------|
| Unit (components) | Vitest + React Testing Library | 90%+ |
| Hooks | Vitest + renderHook | 90%+ |
| E2E | Playwright | Critical paths |

```bash
cd frontend
npm test              # Unit + integration (Vitest)
npm run test:e2e      # E2E (Playwright)
```

### Backend

| Type | Tool | Coverage Target |
|------|------|----------------|
| Unit (services) | JUnit 5 + Mockito | 90%+ |
| Integration | SpringBootTest + Testcontainers | 80%+ |
| Security | Spring Security Test | 100% critical paths |

```bash
cd backend
./mvnw test                  # Unit tests
./mvnw verify                # All tests + integration
```

## Pull Request Process

1. **PR to `dev` branch** (not `main`)
2. **Title**: Use conventional commit format
3. **Description**: Explain what changed and why
4. **Link issue**: Reference related issue (e.g., `Closes #42`)
5. **Checklist**:
   - [ ] Code follows style guidelines
   - [ ] Tests pass (`npm test` / `./mvnw verify`)
   - [ ] Linting passes (`npm run lint`)
   - [ ] TypeScript checks pass (`npm run typecheck`)
   - [ ] No new warnings
   - [ ] Documentation updated if needed
6. **Review**: At least one maintainer approval required
7. **Merge**: Squash merge to `dev`, then `dev` → `main` for release