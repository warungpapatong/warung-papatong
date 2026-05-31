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
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong`,
    description: 'Rating 4.8★ dari 4.000+ ulasan Google. Booking lesehan rombongan gratis.',
  },
}

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
      author:   { '@type': 'Person', name: r.name },
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

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: FAQS_DATA.map(item => ({
      '@type': 'Question',
      name:    item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.answer,
      },
    })),
  }
}

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