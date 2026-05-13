# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # Start dev server (Turbopack, default)
npm run build      # Production build (Turbopack, default)
npm run start      # Start production server
npm run lint       # Run ESLint (flat config via eslint.config.mjs)
```

> `next build` does **not** run the linter automatically in Next.js 16 — run lint separately.

To use Webpack instead of Turbopack: `next dev --webpack` / `next build --webpack`.

## Architecture

- **Framework**: Next.js 16.2.2 (App Router only, no Pages Router)
- **React**: 19.2.4 (includes View Transitions, `useEffectEvent`, Activity)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*` file — config lives in `app/globals.css`)
- **Bundler**: Turbopack (default in v16, stable)
- **Import alias**: `@/*` → project root (e.g. `@/components/Button`)
- **Entry points**: `app/layout.tsx` (root layout), `app/page.tsx` (home route)
- **Output**: Static HTML export (`output: "export"` in `next.config.ts`) — no API routes, no server runtime. Images are unoptimized (`images: { unoptimized: true }`).

### Site Structure

Single-page landing site — all navigation is anchor links (`#work`, `#about`, `#experience`, `#contact`). No nested routes exist beyond the home page.

### Component Organization

```
components/
  sections/   # Full-page sections (Navbar, Hero, Work, About, Experience, Contact)
  ui/         # Primitives: Button, Badge, Separator, Tooltip, Typography
  providers/  # SmoothScrollProvider (Lenis wrapper)
```

UI components are built on **Base UI** (`@base-ui/react`) unstyled primitives styled with Tailwind, using **CVA** (`class-variance-authority`) for variants. The `cn()` utility (`lib/utils.ts`) merges classnames via `clsx` + `tailwind-merge`.

### Data Layer

All portfolio content lives in `data/portfolio.ts` as a single exported object — edit this file to update name, role, bio, projects, skills, socials, and experience entries. No CMS or database.

### Animation System

Reusable Framer Motion variants are defined in `lib/animations.ts` (`fadeInUp`, `fadeIn`, `staggerContainer`). Every animated section checks `useReducedMotion()` and passes empty variants when the user prefers reduced motion. Always follow this pattern when adding animations.

### Key Dependencies

- **framer-motion 12** — page/section animations
- **Lenis 1.3** — smooth scroll (global provider in root layout)
- **lucide-react** — icons
- **date-fns** — available but experience duration math uses a custom `getDuration()` in `components/sections/experience.tsx`

### Styling Notes

- Always-dark theme; no light mode or theme toggle exists.
- Theme tokens use OKLCh color space (`oklch(...)`) defined as CSS variables in `app/globals.css`.
- shadcn component style is `base-nova` (see `components.json`).

## Next.js 16 Breaking Changes

**Async Request APIs** — sync access to `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` is fully removed. All must be awaited:

```tsx
// page.tsx
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const query = await props.searchParams
}
```

Run `npx next typegen` to generate `PageProps`/`LayoutProps`/`RouteContext` helpers.

**Proxy (formerly Middleware)** — rename `middleware.ts` → `proxy.ts`, export `proxy` function (not `middleware`). Config flag `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`. The `edge` runtime is not supported in `proxy`; use `nodejs` only.

**Caching** — `unstable_cacheLife`/`unstable_cacheTag` are now stable: import as `cacheLife`/`cacheTag` from `next/cache`. PPR (`experimental.ppr`) is replaced by `cacheComponents: true` in `next.config.ts`.

**Turbopack config** — moved from `experimental.turbopack` to top-level `turbopack` in `next.config.ts`.

**Image defaults changed**:
- `minimumCacheTTL`: 60s → 14400s (4 hours)
- `imageSizes`: `16` removed from default array
- `qualities`: now defaults to `[75]` only
- Local images with query strings require `images.localPatterns.search` config
