# Changelog
All notable changes to the **Warung Papatong Website** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-05-23
### Added
- **Path-Alias Standardization (`@/*`)**:
  - Reconfigured `tsconfig.json` and `vite.config.ts` to support root-relative `@/` absolute path aliases pointing directly to `src/*`.
  - Refactored 100% of relative model, utility, component, and configuration imports across both Vite and Next.js structures (including `/src/App.tsx`, `/src/features/**/*`, `/src/app/**/*`, and `/src/data.ts`) to use prefix paths like `@/types`, `@/data`, or `@/lib/config`.
- **Progressive Web App (PWA) Support**:
  - Created `/public/manifest.json` setting up branding assets, default colors, and install criteria on mobile/desktop.
  - Added `/public/sw.js` outlining a robust `Stale-While-Revalidate` Service Worker caching policy for outstanding load times and seamless offline navigation support.
  - Linked PWA capabilities directly from `/index.html`.

## [1.2.0] - 2026-05-23
### Added
- **Clean Architecture & Single Source of Truth Compliance**:
  - Decoupled all layouts, assets, copy, and hardcoded image URLs from structural UI files (`Hero.tsx`, `AmbienceTeaser.tsx`, `GallerySection.tsx`, and Next.js `page.tsx`).
  - Added new type definitions `HeroData`, `AmbienceTeaserItem`, and `InstagramFeedItem` inside `/src/types.ts`.
  - Created centralized constants `HERO_DATA`, `AMBIENCE_TEASER_DATA`, and `INSTAGRAM_FEEDS_DATA` inside `/src/data.ts`.
  - Mapped Next.js App Router homepage (`/src/app/page.tsx`) to pull bestsellers directly from `PRODUCTS_DATA`, reviews directly from `TESTIMONIALS_DATA`, and assets directly from `AMBIENCE_TEASER_DATA`. This completely eliminates redundant duplicate datasets across routing boundaries and keeps the application 100% scalable and easy to maintain.

## [1.1.0] - 2026-05-23
### Added
- **Owner Request: Quick Access CTAs on Halaman 1**:
  - Integrated high-contrast custom outline badges on the Home page (`/src/app/page.tsx` and React-Vite Hero `/src/features/home/components/Hero.tsx`) directing users immediately to **Google Maps Route Link** and **Instagram Official Profile @warungpapatong** using safe `rel="noopener noreferrer"` parameters.
- **Next.js Transition Readiness**:
  - Completely aligned the Next.js App Router structure in `/src/app/*` with pages (`page.tsx`), layout (`layout.tsx`), and metadata schema configurations, fully optimized and ready to be spun up as a production Next.js instance cleanly.

## [1.0.0-initial] - 2026-05-23
### Added
- **WordPress-to-Next.js Latest App Router Architecture**:
  - Implemented client layout architecture (`/src/app/layout.tsx`) supporting Google Tag dynamic asynchronous loading.
  - Set up type-safe configurations (`/src/lib/config.ts`) resolving NAP metadata, campaign tokens, and responsive mapping parameters.
  - Hardcoded local JSON-LD Structured Data Schema representing `schema.org/Restaurant` on the root page matching GSC verification keys.
- **Conversion Handlers**:
  - Attached mouse and click event structures (`trackWhatsAppConversion`) to redirect hooks to capture leads at point-of-sale.
- **Legacy URL Protections**:
  - Mapped menu items directly to `app/menu/page.tsx`.
  - Mapped gallery and atmospheric masonry structures under `app/venue/page.tsx` routes instead of the arbitrary `/gallery` parameters to safeguard the core search indexes of the legacy domains.
- **Workspace Guides**:
  - Created architectural guidelines inside `PRD.md`, `README.md`, and `CHANGELOG.md`.
