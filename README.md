# Home New Home

Build your home, one decision at a time.

Home New Home is a premium mobile-first app for planning, organizing, and deciding what a home needs. The product is designed for new homes, household setup, renovation planning, shopping organization, and collaborative decision-making without drifting into the feel of a generic task manager.

## Product Direction

The experience is built around a simple promise:

- organize the house by rooms, categories, priorities, and status
- compare purchase options with clarity
- decide together with other people in the house
- share selected items publicly for reservations or gifts
- prepare the platform for offline support, premium unlocks, and future AI expansion

## Core Principles

- mobile-first
- clean architecture by feature
- premium and practical UX
- centralized design system
- progressive offline-first strategy
- realtime-ready collaboration boundaries
- future-ready payments and AI integrations without early overengineering

## Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- PWA foundation

### Backend and Infra

- Supabase
- Postgres
- Clerk
- Vercel

### Planned Integrations

- Abacate Pay
- IndexedDB
- AI provider boundaries

## Current Foundation

The repository already includes:

- route groups for marketing and platform areas
- feature-oriented folder structure
- design-system tokens and theme contract
- light and dark theme base
- checklist and roadmap structured seeds
- public roadmap derivation logic
- integration boundaries for Clerk, Supabase, IndexedDB, payments, and AI
- initial marketing shell and authenticated app shell

## Repository Shape

```text
src/
  app/
    (marketing)/
    (platform)/
  features/
  design-system/
  integrations/
  shared/
  server/
  tests/
```

## Architecture Snapshot

The project follows a feature-oriented Clean Architecture model:

- `domain`: entities, rules, contracts
- `application`: use cases and orchestration
- `infrastructure`: provider and persistence implementations
- `presentation`: UI adapters and feature-facing components

Business rules are kept away from framework and vendor code. Shared code exists, but only for genuinely cross-cutting concerns.

## Product Areas

- Houses and members
- Rooms and categories
- Items and priorities
- Store options and comparison
- Public sharing and reservations
- Collaborative decisions and planning poker
- Cost in work hours
- Public roadmap synced from technical progress

## Status

The project has moved beyond shell-only setup and now has the Houses domain in place:

- strategic documentation created
- repository scaffold created
- base theme and primitives created
- Clerk-backed auth shell created
- house creation, memberships, role management, and invite-link generation created
- phase 5 started with Supabase-ready houses persistence and initial rooms/categories CRUD

## Next Recommended Phase

The next step is to organize each house before item management lands:

1. apply the Supabase migration and configure the envs in the target environment
2. keep rooms and categories flowing through the real database path
3. connect both structures to each house before item CRUD
4. then attach items to rooms and categories in Phase 6

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Validate types:

```bash
npm run typecheck
```

Create a production build:

```bash
npm run build
```

## Environment Variables

Use `.env.example` as the starting point for local configuration.

## Notes

Markdown documents are currently ignored by git on purpose while the product foundation is still being shaped. The repository still keeps them locally as working project artifacts.
