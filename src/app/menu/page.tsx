import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { BUSINESS_INFO } from '@/data'
import { APP_CONFIG } from '@/lib/config'

const MenuSection = dynamic(() => import('@/features/menu/components/MenuSection'))

export const metadata: Metadata = {
  title:       'Menu Digital & Pre-Order',
  description: 'Lihat daftar lengkap menu Seafood segar & Sunda autentik Warung Papatong Cibinong. Pre-order langsung via WhatsApp — potong waktu tunggu, meja dan hidangan siap saat Anda tiba.',
  keywords:    'menu seafood cibinong, menu sunda cibinong, warung papatong menu, pre order seafood bogor, daftar menu warung papatong, kepiting cibinong, gurame cibinong, lobster bogor, resto seafood cibinong bogor',

  alternates: {
    canonical: `${APP_CONFIG.siteUrl}/menu`,
  },

  openGraph: {
    title:       'Menu Digital Warung Papatong — Pre-Order Seafood & Sunda Cibinong',
    description: 'Pre-order menu seafood & sunda segar Warung Papatong — potong antrean dapur, meja langsung siap saat Anda tiba di Cibinong Bogor!',
    url:         `${APP_CONFIG.siteUrl}/menu`,
    siteName:    BUSINESS_INFO.name,
    locale:      'id_ID',
    type:        'website',
    images: [
      {
        url:    `${APP_CONFIG.siteUrl}/images/menu/01-seafood/03-kerang-mix-corn-feast.webp`,
        width:  1200,
        height: 630,
        alt:    'Menu Seafood Segar Warung Papatong Cibinong — Kerang Mix Corn Feast',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Menu Digital Warung Papatong — Pre-Order Seafood & Sunda Cibinong',
    description: 'Pre-order menu seafood & sunda segar Warung Papatong — potong antrean dapur, meja langsung siap saat Anda tiba di Cibinong Bogor!',
    images:      [`${APP_CONFIG.siteUrl}/images/menu/01-seafood/03-kerang-mix-corn-feast.webp`],
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

export default function MenuPage() {
  return <MenuSection />
}