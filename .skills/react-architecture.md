# React Architecture Skill

## Folder Structure
```
src/
  features/       # feature modules (auth, blog, portfolio, contact)
    {feature}/
      components/ # feature-specific components
      hooks/      # feature-specific hooks
      pages/      # page-level components
      api/        # TanStack Query hooks
  components/     # shared UI components
    ui/           # atoms (Button, Input, Card)
    layout/       # Layout, Header, Footer, Navigation
    three/        # 3D components (lazy loaded)
  lib/            # utilities, types, constants
  hooks/          # shared hooks
  stores/         # Zustand stores
  styles/         # global styles, Tailwind layers
```

## Data Flow
- TanStack Query for server state
- Zustand for client state (theme, UI preferences)
- URL state for page/filter state

## Performance
- Dynamic imports for all routes and heavy components
- Preload critical chunks on hover (using `React.lazy` + prefetch)
- Use `useDeferredValue` for heavy filtering/search
