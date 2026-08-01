import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { APP_CONFIG, buildBreadcrumbSchema } from '@/lib/config'
import { BUSINESS_INFO, TESTIMONIALS_DATA, FAQS_DATA } from '@/data'

import HeroSection from '@/features/home/hero/HeroSection'

const BestSellers = dynamic(() => import('@/features/home/bestsellers/BestSellers'))
const AmbienceTeaser = dynamic(() => import('@/features/home/ambience/AmbienceTeaser'))
const TestimonialsSection = dynamic(() => import('@/features/home/testimonials/TestimonialsSection'))
const FaqSection = dynamic(() => import('@/features/home/faq/FaqSection'))
const LocationSection = dynamic(() => import('@/features/home/location/LocationSection'))

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
    images: [{ url: `${APP_CONFIG.siteUrl}/opengraph-image.png`, width: 1200, height: 630, alt: BUSINESS_INFO.name }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong`,
    description: 'Rating 4.8★ dari 4.000+ ulasan Google. Booking lesehan rombongan gratis.',
    images:      [`${APP_CONFIG.siteUrl}/opengraph-image.png`],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
}

function buildReviewSchema() {
  return {
    '@context':    'https://schema.org',
    '@type':       'Restaurant',
    '@id':         `${APP_CONFIG.siteUrl}/#restaurant`,
    name:          BUSINESS_INFO.name,
    url:           APP_CONFIG.siteUrl,
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
    '@id':      `${APP_CONFIG.siteUrl}/#faq`,
    mainEntity: FAQS_DATA.map(item => ({
      '@type': 'Question',
      name:    item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.answer,
      },
    })),
    // speakable → memungkinkan Google Assistant / AI Overviews membacakan
    // jawaban FAQ langsung dari konten halaman.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#faq', '#faq .accordion-item'],
    },
  }
}

function buildBreadcrumb() {
  return buildBreadcrumbSchema([
    { name: 'Beranda', url: `${APP_CONFIG.siteUrl}/` },
  ])
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumb()) }}
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
