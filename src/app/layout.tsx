import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFCC00',
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.siteUrl),
  title: {
    default:  APP_CONFIG.defaultTitle,
    template: `%s | ${APP_CONFIG.siteName}`,
  },
  description: APP_CONFIG.defaultDescription,
  keywords: [
    'Warung Papatong',
    'Restoran Sunda Cibinong',
    'Seafood Cibinong',
    'Restoran Keluarga Bogor',
    'Makan Enak Cibinong',
    'Lesehan Cibinong',
    'Restoran Seafood Bogor',
    'Kuliner Sunda Cibinong',
    'Booking Rombongan Cibinong',
    'Tempat Makan Keluarga Bogor',
    'Saung Lesehan Bogor',
    'Live Music Cibinong',
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
    images: [{ url: `${APP_CONFIG.siteUrl}/opengraph-image.png`, width: 1200, height: 630, alt: BUSINESS_INFO.name }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${APP_CONFIG.siteName} — Sunda & Seafood Cibinong`,
    description: 'Restoran Sunda & Seafood di Cibinong Bogor. Rating 4.8★. Lesehan asri, live music, parkir bus.',
    images:      [`${APP_CONFIG.siteUrl}/opengraph-image.png`],
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
  other: {
    'geo.position': '-6.5120209;106.8329725',
    'geo.placename': 'Cibinong, Bogor, Jawa Barat',
    'geo.region': 'ID-JB',
  },
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
