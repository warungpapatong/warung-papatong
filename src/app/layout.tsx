import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

import { APP_CONFIG, LOCAL_SEO_SCHEMA } from '@/lib/config'
import { BUSINESS_INFO } from '@/data'
import LayoutShell from '@/components/layout/LayoutShell'
// @ts-ignore
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.siteUrl),
  title: {
    default:  APP_CONFIG.defaultTitle,
    template: `%s | ${APP_CONFIG.siteName}`,
  },
  description: APP_CONFIG.defaultDescription,
  keywords: [
    'Warung Papatong',
    'Sunda',
    'Seafood',
    'Cibinong',
    'Bogor',
    'Sentul',
    'Lesehan Cibinong',
    'Restoran Seafood Bogor',
    'Kuliner Sunda Cibinong',
    'Resto Bogor',
    'Booking Rombongan Cibinong',
  ],
  authors: [{ name: BUSINESS_INFO.name, url: APP_CONFIG.siteUrl }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  verification: {
    google: APP_CONFIG.gscVerification,
  },
  alternates: {
    canonical: APP_CONFIG.siteUrl,
  },
  openGraph: {
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong`,
    description: APP_CONFIG.defaultDescription,
    url:         APP_CONFIG.siteUrl,
    siteName:    APP_CONFIG.siteName,
    locale:      'id_ID',
    type:        'website',
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
}

const organizationSchema = {
  '@context':  'https://schema.org',
  '@type':     ['Restaurant', 'FoodEstablishment', 'Organization'],
  '@id':       `${APP_CONFIG.siteUrl}/#organization`,
  name:        BUSINESS_INFO.name,
  url:         APP_CONFIG.siteUrl,
  logo:        `${APP_CONFIG.siteUrl}/web-app-manifest-512x512.png`,
  image:       `${APP_CONFIG.siteUrl}/opengraph-image.png`,
  description: BUSINESS_INFO.description,
  address: {
    '@type':         'PostalAddress',
    streetAddress:   BUSINESS_INFO.address,
    addressLocality: 'Cibinong',
    addressRegion:   'Jawa Barat',
    postalCode:      '16912',
    addressCountry:  'ID',
  },
  geo: {
    '@type':    'GeoCoordinates',
    latitude:   -6.512020895289522,
    longitude:  106.83078381744384,
  },
  telephone:     BUSINESS_INFO.phone,
  email:         BUSINESS_INFO.email,
  openingHours:  'Mo-Su 11:00-22:00',
  servesCuisine: ['Sunda', 'Seafood', 'Indonesian'],
  priceRange:    'Rp 25.000 – Rp 300.000',
  hasMap:        BUSINESS_INFO.mapsLink,
  sameAs: [
    `https://instagram.com/${BUSINESS_INFO.instagram}`,
    `https://tiktok.com/@${BUSINESS_INFO.tiktok}`,
    BUSINESS_INFO.mapsLink,
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_SEO_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <meta name="apple-mobile-web-app-title" content={BUSINESS_INFO.name} />
      </head>

      <body className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased">
        <LayoutShell>{children}</LayoutShell>

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