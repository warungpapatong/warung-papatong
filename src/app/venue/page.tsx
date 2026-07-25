import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { BUSINESS_INFO } from '@/data'
import { APP_CONFIG } from '@/lib/config'

const GallerySection = dynamic(() => import('@/features/gallery/components/GallerySection'))

export const metadata: Metadata = {
  title:       'Galeri Venue & Suasana Resto',
  description: 'Jelajahi suasana saung lesehan terapung, spot foto balon udara ikonik, kolam ikan koi, panggung live music, dan kehangatan kebersamaan keluarga di Warung Papatong Cibinong Bogor.',
  keywords:    'galeri warung papatong, venue restoran cibinong, saung lesehan bogor, spot foto cibinong, restoran keluarga cibinong, tempat gathering bogor, live music resto cibinong, warung papatong foto',

  alternates: {
    canonical: `${APP_CONFIG.siteUrl}/venue`,
  },

  openGraph: {
    title:       'Galeri Venue Warung Papatong — Saung Lesehan & Suasana Asri Cibinong',
    description: 'Saung lesehan terapung di atas kolam ikan, spot foto balon udara ikonik, live music akustik malam hari — semua ada di Warung Papatong Cibinong Bogor.',
    url:         `${APP_CONFIG.siteUrl}/venue`,
    siteName:    BUSINESS_INFO.name,
    locale:      'id_ID',
    type:        'website',
    images: [
      {
        url:    `${APP_CONFIG.siteUrl}/images/venue/01-gallery/new-entrance.webp`,
        width:  1200,
        height: 630,
        alt:    'Tampak depan Warung Papatong dengan area parkir luas dan suasana asri',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Galeri Venue Warung Papatong — Saung Lesehan & Suasana Asri Cibinong',
    description: 'Saung lesehan terapung di atas kolam ikan, spot foto balon udara ikonik, live music akustik malam hari — semua ada di Warung Papatong Cibinong Bogor.',
    images:      [`${APP_CONFIG.siteUrl}/images/venue/01-gallery/new-entrance.webp`],
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

export default function VenuePage() {
  return <GallerySection />
}