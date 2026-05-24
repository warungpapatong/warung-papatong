# Changelog
All notable changes to the **Warung Papatong Website** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-05-23
### 🎨 Logic, Data & Design Token Layer Consolidation

#### Added
- **`src/app/globals.css` — Full `@theme` Brand Token System**:
  - Defined the complete Tailwind v4 `@theme` block containing all brand design tokens that were being referenced by components but never declared, causing the entire component layer to render completely unstyled.
  - Tokens added: `--color-brand-primary` (#FFCC00), `--color-brand-accent` (#FFCC00), `--color-brand-red` (#E60000), `--color-brand-dark` (#202124), `--color-brand-text` (#3d3d3d), `--color-brand-secondary` (#F8F9FA), `--color-brand-surface` (#FFFFFF), `--color-brand-border` (#E5E7EB).
  - Typography tokens added: `--font-display` (Space Grotesk), `--font-sans` (Inter), `--font-mono` (JetBrains Mono) — consumed as `font-display`, `font-sans`, `font-mono` Tailwind classes.
  - Added `@utility glass-panel` — frosted glass backdrop-filter effect used by `Navbar.tsx` on scroll, previously undefined causing the sticky navbar to silently fall back to no blur effect.
  - Added `body` base style using `var(--font-sans)` and `var(--color-brand-secondary)` to establish baseline typography and background from the token system.

#### Fixed
- **`src/lib/tracking.ts` — Duplicate Logic Eliminated**:
  - The original `tracking.ts` contained a full copy of `trackWhatsAppConversion` that was identical to the implementation in `config.ts`, creating a silent drift risk.
  - Converted `tracking.ts` into a **re-export barrel** that forwards `trackWhatsAppConversion`, `APP_CONFIG`, and `LOCAL_SEO_SCHEMA` from the canonical source (`@/lib/config`).
  - All component imports using `@/lib/tracking` (Navbar, LocationContact) now resolve to the single source of truth without any component-level changes required.

- **`src/types/global.d.ts` — Window Interface Centralized**:
  - Removed the duplicate `declare global { interface Window { ... } }` block that existed in both `global.d.ts` and `config.ts` (risking TypeScript declaration conflicts).
  - `Window.gtag` and `Window.dataLayer` augmentations now live exclusively in `global.d.ts` as the correct ambient declaration location.
  - Retained `declare module '*.css'` for CSS module import support.

#### Removed
- **`src/features/common/components/DynamicSEO.tsx` — DELETED**:
  - This component used `useEffect` to imperatively manipulate `document.title`, `document.head` meta tags, Open Graph tags, Twitter Card tags, canonical links, and JSON-LD script injection at runtime.
  - In Next.js App Router, this pattern **directly conflicts** with the `Metadata` API in `layout.tsx` and per-page `export const metadata` exports, causing: duplicate `<meta>` tags in `<head>`, race conditions between server-rendered metadata and client-side injection, and Google Search Console indexing instability.
  - **Replacement strategy**: Each `page.tsx` should export its own `metadata` object (Next.js App Router native API) for per-page title, description, OG tags, and canonical URL — fully SSR-safe with zero client-side DOM manipulation.

---

## [2.0.0] - 2026-05-23
### 🚀 MAJOR — Full Vite → Next.js 15 App Router Migration

#### Added
- **`next.config.ts`**: New Next.js 15 configuration replacing `vite.config.ts`. Configured `reactStrictMode: true` and Unsplash `remotePatterns` whitelist.
- **`postcss.config.mjs`**: PostCSS config using `@tailwindcss/postcss` plugin (Tailwind v4 + Next.js).
- **`src/app/globals.css`** _(migrated from `src/index.css`)_: Global stylesheet with Tailwind v4 `@import "tailwindcss"` directive.
- **`src/app/layout.tsx`** _(rebuilt)_: `next/script afterInteractive` for non-blocking Google Ads, native `Metadata` API, OpenGraph block, `metadataBase`.
- **`src/lib/config.ts`** _(env vars migrated)_: All `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*`.
- **`.env.example`**: All keys renamed `VITE_*` → `NEXT_PUBLIC_*`.
- **`package.json`** _(fully replaced)_: Vite deps removed, `next@^15.3.2` added.
- **`tsconfig.json`** _(rebuilt)_: `jsx: preserve`, Next.js plugin, correct `include` paths.

#### Removed
- `src/index.css`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`

---

## [1.3.0] - 2026-05-23
### Added
- **Path-Alias Standardization (`@/*`)**: Reconfigured `tsconfig.json` and `vite.config.ts` to support `@/` absolute path aliases pointing to `src/*`. Refactored 100% of imports across all files.
- **Progressive Web App (PWA) Support**: Created `/public/manifest.json` and `/public/sw.js` with Stale-While-Revalidate caching policy.

## [1.2.0] - 2026-05-23
### Added
- **Clean Architecture & Single Source of Truth**: Decoupled all layouts and assets from UI files. Added `HeroData`, `AmbienceTeaserItem`, `InstagramFeedItem` types. Created `HERO_DATA`, `AMBIENCE_TEASER_DATA`, `INSTAGRAM_FEEDS_DATA` constants in `data.ts`.

## [1.1.0] - 2026-05-23
### Added
- **Quick Access CTAs on Halaman 1**: Google Maps route and Instagram profile badges on Hero. Next.js App Router structure fully aligned.

## [1.0.0-initial] - 2026-05-23
### Added
- **WordPress-to-Next.js Architecture**: Root layout, type-safe config, JSON-LD schema, conversion handlers, legacy URL protection (`/menu`, `/venue`, `/about`), workspace documentation.