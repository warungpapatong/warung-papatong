# 🍽️ Warung Papatong — Design System & Architecture

> **Tailwind CSS v3** · Next.js 15 · React 19 · TypeScript 5.8

---

## Perbedaan dari Versi Sebelumnya (v2.1)

| Aspek | v2.0 (lama) | v2.1 (sekarang) |
|---|---|---|
| Tailwind | v4 (`@theme`) | **v3** (`tailwind.config.js`) |
| PostCSS plugin | `@tailwindcss/postcss` | `tailwindcss` + `autoprefixer` |
| CSS directives | `@theme { --color-... }` | `@tailwind base/components/utilities` |
| Class merging | Manual | **`clsx` + `tailwind-merge` via `cn()`** |
| Font | Space Grotesk | **Plus Jakarta Sans** (lebih cocok brand Sunda modern) |

---

## Mengapa Turun ke Tailwind v3?

Tailwind v4 masih dalam fase stabilisasi. `@theme` custom property API-nya tidak se-mature v3 untuk:
- Plugin `addComponents` / `addUtilities` yang dipakai untuk button & badge tokens
- Ekosistem tooling (IntelliSense, Jest, Storybook) yang belum support penuh
- `tailwind-merge` belum fully compatible dengan v4 class naming

---

## Design Token Reference

Semua token didefinisikan di `tailwind.config.js` → `theme.extend`.

### Warna Brand

```
bg-brand-primary        #FFCC00  Kuning capung Papatong — CTA utama
bg-brand-primary-hover  #F5C200  State hover tombol primary
bg-brand-primary-light  #FFF3B0  Background subtle/tinted
bg-brand-primary-dark   #CC9900  Text on light bg, label aktif

bg-brand-red            #E60000  Cabai merah — badge promo, hot label
bg-brand-red-hover      #CC0000  State hover red
bg-brand-red-light      #FFE5E5  Background red subtle

bg-brand-dark           #202124  Rich Black — navbar, heading, footer
text-brand-text         #3D3D3D  Body text
text-brand-muted        #6B7280  Secondary text, label
text-brand-subtle       #9CA3AF  Disabled, placeholder

bg-brand-bg             #F8F9FA  Page background
bg-brand-surface        #FFFFFF  Card, modal
bg-brand-surface-2      #F3F4F6  Nested card

border-brand-border         #E5E7EB  Divider
border-brand-border-strong  #D1D5DB  Input, card border kuat

bg-wa                   #25D366  WhatsApp — jangan diubah
```

### Tipografi

```
font-sans     Inter (body, navigasi, deskripsi)
font-display  Plus Jakarta Sans (heading, hero, display)
font-mono     JetBrains Mono (harga, koordinat, jam)
```

### Utility Classes Tambahan (dari plugin)

```
.skeleton           Loading shimmer animation
.text-gradient-brand  Gradient teks kuning → merah
.glass              Glassmorphism putih
.glass-dark         Glassmorphism gelap
.focus-brand        Focus ring kuning untuk a11y
```

### Component Classes (addComponents)

```
Badge:
  .badge .badge-primary .badge-red .badge-dark .badge-outline .badge-success

Button:
  .btn .btn-sm .btn-md .btn-lg .btn-xl
  .btn-primary .btn-dark .btn-outline .btn-wa

Card:
  .card .card-hover

Layout:
  .section .section-inner
  .section-label .section-title .section-subtitle

Form:
  .input

Misc:
  .divider
```

---

## Import Pattern

```tsx
// Utility merging (wajib untuk conditional classes)
import { cn } from '@/lib/cn'

// Data konten
import { BUSINESS_INFO, PRODUCTS_DATA, HERO_DATA } from '@/data'

// Config & tracking
import { trackWhatsAppConversion, APP_CONFIG } from '@/lib/tracking'

// Types
import type { Product, Testimonial } from '@/types'

// Navigation config
import { NAV_ITEMS } from '@/config/navigation'
```

---

## WhatsApp Tracking (wajib di semua tombol WA)

```tsx
import { trackWhatsAppConversion } from '@/lib/tracking'
import { buildWALink } from '@/data'
import { BUSINESS_INFO } from '@/data'

<a
  href={buildWALink(BUSINESS_INFO.wa, product.waMessage)}
  onClick={() => trackWhatsAppConversion('Hero CTA Primary Button')}
  className="btn btn-wa btn-lg"
  target="_blank"
  rel="noopener noreferrer"
>
  Pesan via WhatsApp
</a>
```

---

## Struktur Project

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # @tailwind directives + base styles
│   ├── layout.tsx          # Root layout, metadata, fonts, JSON-LD
│   ├── page.tsx            # Beranda (/)
│   ├── menu/page.tsx       # E-Menu (/menu)
│   ├── venue/page.tsx      # Galeri (/venue)
│   └── about/page.tsx      # Tentang (/about)
│
├── components/             # Shared, reusable lintas halaman
│   ├── layout/
│   │   ├── LayoutShell.tsx # Client wrapper: modal + basket state
│   │   ├── Navbar.tsx      # Fixed nav (usePathname, scroll)
│   │   └── Footer.tsx      # Footer statis
│   ├── common/
│   │   ├── FloatingWA.tsx  # Tombol WA floating (scroll trigger)
│   │   └── LocationContact.tsx
│   └── ui/                 # ← BARU: Atomic UI components
│       ├── Button.tsx      # Wrapper .btn classes dengan variants
│       ├── Badge.tsx       # Wrapper .badge classes
│       ├── Card.tsx        # Wrapper .card + optional hover
│       └── SectionHeader.tsx
│
├── features/               # Page-specific Client Components
│   ├── home/components/    Hero, BestSellers, AmbienceTeaser, dll
│   ├── menu/components/    MenuSection
│   ├── gallery/components/ GallerySection
│   └── about/components/   AboutUs, TeamSection
│
├── config/
│   └── navigation.ts       # NAV_ITEMS
│
├── lib/
│   ├── cn.ts               # ← BARU: clsx + tailwind-merge
│   ├── config.ts           # APP_CONFIG, trackWhatsAppConversion, JSON-LD
│   └── tracking.ts         # Re-export barrel
│
├── types/
│   └── global.d.ts         # Window augmentations, CSS Modules
│
├── data.ts                 # ⚠️ Single source of truth konten
└── types.ts                # ⚠️ TypeScript interfaces
```

---

## Refactor yang Dilakukan

1. **`src/components/ui/`** — Ditambahkan folder baru untuk atomic UI components (Button, Badge, Card, SectionHeader). Ini menghindari duplikasi class `.btn btn-primary btn-lg` yang tersebar di setiap feature component.

2. **`src/lib/cn.ts`** — Helper `cn()` dari `clsx` + `tailwind-merge`. Wajib dipakai untuk semua conditional className di komponen.

3. **`calculateBasketTotal()`** — Ditambahkan ke `data.ts` sebagai utility murni, menghindari logika duplikat di `InteractiveBooking.tsx`.

4. **Font diubah** dari Space Grotesk ke **Plus Jakarta Sans** — lebih cocok untuk brand F&B Indonesia modern, lebih hangat tapi tetap clean.

5. **`postcss.config.js`** (bukan `.mjs`) — Kompatibilitas lebih luas dengan tooling lama.

---

## Routes (JANGAN DIUBAH — Google Ads Aktif)

| Route | Halaman |
|---|---|
| `/` | Beranda |
| `/menu` | E-Menu Digital |
| `/venue` | Galeri & Suasana |
| `/about` | Tentang Kami |