# Testing Skill

## Coverage Target
90%+ across all layers.

## Frontend
- Vitest + React Testing Library for unit/component tests
- Playwright for E2E tests
- axe-core for automated accessibility tests
- Lighthouse CI for performance regression

## Backend
- JUnit 5 + Mockito for unit tests
- SpringBootTest + Testcontainers for integration tests
- REST Assured or WebTestClient for API contract tests
- Gatling or k6 for load tests

## Guidelines
- Test behavior, not implementation
- One assertion pattern per test
- Use test factories/object mothers for test data
- Run full suite before every commit (pre-commit hook)
