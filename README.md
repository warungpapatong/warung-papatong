# 🍽️ Warung Papatong — Website Resmi

> **E-Menu Digital & Sistem Pre-Order Online untuk Resto Sunda Seafood No. 1 di Cibinong, Bogor.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Version](https://img.shields.io/badge/version-2.1.0-FFCC00?labelColor=202124)](#)

---

## Daftar Isi

- [Tentang Project](#tentang-project)
- [Tech Stack](#tech-stack)
- [Fitur Utama](#fitur-utama)
- [Struktur Project](#struktur-project)
- [Arsitektur Komponen](#arsitektur-komponen)
- [Arsitektur Data](#arsitektur-data)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Routes & Halaman](#routes--halaman)
- [Konvensi Kode](#konvensi-kode)
- [Deployment](#deployment)

---

## Tentang Project

Website ini adalah platform digital resmi **Resto Warung Papatong** — restoran Sunda & Seafood di Cibinong, Bogor. Dibangun sebagai **aset digital penuh milik bisnis** (bukan platform pihak ketiga) dengan tujuan:

- Memperkuat kehadiran online dan keterlihatan di Google Search & Google Maps Local Pack
- Menyediakan sistem **e-menu digital** yang bisa diperbarui tanpa sentuh kode
- Mengaktifkan alur **pre-order via WhatsApp** langsung dari website
- Mendukung kampanye **Google Ads** aktif yang mengarah ke halaman spesifik

---

## Tech Stack

| Kategori | Library / Tool | Versi |
|---|---|---|
| Framework | Next.js (App Router) | `^15.3.2` |
| UI Library | React | `^19.0.1` |
| Language | TypeScript | `~5.8.2` |
| Styling | Tailwind CSS | `^3.4.17` |
| Animation | Motion (Framer Motion) | `^12.23.24` |
| Icons | Lucide React | `^0.546.0` |
| Utilities | clsx + tailwind-merge | latest |
| Build | PostCSS + Autoprefixer | latest |

---

## Fitur Utama

### 🛒 E-Menu & Pre-Order System
- Katalog menu lengkap dengan filter kategori dan pencarian real-time
- Keranjang belanja berbasis state — tambah, kurangi, dan kosongkan item
- **Floating basket bar** muncul otomatis saat ada item di keranjang
- Checkout modal merangkum pesanan dan langsung kirim ke WhatsApp admin
- Pesan WA otomatis ter-format rapi dengan nama menu, jumlah, dan total harga

### 💬 WhatsApp Integration
- Semua tombol WA menggunakan **satu helper terpusat** (`src/lib/whatsapp.ts`)
- Format pesan konsisten di seluruh halaman — kartu menu, modal checkout, banner katering
- Pesan single-item, multi-item cart, dan catering inquiry masing-masing punya template sendiri
- Nama bisnis diambil otomatis dari `BUSINESS_INFO` — tidak pernah hardcoded

### 🎯 Single Source of Truth
- Seluruh konten statis (teks, harga, info bisnis) terpusat di `src/data.ts`
- **Satu field `price`** untuk kalkulasi dan tampilan — tidak ada duplikasi `priceFormatted`
- `formatProductPrice()` dipakai di semua titik tampilan harga: UI, WA message, checkout
- Type safety penuh via `src/types.ts` — compiler akan menangkap inkonsistensi

### ⚡ Performa & SEO
- **Server Components by default** — semua konten statis (heading, teks, NAP info) dirender sebagai HTML murni tanpa JavaScript. Google bot crawl langsung tanpa eksekusi JS
- Client Components diisolasi seminimal mungkin — hanya untuk interactivity yang benar-benar butuh browser API (`useScroll`, `useState`, `useEffect`, `window`)
- JSON-LD structured data: `Restaurant`, `Organization`, `FAQPage`, `Review`, `AggregateRating` — potensi rich result di SERP
- `sitemap.ts`, `robots.ts`, `manifest.ts` — Next.js native (bukan file statis), terhubung ke `APP_CONFIG` sebagai single source
- Image optimization via Next.js + format `.webp`
- PWA-ready dengan service worker dan `manifest.ts`

### 🎨 Design System
- Token warna, tipografi, shadow, dan animasi terdefinisi di `tailwind.config.js`
- Komponen reusable (`.btn`, `.card`, `.badge`, `.input`) via Tailwind plugin — tidak perlu import
- Semua warna telah divalidasi kontras WCAG AA (≥4.5:1 untuk teks normal)
- Brand identity: **kuning `#FFCC00`** (primary) + **merah `#E60000`** (accent)

---

## Struktur Project

```
warung-papatong/
│
├── public/
│   ├── images/
│   │   ├── logo/
│   │   ├── menu/
│   │   │   ├── 01-seafood/
│   │   │   ├── 02-ikan-air-tawar/
│   │   │   ├── 03-ayam-dan-daging/
│   │   │   ├── 04-sunda/
│   │   │   ├── 05-sayuran/
│   │   │   └── 06-minuman/
│   │   └── venue/
│   │       ├── 01-gallery/   # Entrance / tampak depan
│   │       ├── 02-gallery/   # Wall of frame
│   │       ├── 03-gallery/   # Spot foto balon udara
│   │       ├── 04-gallery/   # Area makan utama
│   │       ├── 05-gallery/   # Area samping
│   │       ├── 06-gallery/   # Area lesehan
│   │       ├── 07-gallery/   # Saung bambu
│   │       ├── 08-gallery/   # Event wedding
│   │       ├── 09-gallery/   # Foto pengunjung
│   │       └── 10-gallery/   # Foto tim / waiter
│   ├── sw.js                           # Service Worker (PWA)
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
│
└── src/
    │
    ├── app/                            # Next.js App Router
    │   ├── page.tsx                    # Route: / (Beranda) — Server Component
    │   ├── layout.tsx                  # Root layout + font + JSON-LD global
    │   ├── globals.css                 # Tailwind directives + CSS base
    │   ├── manifest.ts                 # PWA manifest — Next.js native
    │   ├── sitemap.ts                  # Sitemap — Next.js native
    │   ├── robots.ts                   # Robots.txt — Next.js native
    │   ├── opengraph-image.png         # OG image default (1200×630)
    │   ├── apple-icon.png
    │   ├── favicon.ico
    │   ├── icon0.svg
    │   ├── icon1.png
    │   ├── menu/page.tsx               # Route: /menu
    │   ├── venue/page.tsx              # Route: /venue
    │   └── about/page.tsx              # Route: /about
    │
    ├── components/                     # Komponen global lintas halaman
    │   ├── common/
    │   │   └── FloatingWA.tsx
    │   └── layout/
    │       ├── Navbar.tsx
    │       ├── Footer.tsx
    │       └── LayoutShell.tsx         # Client Component — basket + modal state
    │
    ├── features/
    │   ├── home/
    │   │   ├── index.ts                # Barrel export
    │   │   ├── wa-button.tsx           # ⚡ Client
    │   │   ├── hero/
    │   │   │   ├── HeroSection.tsx     # ✅ Server
    │   │   │   ├── hero-animations.tsx # ⚡ Client
    │   │   │   └── hero-image.tsx      # ⚡ Client
    │   │   ├── bestsellers/
    │   │   │   ├── BestSellers.tsx     # ✅ Server
    │   │   │   └── BestSellerCards.tsx # ⚡ Client
    │   │   ├── ambience/
    │   │   │   ├── AmbienceTeaser.tsx  # ✅ Server
    │   │   │   └── AmbienceCard.tsx    # ⚡ Client
    │   │   ├── testimonials/
    │   │   │   ├── TestimonialsSection.tsx  # ✅ Server
    │   │   │   └── TestimonialsCarousel.tsx # ⚡ Client
    │   │   ├── faq/
    │   │   │   ├── FaqSection.tsx      # ✅ Server
    │   │   │   └── FaqAccordion.tsx    # ⚡ Client
    │   │   └── location/
    │   │       └── LocationSection.tsx # ✅ Server
    │   │
    │   ├── menu/
    │   │   └── components/
    │   │       ├── MenuSection.tsx
    │   │       └── CheckoutModal.tsx
    │   ├── gallery/
    │   │   └── components/
    │   │       └── GallerySection.tsx
    │   └── about/
    │       └── components/
    │           ├── AboutStory.tsx
    │           └── AboutCTA.tsx
    │
    ├── lib/
    │   ├── whatsapp.ts     # ⭐ WA message builder
    │   ├── cn.ts           # clsx + tailwind-merge
    │   └── config.ts       # APP_CONFIG + tracking + JSON-LD
    │
    ├── data.ts             # ⭐ Single Source of Truth — semua konten & helpers
    └── types.ts            # ⭐ TypeScript interfaces
```

---

## Arsitektur Komponen

### Prinsip Server/Client Split

Setiap section halaman beranda dipisah menjadi dua lapisan:

```
HeroSection.tsx (Server) ←── Render semua konten sebagai HTML
  └── HeroAnimations.tsx (Client) ←── Hanya motion wrapper
  └── HeroImage.tsx (Client)      ←── Hanya useScroll parallax
  └── WAButton.tsx (Client)       ←── Hanya onClick tracking
```

**Aturan:** jika sebuah komponen tidak butuh `useState`, `useEffect`, atau browser API — ia harus Server Component. Tidak ada `'use client'` di dalamnya.

### Kenapa Penting untuk SEO

Server Components menghasilkan HTML penuh yang langsung bisa di-crawl Google tanpa JavaScript:

```html
<!-- Yang Google lihat — langsung, tanpa JS -->
<h1>Lezatnya Seafood Segar...</h1>
<h2>Menu Terpopuler Rekomendasi Hari Ini</h2>
<h3>Cumi Bakar Kecap</h3>
<p>Rp 52.000 / porsi</p>
```

Client Components hanya menambahkan animasi di atas HTML yang sudah ada — bukan menggantikannya.

### Tabel Isolasi Client Logic

| File | Type | Alasan butuh Client |
|---|---|---|
| `HeroAnimations.tsx` | Client | `motion` variants + stagger |
| `HeroImage.tsx` | Client | `useScroll` (browser API) |
| `WAButton.tsx` | Client | `onClick` event handler |
| `AmbienceCard.tsx` | Client | `whileInView` scroll trigger |
| `BestSellerCards.tsx` | Client | `useState` + `useEffect` + `setInterval` |
| `FaqAccordion.tsx` | Client | `useState` (openId) + `AnimatePresence` |
| `TestimonialsCarousel.tsx` | Client | `useState` + `useEffect` + `useRef` + `window` |
| `LocationSection.tsx` | Server | `<iframe>` = HTML murni, tidak butuh JS |

### WAButton — Komponen Terkecil yang Bisa Ada

`WAButton` sengaja dibuat seminimal mungkin karena `onClick` adalah satu-satunya alasan ia menjadi Client Component. Letaknya di:

```
src/features/home/wa-button.tsx
```

**Props:**

| Prop | Type | Default | Keterangan |
|---|---|---|---|
| `href` | `string` | — | URL WhatsApp (dari `buildWALink()`) |
| `label` | `string` | — | Teks tombol |
| `trackingLabel` | `string` | `'WhatsApp CTA'` | Label untuk Google Ads conversion |
| `className` | `string` | style WA hijau default | Override className penuh |
| `icon` | `ReactNode` | `<MessageSquare />` | Icon kustom |

**Contoh penggunaan:**

```tsx
// Style default (hijau WA)
<WAButton
  href={buildWALink(BUSINESS_INFO.wa, 'Pesan meja...')}
  label="Chat WhatsApp Sekarang"
  trackingLabel="Hero WA Button"
/>

// Override style (untuk FAQ callout dengan btn-dark)
<WAButton
  href={buildWALink(BUSINESS_INFO.wa, 'Tanya FAQ...')}
  label="Chat Langsung Sekarang"
  trackingLabel="FAQ WhatsApp CTA"
  className="btn btn-dark btn-md shrink-0"
  icon={<MessageCircle className="w-4 h-4" />}
/>
```

**Import dari Server Component:**

```tsx
import WAButton from '@/features/home/wa-button'
// atau jika dalam folder yang sama:
import WAButton from '../wa-button'
```

> ⚠️ **Jangan** import `WAButton` dari `index.ts` — barrel export hanya mengekspos Server Components.

---

## Arsitektur Data

### Prinsip Utama

Seluruh konten statis **wajib** bersumber dari `src/data.ts`. Komponen tidak boleh menulis string konten secara hardcoded.

```
src/data.ts          ──→  Komponen (hanya baca, tidak tulis)
src/types.ts         ──→  Validasi type seluruh data
src/lib/whatsapp.ts  ──→  Format pesan WA (derived dari data)
src/lib/config.ts    ──→  APP_CONFIG + JSON-LD schema (env-aware)
```

### Sistem Harga

```typescript
// ✅ BENAR — satu field, satu sumber
{ price: 52000, priceUnit: '/ porsi' }
// Tampilkan dengan: formatProductPrice(product) → 'Rp 52.000 / porsi'

// ❌ SALAH — dua sumber rawan drift
{ price: 52000, priceFormatted: 'Rp 52.000 / porsi' }
```

Selalu gunakan `formatProductPrice(product)` untuk menampilkan harga — di UI, di pesan WA, maupun di checkout modal.

### Sistem Pesan WhatsApp

Semua format pesan dibangun oleh helper di `src/lib/whatsapp.ts`:

| Fungsi | Dipakai di |
|---|---|
| `buildMenuWAMessage()` | Tombol "Pesan WA" per kartu (qty = 0) |
| `buildMenuWAMessageWithQty()` | Tombol "Pesan WA" saat qty > 0 |
| `buildCartWAMessage()` | CheckoutModal — multi-item |
| `buildCateringWAMessage()` | Banner katering |

Komponen **dilarang** menulis string pesan WA secara inline.

### JSON-LD Structured Data

| Schema | Lokasi | Tujuan |
|---|---|---|
| `LocalBusiness` + `Restaurant` | `layout.tsx` (via `LOCAL_SEO_SCHEMA`) | Semua halaman — dasar Local SEO |
| `Organization` | `layout.tsx` | Knowledge Panel Google |
| `Review` + `AggregateRating` | `page.tsx` (beranda) | Star rating snippet di SERP |
| `FAQPage` | `page.tsx` (beranda) | Featured snippet accordion di SERP |

---

## Design System

### Brand Colors (semua WCAG AA compliant)

| Token | Hex | Kontras | Kegunaan |
|---|---|---|---|
| `brand-primary` | `#FFCC00` | 11.5:1 (+ dark text) | CTA utama, highlight |
| `brand-primary-dark` | `#CC9900` | 4.6:1 on white | Label, badge teks |
| `brand-red` | `#E60000` | 4.6:1 (+ white text) | Badge promo, error |
| `brand-dark` | `#202124` | 16.1:1 on white | Heading, navbar |
| `brand-text` | `#3D3D3D` | 10.7:1 on white | Body text |
| `brand-muted` | `#6B7280` | 4.61:1 on white | Placeholder, caption |
| `brand-subtle` | `#757575` | 4.54:1 on white | Disabled, hint |
| `wa-DEFAULT` | `#25D366` | — | Tombol WA (brand color) |
| `wa-hover` | `#128C7E` | 5.1:1 (+ white) | Hover tombol WA |

> **Catatan:** `wa-DEFAULT` (#25D366 + white text = 2.84:1) tidak memenuhi WCAG AA untuk teks normal — ini adalah trade-off yang disengaja demi mempertahankan brand recognition WhatsApp. Hover state menggunakan `wa-hover` (#128C7E) yang sudah compliant.

### Komponen Reusable (tanpa import)

```html
<!-- Buttons -->
<button class="btn btn-primary btn-md">CTA Utama</button>
<button class="btn btn-wa btn-sm">WhatsApp</button>
<button class="btn btn-outline btn-sm">Sekunder</button>
<button class="btn btn-dark btn-lg">Dark</button>

<!-- Badges -->
<span class="badge badge-primary">Terlaris</span>
<span class="badge badge-red">Promo</span>
<span class="badge badge-success">Tersedia</span>

<!-- Cards -->
<div class="card card-hover">...</div>

<!-- Input -->
<input class="input" placeholder="Cari menu..." />

<!-- Section layout -->
<section class="section">
  <div class="section-inner">...</div>
</section>
```

### Typography

| Font | Class | Kegunaan |
|---|---|---|
| Plus Jakarta Sans | `font-display` | Heading, nama produk, display text |
| Inter | `font-sans` | Body text, UI, label |
| JetBrains Mono | `font-mono` | Harga, kode, jam operasional |

---

## Getting Started

### Prerequisites

- Node.js `>= 18.17`
- npm `>= 9` atau pnpm `>= 8`

### Instalasi

```bash
# Clone repository
git clone https://github.com/username/warung-papatong.git
cd warung-papatong

# Install dependencies
npm install

# Salin environment variables
cp .env.example .env.local
# → Edit .env.local sesuai kebutuhan

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev          # Development server dengan hot-reload
npm run build        # Build production (wajib pass sebelum deploy)
npm run start        # Preview production build secara lokal
npm run lint         # ESLint check
npm run type-check   # TypeScript check tanpa emit file
```

### Environment Variables

| Variable | Contoh | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://warungpapatong.com` | URL produksi — dipakai sitemap & OG |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics (opsional) |
| `NEXT_PUBLIC_GADS_ID` | `AW-XXXXXXXXX` | Google Ads conversion ID |
| `NEXT_PUBLIC_GSC_VERIFY` | `abc123...` | Google Search Console verification token |

---

## Routes & Halaman

> ⚠️ **JANGAN ubah path routes ini.** Semua route aktif di kampanye Google Ads. Mengubah path = memutus tracking konversi dan merusak kampanye iklan yang sedang berjalan.

| Route | Halaman | Komponen Utama |
|---|---|---|
| `/` | Beranda | `HeroSection`, `BestSellers`, `AmbienceTeaser`, `TestimonialsSection`, `LocationSection`, `FaqSection` |
| `/menu` | E-Menu Digital | `MenuSection`, `CheckoutModal` |
| `/venue` | Galeri & Suasana | `GallerySection` |
| `/about` | Tentang Kami | `AboutStory`, `AboutCTA` |

---

## Konvensi Kode

### Menambah Menu Baru

Tambah objek di `PRODUCTS_DATA` di `src/data.ts`:

```typescript
{
  id: 121,                              // ID unik, lanjutkan dari yang terakhir
  name: 'Nama Menu Baru',
  category: 'seafood',                  // sesuaikan dengan ProductCategory di types.ts
  categoryLabel: 'Seafood',
  description: 'Deskripsi menu...',
  price: 45000,                         // angka Rupiah — satu-satunya field harga
  priceUnit: '/ porsi',                 // opsional
  image: '/images/menu/01-seafood/nama-file.webp',
  badge: 'Terlaris',                    // opsional: 'Terlaris' | 'Rekomendasi'
  isAvailable: true,
}
```

Tidak perlu tulis `waMessage` — pesan WA otomatis terbentuk dari `name` dan `price` via `src/lib/whatsapp.ts`.

### Menambah Kategori Menu

1. Tambah nilai ke `ProductCategory` di `src/types.ts`
2. Tambah entry di array `CATEGORIES` di `MenuSection.tsx`
3. Gunakan `category` baru di produk pada `PRODUCTS_DATA`

### Mengubah Info Bisnis

Edit `BUSINESS_INFO` di `src/data.ts`. Perubahan langsung terefleksi di Navbar, Footer, Hero, Location section, semua link WA, dan JSON-LD schema secara otomatis.

### Menambah Foto Menu / Venue

1. Konversi ke **`.webp`** sebelum dimasukkan ke `public/`
2. Menu → `public/images/menu/{kategori}/nama-file.webp`
3. Venue → `public/images/venue/{nomor-gallery}/nama-file.webp`
4. Penamaan: **kebab-case**, prefix nomor urut (`01-`, `02-`, dst.)

### Aturan Import

```typescript
// ✅ Data & utilities
import { BUSINESS_INFO, PRODUCTS_DATA, formatProductPrice } from '@/data'

// ✅ WA message builder
import { buildMenuWAMessage, buildCartWAMessage } from '@/lib/whatsapp'

// ✅ Types
import type { Product, BusinessInfo } from '@/types'

// ✅ WAButton (Client Component — import langsung, bukan dari barrel)
import WAButton from '@/features/home/wa-button'

// ✅ Server Components beranda (dari barrel)
import { HeroSection, BestSellers } from '@/features/home'

// ✅ Class merging
import { cn } from '@/lib/cn'

// ❌ JANGAN hardcode string konten di komponen
// ❌ JANGAN tulis format pesan WA inline
// ❌ JANGAN simpan harga sebagai string — selalu price: number
// ❌ JANGAN tambah 'use client' ke komponen yang tidak butuhnya
```

### Menambah Section Baru di Beranda

1. Buat folder baru di `src/features/home/nama-section/`
2. Buat `NamaSection.tsx` sebagai Server Component (tanpa `'use client'`)
3. Jika butuh interactivity, buat file terpisah tanpa `client/` subfolder, beri nama `NamaClient.tsx` dengan `'use client'`
4. Export dari `src/features/home/index.ts`
5. Import di `src/app/page.tsx`

---

## Deployment

Project di-deploy di **Vercel** dengan konfigurasi Next.js App Router.

### Checklist Sebelum Deploy

**Kode:**
- [ ] `npm run type-check` — tidak ada TypeScript error
- [ ] `npm run build` — build berhasil tanpa warning kritis
- [ ] `npm run lint` — tidak ada ESLint error

**Konten:**
- [ ] Semua gambar baru sudah dikonversi ke `.webp`
- [ ] `BUSINESS_INFO` sudah terisi lengkap dan akurat
- [ ] Harga produk di `PRODUCTS_DATA` sudah diverifikasi dengan pemilik
- [ ] Tidak ada teks hardcoded di komponen (semua dari `src/data.ts`)

**SEO:**
- [ ] `opengraph-image.png` ada di `src/app/` (1200×630px)
- [ ] `APP_CONFIG.siteUrl` di `src/lib/config.ts` sudah URL produksi yang benar
- [ ] JSON-LD schema di `layout.tsx` dan `page.tsx` sudah akurat

**Route:**
- [ ] Route `/menu`, `/venue`, `/about` **tidak berubah** (Google Ads aktif)
- [ ] `sitemap.ts` sudah mencantumkan semua halaman publik

**Post-deploy:**
- [ ] Submit `https://warungpapatong.com/sitemap.xml` ke Google Search Console
- [ ] Verifikasi rich result via [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Cek Lighthouse score — target: Performance 90+, SEO 100, Accessibility 100
- [ ] `CHANGELOG.md` sudah diupdate

### Deploy via Vercel CLI

```bash
# Pastikan semua checklist terpenuhi
npm run type-check && npm run build

# Deploy production
vercel --prod
```

---

## Lisensi

Proprietary — seluruh hak cipta dimiliki oleh **Resto Warung Papatong**.  
Kode ini tidak boleh didistribusikan atau digunakan ulang tanpa izin tertulis.

---

<div align="center">

Dibuat dengan ❤️ untuk membantu UMKM Indonesia go-digital.

**[Google Maps](https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG)** · **[Instagram](https://instagram.com/restowarungpapatong)** · **[WhatsApp](https://wa.me/6281388497651)**

</div>