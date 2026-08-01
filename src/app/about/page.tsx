// src/app/about/page.tsx

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { BUSINESS_INFO } from '@/data'
import { APP_CONFIG, buildBreadcrumbSchema } from '@/lib/config'

const AboutStory = dynamic(() => import('@/features/about/components/AboutStory'))
const AboutCTA = dynamic(() => import('@/features/about/components/AboutCTA'))

function buildBreadcrumb() {
  return buildBreadcrumbSchema([
    { name: 'Beranda', url: `${APP_CONFIG.siteUrl}/` },
    { name: 'Tentang Kami', url: `${APP_CONFIG.siteUrl}/about` },
  ])
}

export const metadata: Metadata = {
  title:
    'Tentang Warung Papatong — Resto Seafood & Sunda Favorit Cibinong',

  description:
    'Kisah Warung Papatong, restoran Sunda & Seafood keluarga di Cibinong sejak 2019. Saung lesehan, live music, area gathering, dan seafood segar berkualitas.',

  alternates: {
    canonical: `${APP_CONFIG.siteUrl}/about`,
    languages: {
      'id':        `${APP_CONFIG.siteUrl}/about`,
      'x-default': `${APP_CONFIG.siteUrl}/about`,
    },
  },

  openGraph: {
    title:
      'Tentang Warung Papatong — Seafood & Sunda Favorit Cibinong',

    description:
      'Kisah perjalanan Warung Papatong menghadirkan pengalaman kuliner Sunda autentik dan seafood segar dalam suasana saung lesehan yang nyaman.',

    url: `${APP_CONFIG.siteUrl}/about`,
    siteName: BUSINESS_INFO.name,
    locale: 'id_ID',
    type: 'website',

    images: [
      {
        url: `${APP_CONFIG.siteUrl}/images/venue/03-gallery/balon-udara2.webp`,
        width: 1200,
        height: 630,
        alt: 'Spot foto balon udara ikonik Warung Papatong Cibinong Bogor',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Tentang Warung Papatong — Seafood & Sunda Favorit Cibinong',

    description:
      'Mengenal sejarah, filosofi, dan pengalaman kuliner keluarga di Warung Papatong.',

    images: [
      `${APP_CONFIG.siteUrl}/images/venue/03-gallery/balon-udara2.webp`,
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumb()) }}
      />
      <AboutStory />
      <AboutCTA />
    </>
  )
}