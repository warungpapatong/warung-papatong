// src/app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root Layout — Server Component (wajib, agar bisa export `metadata`)
// Font loading via next/font/google untuk performa optimal (no FOUT)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { APP_CONFIG, LOCAL_SEO_SCHEMA } from '@/lib/config'
import LayoutShell from '@/components/layout/LayoutShell'

// @ts-ignore atau @ts-expect-error digunakan karena css ditangani oleh bundler Next.js, bukan TSC
// @ts-ignore
import './globals.css'

// ─── FONT LOADERS ─────────────────────────────────────────────────────────────
// CSS variables-nya di-inject ke <html> dan dikonsumsi oleh tailwind.config.js
// via fontFamily: { sans: ['var(--font-sans)', ...], dst. }

const fontSans = Inter({
  subsets:  ['latin'],
  variable: '--font-sans',
  display:  'swap',
})

const fontDisplay = Plus_Jakarta_Sans({
  subsets:  ['latin'],
  variable: '--font-display',
  display:  'swap',
  // Weight yang dipakai: 600 (semibold heading), 700 (bold), 800 (extrabold display)
  weight:   ['400', '500', '600', '700', '800'],
})

const fontMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-mono',
  display:  'swap',
  // Hanya dipakai untuk harga & jam — cukup regular + medium
  weight:   ['400', '500'],
})

// ─── METADATA ─────────────────────────────────────────────────────────────────

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
  ],
  // gscVerification sudah dalam format mentah — tidak perlu strip prefix
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
}

// ─── ROOT LAYOUT ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      // CSS font variables di-inject ke sini — dipakai tailwind.config.js
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <head>
        {/* Schema.org Restaurant JSON-LD — Local SEO rich snippet */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_SEO_SCHEMA) }}
        />
      </head>

      <body className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased">
        {/*
         * LayoutShell → Client Component
         * Memegang: isBookingOpen state, basket state
         * Render:   Navbar, Footer, FloatingWA, InteractiveBooking modal
         *
         * Dipisah ke file sendiri karena layout.tsx harus Server Component
         * agar bisa export `metadata` di atas.
         */}
        <LayoutShell>{children}</LayoutShell>

        {/* Google Ads gtag.js — non-blocking, load setelah halaman interaktif */}
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