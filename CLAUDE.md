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
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*` file — config lives in CSS)
- **Bundler**: Turbopack (default in v16, stable)
- **Import alias**: `@/*` → project root (e.g. `@/components/Button`)
- **Entry points**: `app/layout.tsx` (root layout), `app/page.tsx` (home route)

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
