// src/lib/config.ts
// ─────────────────────────────────────────────────────────────────────────────
// App-level configuration: env vars, tracking helpers, SEO JSON-LD schema.
// JANGAN taruh data konten di sini — semua konten ada di src/data.ts
// ─────────────────────────────────────────────────────────────────────────────

// ─── ENVIRONMENT CONFIG ──────────────────────────────────────────────────────
export const APP_CONFIG = {
  googleAdsId:         process.env.NEXT_PUBLIC_GOOGLE_ADS_ID           ?? '',
  googleAdsLabel:      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? '',
  gscVerification:     process.env.NEXT_PUBLIC_GSC_VERIFICATION_TAG ?? '',
  whatsappNumber:      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER      ?? '6281388497651',
  siteUrl:             process.env.NEXT_PUBLIC_SITE_URL             ?? 'https://warungpapatong.com',
  siteName:            'Warung Papatong',
  defaultTitle:        'Resto Warung Papatong – Suasana Alam Terbuka dengan Hidangan Sunda dan Seafood Segar Terbaik',
  defaultDescription:  'Tempat yang sempurna untuk berkumpul, menikmati makanan Kesundaan dan seafood. Warung Papatong pilihan utama untuk makanan Kesundaan dan seafood berkualitas tinggi.',
  
  // ─── DATA TAMBAHAN UNTUK FIX ERROR ABOUT PAGE ──────────────────────────────
  whatsappBaseLink:    'https://wa.me',
  businessName:        'Resto Warung Papatong',
  handoverEmail:       'warungpapatong.cibinong@gmail.com',
} as const;

// ─── GOOGLE ADS TRACKING ─────────────────────────────────────────────────────
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Fire Google Ads conversion event untuk setiap klik WhatsApp.
 * Wajib dipanggil di setiap tombol/link WA di seluruh halaman.
 *
 * @param positionLabel - Label deskriptif posisi CTA, misal: 'Hero CTA Primary Button'
 */
export function trackWhatsAppConversion(positionLabel: string): void {
  if (typeof window === 'undefined') return;
  if (!APP_CONFIG.googleAdsId || !APP_CONFIG.googleAdsLabel) return;

  try {
    window.gtag?.('event', 'conversion', {
      send_to:       `${APP_CONFIG.googleAdsId}/${APP_CONFIG.googleAdsLabel}`,
      event_category: 'WhatsApp',
      event_label:    positionLabel,
    });
  } catch {
    // Silent fail — jangan crash halaman karena tracking
  }
}

// ─── LOCAL SEO JSON-LD SCHEMA ─────────────────────────────────────────────────
// Render di layout.tsx sebagai <script type="application/ld+json">
export const LOCAL_SEO_SCHEMA = {
  '@context':   'https://schema.org',
  '@type':      'Restaurant',
  name:         APP_CONFIG.businessName, // Dinamis menggunakan property baru
  description:  APP_CONFIG.defaultDescription,
  url:          APP_CONFIG.siteUrl,
  telephone:    `+${APP_CONFIG.whatsappNumber}`, // Dinamis
  email:        APP_CONFIG.handoverEmail, // Dinamis
  servesCuisine: ['Sunda', 'Seafood', 'Indonesian'],
  priceRange:   '$$',
  hasMenu:      `${APP_CONFIG.siteUrl}/menu`,
  acceptsReservations: 'True',
  currenciesAccepted: 'IDR',
  paymentAccepted: 'Cash, Transfer Bank, QRIS',

  address: {
    '@type':           'PostalAddress',
    streetAddress:     'Jl. Alternatif GOR Pemda No.9',
    addressLocality:   'Cibinong',
    addressRegion:     'Jawa Barat',
    postalCode:        '16912',
    addressCountry:    'ID',
  },

  geo: {
    '@type':    'GeoCoordinates',
    latitude:   -6.5120209,
    longitude:  106.8329725,
  },

  openingHoursSpecification: [
    {
      '@type':    'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens:    '11:00',
      closes:   '22:00',
    },
  ],

  aggregateRating: {
    '@type':       'AggregateRating',
    ratingValue:   '4.8',
    reviewCount:   '4076',
    bestRating:    '5',
    worstRating:   '1',
  },

  sameAs: [
    'https://www.instagram.com/restowarungpapatong',
    'https://www.tiktok.com/@warungpapatong',
    'https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor',
  ],
} as const;