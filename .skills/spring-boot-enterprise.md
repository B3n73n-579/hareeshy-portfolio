# Spring Boot Enterprise Skill

## Purpose
Build production-grade Java 21 + Spring Boot 3 microservices.

## Stack
- Java 21, Spring Boot 3.x, Maven/Gradle
- Spring Security + OAuth2 + JWT
- Spring Cloud (service discovery, config)
- Spring Data JPA + Flyway migrations
- Kafka for event streaming
- Redis for caching
- PostgreSQL for persistence

## Conventions
- Hexagonal architecture (ports & adapters) within each service
- Record classes for DTOs
- Global exception handler with problem+json responses
- OpenAPI 3.0 spec generation via springdoc-openapi
- MapStruct for entity <-> DTO mapping

## Security
- OAuth2 Resource Server with JWT bearer tokens
- CORS configured for frontend domain
- CSRF disabled for stateless API
- Rate limiting via bucket4j or Redis-based
