# Warung Papatong — Developer Documentation

> Next.js 15 · React 19 · TypeScript 5.8 · Tailwind CSS 3.4

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Data Layer (Single Source of Truth)](#data-layer)
5. [Server/Client Component Split](#serverclient-split)
6. [Design System & Styling](#design-system--styling)
7. [Routing & Pages](#routing--pages)
8. [WhatsApp Integration](#whatsapp-integration)
9. [Google Ads & Tracking](#google-ads--tracking)
10. [SEO & Structured Data](#seo--structured-data)
11. [Image & Asset Management](#image--asset-management)
12. [Environment Variables](#environment-variables)
13. [Common Tasks](#common-tasks)
14. [Troubleshooting](#troubleshooting)
15. [Deployment](#deployment)

---

## Quick Start

```bash
# Prerequisites: Node.js >= 18.17, npm >= 9

# Install dependencies
npm install

# Copy & edit environment variables
cp .env.example .env.local

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Type check
npm run type-check
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (must pass before deploy) |
| `npm run start` | Preview production build locally |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript check (tsc --noEmit) |

---

## Architecture Overview

### Key Principles

1. **Single Source of Truth** — All content lives in `src/data.ts`. No hardcoded strings in components.
2. **Server Components by Default** — Only add `'use client'` when browser APIs are strictly needed.
3. **Centralized WhatsApp Messages** — All WA message formats built by helpers in `src/lib/whatsapp.ts`.
4. **Type Safety** — Every data structure has a TypeScript interface in `src/types.ts`.

### Data Flow

```
src/data.ts          ← All static content (products, business info, labels)
src/types.ts         ← TypeScript interfaces for all data
src/lib/config.ts    ← Env vars, tracking helpers, JSON-LD schema
src/lib/whatsapp.ts  ← WhatsApp message builders
src/lib/cn.ts        ← className merger utility
       │
       ▼
Server Components    ← Render static HTML (no JS sent to client)
       │
       ▼
Client Components    ← Minimal interactivity (motion, scroll, state)
```

---

## Project Structure

```
warung-papatong/
├── public/
│   ├── images/
│   │   ├── logo/              # Business logo (papatong-logo.png)
│   │   ├── menu/              # Menu item photos by category
│   │   │   ├── 01-seafood/
│   │   │   ├── 02-ikan-air-tawar/
│   │   │   ├── 03-ayam-dan-daging/
│   │   │   ├── 04-sunda/
│   │   │   ├── 05-sayuran/
│   │   │   ├── 06-minuman/
│   │   │   └── 07-snacks/
│   │   └── venue/             # Venue/gallery photos by section
│   │       ├── 01-gallery/    # Entrance
│   │       ├── 02-gallery/    # Wall of frame
│   │       ├── 03-gallery/    # Balloon photo spot
│   │       ├── 04-gallery/    # Main dining area
│   │       ├── 05-gallery/    # Side area
│   │       ├── 06-gallery/    # Lesehan area
│   │       ├── 07-gallery/    # Bamboo saung
│   │       ├── 08-gallery/    # Wedding events
│   │       ├── 09-gallery/    # Visitor photos
│   │       └── 10-gallery/    # Team/staff photos
│   ├── sw.js                  # Service Worker (PWA)
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout, fonts, JSON-LD, Google Ads
│   │   ├── page.tsx           # Homepage (/)
│   │   ├── globals.css        # Tailwind directives + base styles
│   │   ├── manifest.ts        # PWA manifest
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   ├── robots.ts          # Robots.txt
│   │   ├── menu/page.tsx      # E-Menu page
│   │   ├── venue/page.tsx     # Gallery page
│   │   └── about/page.tsx     # About page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Client — sticky nav + drawer
│   │   │   ├── Footer.tsx         # Server — footer with contact
│   │   │   └── LayoutShell.tsx    # Client — basket state + modal shell
│   │   └── common/
│   │       └── FloatingWA.tsx     # Client — floating WA button
│   │
│   ├── features/
│   │   ├── home/                  # Homepage sections
│   │   │   ├── index.ts          # Barrel exports (Server Components only)
│   │   │   ├── wa-button.tsx     # Client — reusable WA button
│   │   │   ├── hero/             # Hero section
│   │   │   ├── bestsellers/      # Best seller cards (rotating)
│   │   │   ├── ambience/         # Ambience teaser gallery
│   │   │   ├── testimonials/     # Testimonials carousel
│   │   │   ├── faq/              # FAQ accordion
│   │   │   └── location/         # Location + map
│   │   ├── menu/
│   │   │   └── components/
│   │   │       ├── MenuSection.tsx    # Client — full menu page
│   │   │       └── CheckoutModal.tsx  # Client — basket checkout
│   │   ├── gallery/
│   │   │   └── components/
│   │   │       └── GallerySection.tsx # Client — gallery grid + lightbox
│   │   └── about/
│   │       └── components/
│   │           ├── AboutStory.tsx  # Client — story section
│   │           └── AboutCTA.tsx    # Client — stats + CTA banner
│   │
│   └── lib/
│       ├── cn.ts              # clsx + tailwind-merge utility
│       ├── config.ts          # APP_CONFIG, env vars, tracking, JSON-LD
│       └── whatsapp.ts        # WA message builders
│
├── middleware.ts              # Edge middleware (trailing slash, security)
├── tailwind.config.js         # Full design system
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

---

## Data Layer

### src/data.ts — The Single Source of Truth

This file contains **all** static content. Every section, every label, every business detail.

```
BUSINESS_INFO        → Business identity (name, address, contacts)
PRODUCTS_DATA        → All menu items (products)
TESTIMONIALS_DATA    → Customer reviews
FAQS_DATA            → FAQ items
GALLERY_DATA         → Gallery items for /venue
HERO_DATA            → Hero section content
AMBIENCE_TEASER_DATA → Ambience preview on homepage
BEST_SELLERS_CONTENT → Best sellers section
TESTIMONIALS_CONTENT → Testimonials section labels
LOCATION_DATA        → Location section
FAQ_SECTION_DATA     → FAQ section labels
GALLERY_PAGE_DATA    → Gallery page labels
NAVBAR_DATA          → Navbar text & WA message
FOOTER_DATA          → Footer text & WA message
NAV_ITEMS            → Navigation items
ABOUT_STORY_DATA     → About page story
ABOUT_CTA_DATA       → About page CTA section
MENU_PAGE_DATA       → Menu page labels
CHECKOUT_MODAL_DATA  → Checkout modal labels
```

### Utility Functions (also in src/data.ts)

| Function | Purpose |
|----------|---------|
| `formatProductPrice(product)` | Format price with unit (e.g., "Rp 52.000 / porsi") |
| `formatPrice(number)` | Format raw number to Rupiah (no unit) |
| `buildWALink(phone, message)` | Build WhatsApp URL with encoded message |

### Rules

- **NEVER** hardcode strings in components. Import from `@/data`.
- **NEVER** store `priceFormatted`. Always use `formatProductPrice(product)`.
- **NEVER** write inline WA message strings. Use helpers from `@/lib/whatsapp`.

---

## Server/Client Split

### Principle

Every section is split into two layers:

```
HeroSection.tsx (Server)  ← Renders full HTML, zero JS sent to client
  └── HeroAnimations.tsx (Client) ← Only motion/scroll wrappers
  └── HeroImage.tsx (Client)      ← Only useScroll parallax
  └── WAButton.tsx (Client)       ← Only onClick tracking
```

### Why It Matters for SEO

Server Components generate full HTML that Google can crawl without JavaScript:

```html
<!-- Google sees this directly, no JS needed -->
<h1>Rasakan Sensasi Sunda...</h1>
<h2>Menu Terpopuler Rekomendasi Hari Ini</h2>
<p>Rp 52.000 / porsi</p>
```

### When to Add `'use client'`

Only when you need:
- `useState`, `useEffect`, `useRef`
- Browser APIs (`window`, `scroll`, `resize`)
- `motion` scroll/intersection animations
- `onClick` event handlers

### Component Classification

| Component | Type | Reason |
|-----------|------|--------|
| `HeroSection.tsx` | Server | Static content only |
| `HeroAnimations.tsx` | Client | `motion` variants |
| `HeroImage.tsx` | Client | `useScroll` (browser API) |
| `WAButton.tsx` | Client | `onClick` tracking |
| `AmbienceTeaser.tsx` | Server | Static content only |
| `AmbienceCard.tsx` | Client | `whileInView` scroll trigger |
| `BestSellers.tsx` | Server | Static content only |
| `BestSellerCards.tsx` | Client | `useState` + `useEffect` + timer |
| `TestimonialsSection.tsx` | Server | Static content only |
| `TestimonialsCarousel.tsx` | Client | `useState` + `useRef` + resize |
| `FaqSection.tsx` | Server | Static content only |
| `FaqAccordion.tsx` | Client | `useState` (open/close) |
| `LocationSection.tsx` | Server | `<iframe>` is pure HTML |
| `Navbar.tsx` | Client | Scroll state + mobile drawer |
| `Footer.tsx` | Client | Static content + WA tracking onClick |
| `FloatingWA.tsx` | Client | Scroll visibility + animation |
| `LayoutShell.tsx` | Client | Basket + modal state |
| `MenuSection.tsx` | Client | Search, filter, basket state |
| `CheckoutModal.tsx` | Client | Modal state, window.open |
| `GallerySection.tsx` | Client | Filter tabs, lightbox state |
| `AboutStory.tsx` | Client | IntersectionObserver animations |
| `AboutCTA.tsx` | Client | whileInView animations |

---

## Design System & Styling

### Brand Colors

```css
/* All WCAG AA compliant (4.5:1 minimum for normal text) */
--brand-primary:        #FFCC00    /* Yellow — main CTA */
--brand-primary-hover:  #F5C200
--brand-primary-dark:   #CC9900    /* 4.6:1 on white */
--brand-red:            #E60000    /* Accent red */
--brand-red-hover:      #CC0000
--brand-dark:           #202124    /* Headings, navbar */
--brand-text:           #3D3D3D    /* Body text, 10.7:1 */
--brand-muted:          #6B7280    /* Captions, 4.61:1 */
--brand-bg:             #F8F9FA    /* Page background */
--brand-surface:        #FFFFFF    /* Card background */
--brand-cream:          #FFF5C0    /* Yellow tint sections */
--brand-tropical:       #D4EADA    /* Green tint sections */
--brand-amber:          #FFE680    /* Bold yellow sections */
--brand-forest:         #16352B    /* Dark green sections */
```

### Background Tones

All background variations are tints of the three brand colors (yellow, red, forest green):
- `cream` → tint of primary yellow — used in BestSellers, AboutStory, FullMenuBanner
- `tropical` → tint of forest green — used in Testimonials, GallerySection
- `amber` → bold yellow — used in LocationSection, Gallery Instagram feed
- `forest` → solid dark green — used in CtaBanner, FullMenuBanner QR section

### Reusable Utility Classes (No Import Needed)

These are registered via the Tailwind plugin in `tailwind.config.js`:

#### Buttons
```html
<button class="btn btn-primary btn-md">Primary CTA</button>
<button class="btn btn-wa btn-sm">WhatsApp</button>
<button class="btn btn-outline">Secondary</button>
<button class="btn btn-dark btn-lg">Dark</button>
```
Sizes: `btn-sm`, `btn-md`, `btn-lg`, `btn-xl`

#### Badges
```html
<span class="badge badge-primary">Best Seller</span>
<span class="badge badge-red">Promo</span>
<span class="badge badge-dark">Category</span>
<span class="badge badge-outline">Default</span>
<span class="badge badge-success">Available</span>
```

#### Cards
```html
<div class="card card-hover">...</div>
```

#### Sections
```html
<section class="section">
  <div class="section-inner">...</div>
</section>
```
Plus: `section-label`, `section-title`, `section-subtitle`

#### Inputs
```html
<input class="input" placeholder="Search..." />
```

#### Dividers
```html
<div class="divider">TEXT</div>
```

#### Other Utilities
- `glass` — frosted glass effect
- `glass-dark` — dark frosted glass
- `skeleton` — skeleton shimmer loading
- `text-gradient-brand` — yellow-to-red gradient text
- `text-gradient-dark` — dark gradient text
- `focus-brand` — brand-colored focus ring
- `.scrollbar-hide` — hide scrollbar but keep scroll functionality
- `.pb-safe`, `.pt-safe`, etc. — safe area insets for notched devices
- `.bg-dots`, `.bg-grid` — subtle background patterns
- `.noise` — noise texture overlay
- `.scroll-mt-navbar` — scroll offset for sticky navbar

### Tailwind Config Key Extensions

- **Fonts**: `font-display` (Plus Jakarta Sans), `font-sans` (Inter), `font-mono` (JetBrains Mono)
- **Font sizes**: `display-sm`, `display`, `display-lg`, `display-xl`
- **Shadows**: `card`, `card-md`, `card-lg`, `glow-primary`, `glow-wa`
- **Animations**: `fade-up`, `fade-in`, `scale-in`, `slide-right`, `slide-left`, `bounce-subtle`, `pulse-ring`, `shimmer`, `float`
- **Z-index**: `navbar` (100), `overlay` (200), `modal` (300), `toast` (400), `floating` (500)
- **Grid**: `auto-fill-sm`, `auto-fill-md`, `auto-fill-lg`, `auto-fit-card`

---

## Routing & Pages

> **⚠️ DO NOT change these routes.** They are actively linked to Google Ads campaigns.

| Path | Page | File | Key Components |
|------|------|------|----------------|
| `/` | Beranda (Home) | `src/app/page.tsx` | Hero, BestSellers, Ambience, Testimonials, FAQ, Location |
| `/menu` | E-Menu Digital | `src/app/menu/page.tsx` | MenuSection, CheckoutModal |
| `/venue` | Galeri & Suasana | `src/app/venue/page.tsx` | GallerySection |
| `/about` | Tentang Kami | `src/app/about/page.tsx` | AboutStory, AboutCTA |

### Homepage Section Order

1. `HeroSection` — Header, CTA, featured menu
2. `BestSellers` — Rotating best seller cards (dynamic import)
3. `AmbienceTeaser` — Venue preview photos (dynamic import)
4. `TestimonialsSection` — Customer review carousel (dynamic import)
5. `FaqSection` — FAQ accordion (dynamic import)
6. `LocationSection` — Google Maps + contact (dynamic import)

Below-the-fold sections use `next/dynamic` for code splitting — the `motion` library (~23KB) is excluded from the critical bundle.

---

## WhatsApp Integration

### WAButton Component

Location: `src/features/home/wa-button.tsx`

```tsx
import WAButton from '@/features/home/wa-button'

// Default green style
<WAButton
  href={buildWALink(BUSINESS_INFO.wa, 'Your message')}
  label="Chat Sekarang"
  trackingLabel="Hero WA Button"
/>

// Custom style (e.g., dark button)
<WAButton
  href={buildWALink(BUSINESS_INFO.wa, 'Your message')}
  label="Chat Langsung"
  className="btn btn-dark btn-md"
  icon={<MessageCircle className="w-4 h-4" />}
/>
```

### Message Builders (src/lib/whatsapp.ts)

| Function | Used When | Output |
|----------|-----------|--------|
| `buildMenuWAMessage(biz, product)` | Single product, qty=0 | Asks availability, includes price |
| `buildMenuWAMessageWithQty(biz, product, qty)` | Single product, qty>0 | Includes qty + total |
| `buildCartWAMessage(biz, items, subtotal, notes?)` | Multi-item checkout | Full itemized list |
| `buildCateringWAMessage(biz)` | Catering inquiry | General catering request |

**Rule**: Never write WA message strings inline. Always use these builders.

---

## Google Ads & Tracking

### Setup

Environment variables in `.env.local`:
```
NEXT_PUBLIC_GOOGLE_ADS_ID="AW-XXXXXXXXX"
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL="WA_Click_Conversion_Label"
```

### Conversion Tracking

The `trackWhatsAppConversion(positionLabel)` function in `src/lib/config.ts` fires a Google Ads conversion event via `gtag`.

It is called from:
- `WAButton` (all homepage CTA buttons)
- `Navbar` (desktop + mobile WA buttons)
- `MenuSection` (product WA order links)
- `FloatingWA` (floating button)
- `AboutCTA` (CTA banner buttons)
- `CheckoutModal` (checkout submit)

### Middleware

Located at `src/middleware.ts`:
- **Trailing slash removal** — `/menu/` → `/menu` (301)
- **GCLID preservation** — adds `x-gclid` header if `?gclid` present
- **Security** — blocks path traversal, XSS, SQLi, LFI patterns (returns 400)
- Runs only on page routes, not static assets

---

## SEO & Structured Data

### JSON-LD Schemas

| Schema | Location | Scope |
|--------|----------|-------|
| `Restaurant` + `LocalBusiness` + `Organization` | `src/lib/config.ts` → `LOCAL_SEO_SCHEMA` | All pages (injected in root layout) |
| `Review` + `AggregateRating` | `src/app/page.tsx` → `buildReviewSchema()` | Homepage only |
| `FAQPage` | `src/app/page.tsx` → `buildFaqSchema()` | Homepage only |

### Metadata per Page

Each page exports `metadata` via Next.js Metadata API:
- `layout.tsx` → Root metadata (default title, description, OG, Twitter, geo tags, verification)
- `page.tsx` (home) → Homepage-specific metadata + rich schemas
- `menu/page.tsx` → Menu page title, OG, keywords
- `venue/page.tsx` → Gallery page title, OG, keywords
- `about/page.tsx` → About page title, OG, keywords

### Geo Tags (root layout)

```html
<meta name="geo.position" content="-6.5120209;106.8329725" />
<meta name="geo.placename" content="Cibinong, Bogor, Jawa Barat" />
<meta name="geo.region" content="ID-JB" />
```

### SEO Checklist

Before deploy:
- [ ] TypeScript check passes (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] All images in `.webp` format
- [ ] `APP_CONFIG.siteUrl` is correct production URL
- [ ] Sitemap includes all public pages
- [ ] No hardcoded text in components
- [ ] With below-the-fold sections dynamically imported

Post-deploy:
- Submit `https://warungpapatong.com/sitemap.xml` to Google Search Console
- Verify rich results via Google Rich Results Test
- Check Lighthouse: Performance 90+, SEO 100, Accessibility 100

---

## Image & Asset Management

### Rules
- All images **must** be `.webp` format
- Menu images → `public/images/menu/{category}/`
- Venue images → `public/images/venue/{gallery}/`
- File naming: **kebab-case** with numeric prefix (`01-`, `02-`, etc.)

### Image Categories

| Directory | Content |
|-----------|---------|
| `public/images/logo/` | Business logo |
| `public/images/menu/01-seafood/` | Seafood dishes |
| `public/images/menu/02-ikan-air-tawar/` | Freshwater fish dishes |
| `public/images/menu/03-ayam-dan-daging/` | Chicken & meat dishes |
| `public/images/menu/04-sunda/` | Sundanese dishes |
| `public/images/menu/05-sayuran/` | Vegetable dishes |
| `public/images/menu/06-minuman/` | Beverages |
| `public/images/menu/07-snacks/` | Snacks & appetizers |
| `public/images/venue/01-gallery/` through `10-gallery/` | Venue photos |

### Next.js Image Optimization

Configured in `next.config.ts`:
- Formats: `avif`, `webp`
- Remote patterns: images.unsplash.com, plus.unsplash.com
- Cache: 7 days minimum
- Device sizes: 375, 640, 768, 1024, 1280, 1440, 1920
- Image sizes: 16, 32, 64, 96, 128, 256, 384

---

## Environment Variables

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | No | `AW-10835470606` | Google Ads conversion tracking |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | No | `WA_Click_Conversion_Label` | Conversion label for WA clicks |
| `NEXT_PUBLIC_GSC_VERIFICATION_TAG` | No | `google-site-verification=...` | Google Search Console verification |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | `6281388497651` | Business WhatsApp (international, no +) |

**Important**: WhatsApp number format is international without `+`. Example: `6281388497651` for `+62 813-8849-7651`.

---

## Common Tasks

### Adding a New Menu Item

Add an object to `PRODUCTS_DATA` in `src/data.ts`:

```typescript
{
  id: 116,                              // Unique ID, continue from last
  name: 'New Menu Name',
  category: 'seafood',                  // Must match ProductCategory in types.ts
  categoryLabel: 'Seafood',
  description: 'Menu description...',
  price: 45000,                         // Numeric Rupiah — single price field
  priceUnit: '/ porsi',                 // Optional unit suffix
  image: '/images/menu/01-seafood/08-new-item.webp',
  badge: 'Terlaris',                    // Optional: 'Terlaris' | 'Rekomendasi'
  isAvailable: true,
}
```

### Adding a New Category

1. Add value to `ProductCategory` in `src/types.ts`
2. Add entry to `MENU_CATEGORIES` in `src/data.ts`
3. Add entry to `MenuSection.tsx` filter tabs if needed
4. Use new `category` in products

### Changing Business Information

Edit `BUSINESS_INFO` in `src/data.ts`. Changes automatically reflect in:
- Navbar
- Footer
- Hero section
- Location section
- All WhatsApp links
- JSON-LD schemas
- PWA manifest

### Adding a New Homepage Section

1. Create folder: `src/features/home/section-name/`
2. Create `SectionName.tsx` as Server Component (no `'use client'`)
3. If interactivity needed, create a separate client file
4. Add section data to `src/data.ts`
5. Export from `src/features/home/index.ts`
6. Import in `src/app/page.tsx` (use `dynamic()` for below-fold sections)

### Adding Photos

1. Convert to **.webp** first
2. Menu photos → `public/images/menu/{category}/`
3. Venue photos → `public/images/venue/{gallery-number}/`
4. Name with kebab-case + numeric prefix (`01-photo-name.webp`)

---

## Troubleshooting

### Common Issues

**"Hydration error" with date-based content**
- Move `new Date()` from `useState` initializer to `useEffect`
- See `BestSellerCards.tsx` for example pattern

**Safari: content hidden / animations not firing**
- Use `viewport={{ once: true, margin: '-10%' }}` on `motion` components
- Add 1.5s `forceVisible` fallback timer for critical content
- See `AboutStory.tsx` for `forceVisible` pattern

**Safari: navbar missing**
- Removed the `mounted` guard pattern — navbar now renders immediately
- If re-adding, never use `if (!mounted) return null` pattern

**Build fails with TypeScript errors**
- Run `npm run type-check` first
- Common issues: missing type import, wrong path alias

**Google Ads not tracking**
- Verify `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` are set
- Check browser console for gtag loading errors
- Use Google Tag Assistant to verify conversion events

### Performance Notes

- Hero section uses CSS animations (not motion) for critical path
- Below-fold sections use `dynamic()` imports to code-split `motion`
- All images use Next.js `<Image>` with explicit `sizes` attribute
- Fonts are self-hosted via `next/font` (no external requests)
- Static assets have 1-year immutable cache headers

---

## Deployment

### Current Setup
- Hosted on **Vercel**
- Configuration: `output: 'standalone'` in `next.config.ts`
- Custom domain: `warungpapatong.com` (www redirects to non-www)

### Deploy Steps

```bash
# 1. Verify everything
npm run type-check
npm run build

# 2. Deploy
# Via Vercel CLI:
vercel --prod

# Or: push to connected Git branch (auto-deploy on Vercel)
git push origin main
```

### Post-Deploy Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Verify rich results (Google Rich Results Test)
- [ ] Check Lighthouse score (Performance 90+, SEO 100, Accessibility 100)
- [ ] Update CHANGELOG.md if needed
- [ ] Inform business owner of new deployment

---

## Key Technical Details

### PWA Support
- Service Worker: `public/sw.js` (stale-while-revalidate caching)
- Manifest: generated by `src/app/manifest.ts` (dynamic, tied to BUSINESS_INFO)
- Icons: `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`

### Security Headers (in next.config.ts)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, microphone, geolocation disabled)

### Font Loading
- Inter (400) — body text
- Plus Jakarta Sans (400, 700, 800) — display/headings
- JetBrains Mono (500) — prices, monospace
- All self-hosted via `next/font/google` with `display: swap`

### TypeScript Configuration
- Target: ES2022
- Strict mode with `strictNullChecks`
- Path alias: `@/*` → `./src/*`
- No unchecked index access (noUncheckedIndexedAccess enabled)
