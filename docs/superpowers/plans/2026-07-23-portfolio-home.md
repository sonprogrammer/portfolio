# Portfolio Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished portfolio first screen with shared navigation tabs for BNTY, VC, Fuelly, Mungpass, and an AI-only tab placeholder.

**Architecture:** Keep Next App Router routing in `src/app`, place reusable tab UI in `src/shared/ui/tabs`, and place home-specific sections in `src/widgets`. The page file composes widgets and owns no presentation data beyond layout order.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React.

## Global Constraints

- Use TypeScript.
- Use App Router.
- Use `src` directory.
- Use Tailwind CSS.
- Use pnpm.
- The `AI Lab` tab is tab-only for now and must not render a dedicated content section.

---

### Task 1: Shared Portfolio Tabs

**Files:**
- Create: `src/shared/ui/tabs/portfolio-tabs.tsx`
- Create: `src/shared/ui/tabs/index.ts`

**Interfaces:**
- Produces: `PortfolioTabs({ items, activeId }: PortfolioTabsProps)` where `items` is an array of `{ id: string; label: string; eyebrow?: string }`.

- [ ] Create a presentational tab bar component with accessible links.
- [ ] Export the component from the folder index.
- [ ] Verify TypeScript by running `pnpm lint`.

### Task 2: Home Widgets

**Files:**
- Create: `src/widgets/home-hero/home-hero.tsx`
- Create: `src/widgets/home-hero/index.ts`
- Create: `src/widgets/project-overview/project-overview.tsx`
- Create: `src/widgets/project-overview/index.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `PortfolioTabs` from `@/shared/ui/tabs`.
- Produces: A first screen that presents project cards and shared tabs.

- [ ] Replace the create-next-app starter page with a portfolio dashboard composition.
- [ ] Include `AI Lab` in the tabs only.
- [ ] Verify by running `pnpm lint` and `pnpm build`.
