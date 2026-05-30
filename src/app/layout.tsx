// src/app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root Layout — Server Component (wajib, agar bisa export `metadata`)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { APP_CONFIG, LOCAL_SEO_SCHEMA } from '@/lib/config'
import { BUSINESS_INFO } from '@/data'
import LayoutShell from '@/components/layout/LayoutShell'

// @ts-ignore
import './globals.css'

// ─── Font Loaders ─────────────────────────────────────────────────────────────

const fontSans = Inter({
  subsets:  ['latin'],
  variable: '--font-sans',
  display:  'swap',
})

const fontDisplay = Plus_Jakarta_Sans({
  subsets:  ['latin'],
  variable: '--font-display',
  display:  'swap',
  weight:   ['400', '500', '600', '700', '800'],
})

const fontMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-mono',
  display:  'swap',
  weight:   ['400', '500'],
})

// ─── Metadata Default (di-override per-page via generateMetadata) ─────────────

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.siteUrl),
  title: {
    default:  APP_CONFIG.defaultTitle,
    template: `%s | ${APP_CONFIG.siteName}`,
  },
  description: APP_CONFIG.defaultDescription,
  keywords: [
    'Warung Papatong',
    'Sunda', 'Seafood',
    'Cibinong', 'Bogor', 'Sentul',
    'Lesehan Cibinong',
    'Restoran Seafood Bogor',
    'Kuliner Sunda Cibinong',
    'Resto Bogor',
    'Booking Rombongan Cibinong',
  ],
  verification: {
    google: APP_CONFIG.gscVerification,
  },
  openGraph: {
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong`,
    description: APP_CONFIG.defaultDescription,
    url:         APP_CONFIG.siteUrl,
    siteName:    APP_CONFIG.siteName,
    locale:      'id_ID',
    type:        'website',
  },
  // Memberi tahu Google bahwa /sitemap.xml ada (redundant tapi tidak ada ruginya)
  alternates: {
    canonical: APP_CONFIG.siteUrl,
  },
}

// ─── Organization JSON-LD ─────────────────────────────────────────────────────
// Schema ini berlaku global untuk semua halaman (bukan hanya beranda).
// Memberi tahu Google identitas organisasi bisnis secara menyeluruh.

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    ['Restaurant', 'FoodEstablishment', 'Organization'],
  '@id':      `${APP_CONFIG.siteUrl}/#organization`,
  name:       BUSINESS_INFO.name,
  url:        APP_CONFIG.siteUrl,
  // Pakai icon 512x512 dari favicon generator — ukuran terbesar yang tersedia
  // Next.js convention: file icon di src/app/ atau public/ (sesuaikan path)
  logo:       `${APP_CONFIG.siteUrl}/web-app-manifest-512x512.png`,
  image:      `${APP_CONFIG.siteUrl}/opengraph-image.png`,
  description: BUSINESS_INFO.description,
  address: {
    '@type':           'PostalAddress',
    streetAddress:     BUSINESS_INFO.address,
    addressLocality:   'Cibinong',
    addressRegion:     'Jawa Barat',
    postalCode:        '16912',
    addressCountry:    'ID',
  },
  geo: {
    '@type':     'GeoCoordinates',
    latitude:    -6.512020895289522,
    longitude:   106.83078381744384,
  },
  telephone:       BUSINESS_INFO.phone,
  email:           BUSINESS_INFO.email,
  openingHours:    'Mo-Su 11:00-22:00',
  servesCuisine:   ['Sunda', 'Seafood', 'Indonesian'],
  priceRange:      'Rp 25.000 – Rp 300.000',
  hasMap:          BUSINESS_INFO.mapsLink,
  sameAs: [
    `https://instagram.com/${BUSINESS_INFO.instagram}`,
    `https://tiktok.com/@${BUSINESS_INFO.tiktok}`,
    BUSINESS_INFO.mapsLink,
  ],
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <head>
        {/* Restaurant LocalBusiness schema (dari lib/config) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_SEO_SCHEMA) }}
        />
        {/* Organization schema — berlaku di semua halaman */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <meta name="apple-mobile-web-app-title" content="Warung Papatong" />
      </head>

      <body className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased">
        <LayoutShell>{children}</LayoutShell>

        {/* Google Ads — non-blocking, load setelah halaman interaktif */}
        {APP_CONFIG.googleAdsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${APP_CONFIG.googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${APP_CONFIG.googleAdsId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}