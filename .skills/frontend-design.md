# Frontend Design Skill

## Purpose
Build premium, accessible, performant React + TypeScript frontends with luxury cyberpunk aesthetics.

## Stack
- React 19, TypeScript, Vite
- TailwindCSS v4 with custom theme
- Framer Motion for animations
- React Three Fiber + Drei for 3D
- Zustand for state management
- TanStack Query for data fetching

## Conventions
- Feature-based folder structure under `src/features/`
- Shared UI components in `src/components/ui/`
- Tailwind classes only — no CSS modules or styled-components
- All interactive elements must support keyboard navigation
- Motion: use `useInView` + Framer Motion for scroll-triggered animations
- 3D: use `@react-three/drei` Suspense wrappers; lazy load R3F components

## Best Practices
- Lazy load all route-level chunks with `React.lazy` + `Suspense`
- Use `React.memo` only after profiling proves benefit
- Keep 3D canvas to one active instance; offload heavy scenes to separate chunks
- Maintain 60fps on mobile: reduce particle count, use `useFrame` sparingly
