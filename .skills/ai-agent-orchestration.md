# AI Agent Orchestration Skill

## Purpose
Coordinate autonomous agents for large-scale project execution.

## Agent Roles
- Product Agent: requirements, backlog, priorities
- Architecture Agent: system design, ADRs, folder structure
- Frontend Agent: React components, design system, UX
- 3D Agent: Three.js scenes, motion design
- Backend Agent: Spring Boot APIs, security
- DevOps Agent: Docker, CI/CD, deployment
- QA Agent: testing strategy, coverage
- Docs Agent: documentation, changelog, knowledge base
- Progress Agent: tracking, blockers, status

## Workflow
1. Create shared memory files in `memory/`
2. Agents read memory before acting
3. Agents write results back to memory
4. Progress Agent audits outputs for consistency
5. Cross-agent handoffs via documented interfaces
