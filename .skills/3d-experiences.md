# 3D Experience Skill

## Purpose
Create premium 3D engineering visuals for the portfolio platform using React Three Fiber.

## Ideas
- Microservice network visualization with floating nodes and spring connections
- Kafka event stream particle system
- Cloud architecture diagram in 3D space
- Interactive neural node network
- Floating engineering objects (docker whales, gear cogs, data cubes)

## Performance Rules
- Keep draw calls under 100
- Use `useFrame` sparingly — prefer `lerp` in animation loop
- Use InstancedMesh for repeated geometry
- Lazy load all R3F components via `React.lazy`
- Mobile: reduce pixel ratio to 1, reduce particle count by 50%
- Always wrap Canvas in Suspense with a fallback

## Accessibility
- Canvas must not trap focus
- Provide `aria-label` on Canvas wrapper
- Honor `prefers-reduced-motion`: disable auto-rotation
