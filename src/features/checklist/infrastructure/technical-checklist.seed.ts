import type { ChecklistPhase } from "@/features/checklist/domain/checklist.types";

export const technicalChecklistSeed: ChecklistPhase[] = [
  {
    id: "phase-0",
    title: "Foundation & Product Setup",
    objective:
      "Create the strategic, structural, and technical base that allows incremental delivery.",
    tasks: [
      {
        id: "phase-0-docs",
        title: "Create strategic documents and ADR baseline",
        status: "done",
        dependencies: [],
        acceptanceCriteria:
          "Core documents and ADR-001 exist and reflect the product scope."
      },
      {
        id: "phase-0-checklist-sync",
        title: "Create structured checklist and roadmap translation data",
        status: "done",
        dependencies: ["phase-0-docs"],
        acceptanceCriteria:
          "Checklist and public roadmap seed can be consumed programmatically."
      },
      {
        id: "phase-0-scaffold",
        title: "Create the initial Next.js and feature scaffold",
        status: "done",
        dependencies: ["phase-0-docs"],
        acceptanceCriteria:
          "The repository contains route groups, feature folders, providers, and app entrypoints."
      },
      {
        id: "phase-0-design-system",
        title: "Create the initial design system foundations",
        status: "done",
        dependencies: ["phase-0-scaffold"],
        acceptanceCriteria:
          "Tokens, themes, primitives, and motion presets exist and are used by the UI shell."
      },
      {
        id: "phase-0-integrations",
        title: "Prepare vendor integration boundaries",
        status: "done",
        dependencies: ["phase-0-scaffold"],
        acceptanceCriteria:
          "Clerk, Supabase, IndexedDB, Abacate Pay, and AI boundaries exist without vendor leakage."
      },
      {
        id: "phase-0-shell",
        title: "Create marketing and platform shells",
        status: "done",
        dependencies: ["phase-0-design-system"],
        acceptanceCriteria:
          "Marketing and app layouts render with placeholder content and navigation."
      }
    ]
  },
  {
    id: "phase-1",
    title: "Branding, Theme & Design System",
    objective: "Finalize visual identity, semantic theming, and reusable UI primitives.",
    tasks: [
      {
        id: "phase-1-brand-system",
        title: "Finalize the visual identity and semantic tokens",
        status: "done",
        dependencies: ["phase-0-design-system"],
        acceptanceCriteria:
          "The design system expresses the intended premium home-centered direction."
      },
      {
        id: "phase-1-primitives",
        title: "Expand core primitives and patterns",
        status: "done",
        dependencies: ["phase-1-brand-system"],
        acceptanceCriteria:
          "Buttons, cards, badges, sheets, tabs, chips, and sections cover core product needs."
      },
      {
        id: "phase-1-guidelines",
        title: "Document typography, spacing, and motion guidelines",
        status: "done",
        dependencies: ["phase-1-brand-system"],
        acceptanceCriteria:
          "Design guidelines are available in code for consistent implementation decisions."
      }
    ]
  },
  {
    id: "phase-2",
    title: "Landing & Marketing Foundation",
    objective: "Create the public-facing landing page and translated roadmap experience.",
    tasks: [
      {
        id: "phase-2-landing",
        title: "Build the premium marketing landing",
        status: "done",
        dependencies: ["phase-1-brand-system"],
        acceptanceCriteria:
          "The landing communicates the home-planning story with clear sign-up and roadmap entry points."
      },
      {
        id: "phase-2-public-roadmap",
        title: "Expose roadmap progress in public language",
        status: "done",
        dependencies: ["phase-0-checklist-sync"],
        acceptanceCriteria:
          "The landing and roadmap page translate technical progress into user-facing feature language."
      }
    ]
  },
  {
    id: "phase-3",
    title: "Auth & App Shell",
    objective: "Integrate auth and move the platform shell from placeholder to functional.",
    tasks: [
      {
        id: "phase-3-auth-shell",
        title: "Integrate Clerk and protect authenticated routes",
        status: "done",
        dependencies: ["phase-0-integrations"],
        acceptanceCriteria:
          "Signed-in users can enter the platform shell and unauthenticated access is gated."
      }
    ]
  },
  {
    id: "phase-4",
    title: "Houses Domain",
    objective: "Implement houses, members, roles, and invite flows.",
    tasks: [
      {
        id: "phase-4-houses",
        title: "Deliver house creation and collaboration foundations",
        status: "not_started",
        dependencies: ["phase-3-auth-shell"],
        acceptanceCriteria:
          "Users can create houses, manage members, and share invites."
      }
    ]
  },
  {
    id: "phase-5",
    title: "Rooms & Categories",
    objective: "Implement home-specific organization primitives.",
    tasks: [
      {
        id: "phase-5-rooms-categories",
        title: "Organize the home by rooms and categories",
        status: "not_started",
        dependencies: ["phase-4-houses"],
        acceptanceCriteria:
          "Users can manage rooms and categories and attach items to them."
      }
    ]
  },
  {
    id: "phase-6",
    title: "Items Core",
    objective: "Implement the main item management workflow.",
    tasks: [
      {
        id: "phase-6-items-core",
        title: "Deliver item CRUD, priority, quantity, and status views",
        status: "not_started",
        dependencies: ["phase-5-rooms-categories"],
        acceptanceCriteria:
          "Users can create and manage items with home-oriented views."
      }
    ]
  },
  {
    id: "phase-7",
    title: "Item Store Options",
    objective: "Support store options and comparison-ready purchase planning.",
    tasks: [
      {
        id: "phase-7-store-options",
        title: "Add multiple store options and target price support",
        status: "not_started",
        dependencies: ["phase-6-items-core"],
        acceptanceCriteria:
          "Users can compare multiple store options for an item."
      }
    ]
  },
  {
    id: "phase-8",
    title: "Public Sharing & Reservations",
    objective: "Enable public tokenized sharing and reservations.",
    tasks: [
      {
        id: "phase-8-public-sharing",
        title: "Share items publicly and capture external reservations",
        status: "not_started",
        dependencies: ["phase-6-items-core"],
        acceptanceCriteria:
          "External users can reserve shared items through safe links."
      }
    ]
  },
  {
    id: "phase-9",
    title: "Decisions & Priority Poker",
    objective: "Introduce collaborative decision sessions and voting.",
    tasks: [
      {
        id: "phase-9-decisions",
        title: "Deliver decision sessions and priority poker foundations",
        status: "not_started",
        dependencies: ["phase-6-items-core"],
        acceptanceCriteria:
          "House members can vote and deliberate through structured sessions."
      }
    ]
  },
  {
    id: "phase-10",
    title: "Cost in Work Hours",
    objective: "Convert monetary cost into perceived effort.",
    tasks: [
      {
        id: "phase-10-work-hours",
        title: "Show item cost in work hours",
        status: "not_started",
        dependencies: ["phase-6-items-core"],
        acceptanceCriteria:
          "Users can define hourly value and view cost translated into hours."
      }
    ]
  },
  {
    id: "phase-11",
    title: "Roadmap Sync",
    objective: "Automate public roadmap derivation from technical state.",
    tasks: [
      {
        id: "phase-11-roadmap-sync",
        title: "Automate public roadmap synchronization",
        status: "not_started",
        dependencies: ["phase-0-checklist-sync"],
        acceptanceCriteria:
          "Roadmap entries and percentages stay aligned with checklist evidence."
      }
    ]
  },
  {
    id: "phase-12",
    title: "Offline & PWA Base",
    objective: "Enable installability and progressive offline support.",
    tasks: [
      {
        id: "phase-12-offline-pwa",
        title: "Deliver PWA and progressive offline foundations",
        status: "not_started",
        dependencies: ["phase-6-items-core"],
        acceptanceCriteria:
          "The app is installable and supports a minimal offline core."
      }
    ]
  },
  {
    id: "phase-13",
    title: "Payments Foundation",
    objective: "Prepare monetization boundaries and entitlement gating.",
    tasks: [
      {
        id: "phase-13-payments",
        title: "Prepare Abacate Pay and feature gating foundations",
        status: "not_started",
        dependencies: ["phase-3-auth-shell"],
        acceptanceCriteria:
          "Payment integration remains isolated and entitlement-ready."
      }
    ]
  },
  {
    id: "phase-14",
    title: "AI Readiness",
    objective: "Prepare future AI extensibility without implementation bloat.",
    tasks: [
      {
        id: "phase-14-ai-readiness",
        title: "Establish AI memory, context, and action boundaries",
        status: "not_started",
        dependencies: ["phase-0-integrations"],
        acceptanceCriteria:
          "The architecture can absorb future AI capabilities without major refactor."
      }
    ]
  },
  {
    id: "phase-15",
    title: "QA, Testing & Hardening",
    objective: "Add confidence, accessibility, and resilience.",
    tasks: [
      {
        id: "phase-15-hardening",
        title: "Add meaningful automated coverage and hardening",
        status: "not_started",
        dependencies: ["phase-6-items-core"],
        acceptanceCriteria:
          "Critical flows are covered and hardened for release."
      }
    ]
  },
  {
    id: "phase-16",
    title: "Deploy & Release",
    objective: "Prepare production release workflow and observability.",
    tasks: [
      {
        id: "phase-16-release",
        title: "Prepare Vercel deployment and release process",
        status: "not_started",
        dependencies: ["phase-15-hardening"],
        acceptanceCriteria:
          "The project can be deployed and released safely."
      }
    ]
  }
];
