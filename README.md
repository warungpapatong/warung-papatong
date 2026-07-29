# Warung Papatong — Website Resmi

**E-Menu Digital & Sistem Pre-Order untuk Resto Sunda Seafood di Cibinong, Bogor.**

[warungpapatong.com](https://warungpapatong.com)

---

## Documentation

| Audience | Document | Description |
|----------|----------|-------------|
| **Developer** | [`README-dev.md`](./README-dev.md) | Architecture, setup, coding conventions, common tasks |
| **Owner/Client** | [`README-owner.md`](./README-owner.md) | Business operations, how to update content, handoff guide |

---

## Tech Stack

Next.js 15 · React 19 · TypeScript 5.8 · Tailwind CSS 3.4 · Motion 12 · Lucide React

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev     # → http://localhost:3000
npm run build   # Production build
```

## Routes

| Path | Page | Google Ads |
|------|------|------------|
| `/` | Beranda | ✅ Active |
| `/menu` | E-Menu Digital | ✅ Active |
| `/venue` | Galeri & Suasana | ✅ Active |
| `/about` | Tentang Kami | ✅ Active |

> **⚠️ Do not change routes above** — linked to active Google Ads campaigns.

## Key Architecture

- **Single Source of Truth**: All content in `src/data.ts`, all types in `src/types.ts`
- **Server Components by default**: Only `'use client'` when browser APIs required
- **WA messages**: Built by helpers in `src/lib/whatsapp.ts` — never inline
- **Price display**: Always `formatProductPrice(product)` — never store `priceFormatted`
- **Reusable classes**: `.btn`, `.badge`, `.card`, `.input`, `.section` from Tailwind plugin
- **`cn()`**: from `@/lib/cn` for className merging

## License

Proprietary — **Resto Warung Papatong**. All rights reserved.
