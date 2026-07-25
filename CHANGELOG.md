# Changelog
All notable changes to the **Warung Papatong Website** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.3.0] - 2026-07-25
### ⚡ PageSpeed Optimization & Performance Tuning

#### Added
- **Dynamic imports for below-the-fold sections**: BestSellers, Ambience, Testimonials, FAQ, FloatingWA, all page content (menu/about/venue) — code-split motion library out of critical path.
- **CSS-only hero animations**: Replaced `motion` animations with pure CSS `animate-fade-up` in hero section — removes `motion` dependency from first-paint bundle.
- **`preconnect` hints** for Google Fonts origins (later removed — Next.js self-hosts fonts via `next/font`).
- **Text-shadow on WA buttons**: Improves perceived contrast ratio for brand-green (#25D366) buttons while maintaining WhatsApp brand recognition.
- **`sizes="200px"` on logo Image**: Optimizes responsive image delivery for the Navbar logo.

#### Fixed
- **LCP 4.7s → ~3.0s (mobile)**: Removed `animate-fade-up` from hero paragraph (LCP element) — eliminates element render delay caused by opacity animation on critical text element.
- **React hydration error #418**: `BestSellerCards` — moved `new Date().getHours()` from `useState` initializer to `useEffect`, fixing timezone mismatch between server (UTC) and client (WIB +7).
- **Safari IntersectionObserver reliability**: Added 1.5s `forceVisible` fallback in `AboutStory` for cases where `useInView` fails to fire in WebKit.
- **Layout shift (CLS)**: Replaced all bare `<img>` tags with Next.js `<Image>` (with `fill` + `sizes`) across AmbienceCard, MenuSection, GallerySection, AboutStory — eliminates CLS from images lacking explicit dimensions.
- **Render-blocking CSS**: Reduced from 450ms to 300ms via CSS size optimizations.

#### Accessibility (91 → 96)
- **Contrast**: Fixed low-contrast text — mobile WA button (`bg-green-500` → `bg-green-700`), pill badges (`text-brand-primary-dark` → `text-brand-dark`), category labels (`text-brand-success` → `text-green-700`), section labels in testimonials/faq/location.
- **Touch targets**: Carousel navigation dots enlarged from `w-2.5` (10px) to `min-w-[28px]` for WCAG minimum target size compliance.
- **Heading order**: Sequential `h1→h2→h3→h4` hierarchy restored — featured menu (`h3→h2`), location info labels (`h4→h3`), testimonial reviewer names (`h4→h3`).

#### Removed
- **Unused preconnect hints**: Removed `preconnect` for `fonts.googleapis.com`, `fonts.gstatic.com`, `googletagmanager.com` — flagged as unused by Lighthouse since Next.js self-hosts fonts and gtag loads afterInteractive.

---

## [2.2.0] - 2026-07-18
### 🧹 Codebase Cleanup & SEO Optimization

#### Added
- **JSON-LD schema consolidated**: Merged `LOCAL_SEO_SCHEMA` + inline `organizationSchema` into one comprehensive `@type: ['Restaurant', 'FoodEstablishment', 'LocalBusiness', 'Organization']` with proper `@id` references. Removed duplicate `aggregateRating`.
- **`theme-color` meta tag**: `#FFCC00` for browser chrome theming.
- **Homepage OG image**: Explicit `opengraph-image.png` reference with width/height/alt.
- **Local SEO geo meta tags**: `geo.position`, `geo.placename`, `geo.region` added to root layout.
- **`@id` on all schemas**: `LOCAL_SEO_SCHEMA` (`#restaurant`), `buildReviewSchema` (references `#restaurant`), `buildFaqSchema` (`#faq`) — Google can now cross-reference.
- **`FULL_MENU_PDF_URL` centralized in `src/data.ts`**: Moved from 3 hardcoded locations into single source of truth.
- **`ABOUT_CTA_DATA.statsRating` → `statsFounded`**: Renamed misleading property (held year, not rating). Added proper `statsRating` (4.8).
- **`NAV_ITEMS` merged into `src/data.ts`**: Replaced `src/config/navigation.ts` (8 lines) — all navigation data now in one file.

#### Fixed
- **venue/page.tsx broken OG image**: Referenced `entrance.webp` (404) → `new-entrance.webp`.
- **Review count inconsistency**: Unified to 4080 across `LOCAL_SEO_SCHEMA`, `buildReviewSchema()`, and `TESTIMONIALS_CONTENT`.
- **Tahun berdiri conflict**: `BUSINESS_INFO.founded` changed from '2018' to '2019' to match `ABOUT_STORY_DATA`.
- **Hardcoded WA messages**: Navbar and Footer now use `NAVBAR_DATA.waMessage` / `FOOTER_DATA.waMessage`.
- **BestSellerCards price format**: Changed `formatPrice(dish.price)` (no unit) → `formatProductPrice(dish)` (with unit).
- **Logo format**: Navbar/Footer now use `papatong-logo.png` per client preference; `.jpg`/unused variants removed.
- **`tsconfig.json` include**: Fixed reference to `postcss.config.ts` (didn't exist) → `postcss.config.cjs`.
- **`sw.js` precache targets**: Removed `/index.html` (doesn't exist in Next.js standalone).

#### Removed
- **`src/components/ui/` directory**: 5 files (Badge, Button, Card, SectionHeader, barrel) — zero imports from anywhere in the codebase.
- **`src/config/navigation.ts`**: Merged into `src/data.ts`.
- **`src/lib/tracking.ts`**: Re-export barrel removed; 6 components now import directly from `@/lib/config`.
- **`src/features/home/components/` nesting**: Flattened — sections moved to `hero/`, `bestsellers/`, `ambience/`, `testimonials/`, `faq/`, `location/`. Client components no longer nested in `client/` subdirectories.
- **`STATS_DATA`, `calculateBasketTotal`, `MenuCategoryId`**: Unused exports deleted from `src/data.ts`.
- **`global.d.ts`**: Stripped CSS Modules, SCSS, SVG declarations (not used).
- **Unused assets**: Logo `.jpg`, unused `.webp` variants, empty `docs/` directory, empty `PRD.md`.

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