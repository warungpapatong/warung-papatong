// src/app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Server Component murni
// ✅ metadata — override title/description/OG khusus halaman beranda
// ✅ JSON-LD Review + FAQ schema untuk rich result di SERP
//
// OG IMAGE:
//   Menggunakan src/app/opengraph-image.png (Next.js file-based convention).
//   Next.js otomatis generate <meta og:image> dari file tersebut —
//   tidak perlu tulis URL manual di metadata.images.
//
// LOGO:
//   Menggunakan hasil favicon generator di public/ (icon.png, favicon.ico, dll).
//   Next.js otomatis pick up icon.png/icon.ico dari src/app/ atau public/.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'

import { APP_CONFIG } from '@/lib/config'
import { BUSINESS_INFO, TESTIMONIALS_DATA, FAQS_DATA } from '@/data'

import {
  HeroSection,
  BestSellers,
  AmbienceTeaser,
  TestimonialsSection,
  FaqSection,
  LocationSection,
} from '@/features/home/components'

// ─── Per-page Metadata ────────────────────────────────────────────────────────
// Override metadata layout.tsx khusus untuk halaman beranda.
// Tidak perlu tulis `images` — Next.js otomatis pakai opengraph-image.png
// yang ada di src/app/ sebagai og:image untuk semua halaman di bawah app/.

export const metadata: Metadata = {
  title: `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong, Booking Lesehan Rombongan`,
  description:
    'Restoran Sunda & Seafood terbaik di Cibinong Bogor. Rating Google 4.8★ dari 4.000+ ulasan. Tersedia lesehan semi-outdoor, saung bambu, VIP AC, live music, dan parkir bus wisata. Booking meja rombongan gratis.',
  alternates: {
    canonical: APP_CONFIG.siteUrl,
  },
  openGraph: {
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Terbaik Cibinong`,
    description: 'Rating 4.8★ dari 4.000+ ulasan Google. Lesehan asri, seafood segar, live music malam, parkir bus wisata. Booking rombongan gratis.',
    url:         APP_CONFIG.siteUrl,
    siteName:    APP_CONFIG.siteName,
    locale:      'id_ID',
    type:        'website',
    // ✅ Tidak perlu tulis `images` di sini.
    // Next.js otomatis inject og:image dari src/app/opengraph-image.png
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong`,
    description: 'Rating 4.8★ dari 4.000+ ulasan Google. Booking lesehan rombongan gratis.',
    // ✅ Tidak perlu tulis `images` — Next.js pakai opengraph-image.png juga
  },
}

// ─── Review JSON-LD ───────────────────────────────────────────────────────────
// TestimonialsSection dirender client-side (carousel) sehingga Google tidak
// crawl teks ulasan dari HTML. JSON-LD ini menginjeksikan semua ulasan
// langsung ke <head> sebagai structured data — crawlable tanpa JS.
// Potensi: Google menampilkan star rating snippet di SERP.

function buildReviewSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Restaurant',
    name:       BUSINESS_INFO.name,
    url:        APP_CONFIG.siteUrl,
    aggregateRating: {
      '@type':      'AggregateRating',
      ratingValue:  '4.8',
      reviewCount:  '4080',
      bestRating:   '5',
      worstRating:  '1',
    },
    review: TESTIMONIALS_DATA.map(r => ({
      '@type':  'Review',
      author: {
        '@type': 'Person',
        name:    r.name,
      },
      reviewBody:   r.review,
      reviewRating: {
        '@type':      'Rating',
        ratingValue:  String(r.rating),
        bestRating:   '5',
        worstRating:  '1',
      },
      ...(r.product && { name: r.product }),
    })),
  }
}

// ─── FAQ JSON-LD ──────────────────────────────────────────────────────────────
// FaqSection sudah server-rendered, tapi FAQPage schema memberi sinyal ekstra
// ke Google untuk featured snippet accordion di halaman hasil pencarian.

function buildFaqSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:  FAQS_DATA.map(item => ({
      '@type': 'Question',
      name:    item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.answer,
      },
    })),
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildReviewSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
      />

      <HeroSection />
      <BestSellers />
      <AmbienceTeaser />
      <TestimonialsSection />
      <FaqSection />
      <LocationSection />
    </>
  )
}