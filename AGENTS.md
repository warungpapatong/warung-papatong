# Warung Papatong — AGENTS.md

## Commands
- `npm run type-check` → `npm run build` (pre-deploy order; `lint` needs init — run `npx @next/codemod@canary next-lint-to-eslint-cli` first)
- No test framework exists in this repo.

## Routes (stable — do not change, linked to Google Ads)
| Path | Page |
|------|------|
| `/` | Beranda |
| `/about` | Tentang Kami |
| `/menu` | E-Menu Digital |
| `/venue` | Galeri & Suasana |

## Architecture
- **Single Source of Truth**: all content in `src/data.ts`, all types in `src/types.ts`
- **WhatsApp messages**: all built by helpers in `src/lib/whatsapp.ts` — never inline
- **Price display**: always use `formatProductPrice(product)` — never store `priceFormatted`
- **Server/Client split**: Server Components by default; browser-only logic in `client/` subfolders with `'use client'`
- **WAButton** (`src/features/home/components/button/WAButton.tsx`) import directly, not from barrel `index.ts`
- **Reusable classes**: `.btn`, `.badge`, `.card`, `.input`, `.section` from Tailwind plugin — no import needed
- **cn()** from `@/lib/cn` for className merging
- **`@/data`** exports: all content data + `formatProductPrice`, `buildWALink`, `formatPrice`, `calculateBasketTotal`, `FULL_MENU_PDF_URL`

## Assets
- All images must be **`.webp`** format (logo exceptions fixed — now all `.webp`)
- Menu → `public/images/menu/{category}/`; venue → `public/images/venue/{gallery}/`
- File naming: kebab-case with numeric prefix (`01-`, `02-`)

## Env vars (`.env.local`)
```
NEXT_PUBLIC_GOOGLE_ADS_ID
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
NEXT_PUBLIC_GSC_VERIFICATION_TAG
NEXT_PUBLIC_WHATSAPP_NUMBER
```
Format: international without `+` (e.g. `6281388497651`).

## Config
- `output: 'standalone'` in `next.config.ts`
- Deployed on Vercel

## Middleware
- Trailing slashes → 301 to non-trailing
- Suspicious URL patterns (path traversal, XSS, SQLi, LFI) → 400
- UTM/GCLID preservation for Google Ads

## Safari fix
- `layout.tsx` exports explicit `viewport` (device-width, initial-scale=1, viewportFit='cover`) for correct `100dvh` in WebKit
- `motion` `whileInView` uses `margin: '-10%'` and `once: true` everywhere
- Some components have 1.5s `forceVisible` fallback for IntersectionObserver reliability

## Cleanup applied
- `src/components/ui/` removed (dead code — zero imports)
- `src/config/navigation.ts` merged into `src/data.ts` (NAV_ITEMS)
- `src/lib/tracking.ts` removed (barrel — imports redirected to `@/lib/config`)
- Feature dirs flattened: `hero/`, `bestsellers/`, `ambience/`, `testimonials/`, `faq/`, `location/` (no more `components/` nesting, no `client/` subdirs)
- `STATS_DATA`, `calculateBasketTotal` removed (unused exports)
- `global.d.ts` stripped to only Window augmentations
- `sw.js` simplified (removed broken precache of `/index.html`)
