# SiteDoc Repository

This repository now contains a GUI-first migration from the AI-generated frontend into the real Next.js app under `sitedoc/`.

## Frontend structure (GUI foundation)

The app uses a feature-based organization:

- `sitedoc/src/app/`: thin route layer (one page file per screen)
- `sitedoc/src/components/layout/`: app shell and navigation
- `sitedoc/src/components/shared/`: generic reusable UI blocks
- `sitedoc/src/features/<feature>/`: each screen/feature owns
  - `components/` (page view and UI pieces)
  - `mocks/` (typed mock data)
  - `types/` (feature-local interfaces)
  - `index.ts` (feature entrypoint)

## Migrated GUI screens

All major AI-export screens are now represented and navigable in Next.js:

- Dashboard
- Getting Started
- Site Info
- Services
- Phone Numbers
- Racks Information
- Equipment Not On Rack
- Inventory
- Layouts Hub
- Connections Hub
- Antennas Hub
- General Diagram
- CSC Audit
- Generate Report
- Master Data

## Mock data policy (current phase)

This phase is intentionally mock-driven:

- Mock data is typed and stored inside each feature under `mocks/`
- No API routes, DB access, auth, server actions, or domain orchestration were introduced
- Buttons/workflows are placeholder UI behavior ready for later backend integration

## How to continue from this base

1. Keep route files thin and delegate to feature page views.
2. Add/extend mock types and mocks inside each feature first.
3. When backend integration starts, replace feature mocks incrementally with real data-fetching boundaries.
4. Keep shared UI generic (`src/components/shared`) and avoid moving feature-specific code out of feature folders.

## Run

```bash
cd sitedoc
pnpm dev
```
