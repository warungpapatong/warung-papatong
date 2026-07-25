// src/lib/config.ts
// ─────────────────────────────────────────────────────────────────────────────
// App-level configuration: env vars, tracking helpers, SEO JSON-LD schema.
// ─────────────────────────────────────────────────────────────────────────────

export const APP_CONFIG = {
  googleAdsId:         process.env.NEXT_PUBLIC_GOOGLE_ADS_ID           ?? '',
  googleAdsLabel:      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? '',
  gscVerification:     process.env.NEXT_PUBLIC_GSC_VERIFICATION_TAG ?? '',
  whatsappNumber:      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER      ?? '6281388497651',
  siteUrl:             process.env.NEXT_PUBLIC_SITE_URL             ?? 'https://warungpapatong.com',
  siteName:            'Warung Papatong',
  defaultTitle:        'Resto Warung Papatong – Seafood Segar dan Cita Rasa Sunda Autentik di Cibinong',
  defaultDescription:  'Nikmati kelezatan seafood segar yang langsung dari laut, berpadu dengan cita rasa khas masakan Sunda yang hangat dan penuh tradisi. Kami menghadirkan harmoni rasa Nusantara — dari gurihnya ikan bakar hingga nikmatnya masakan khas Sunda — semua tersaji dalam suasana ramah dan penuh keakraban.',
  businessName:        'Resto Warung Papatong',
  handoverEmail:       'warungpapatong@gmail.com',
} as const;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

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
    // Silent fail
  }
}

export const LOCAL_SEO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type':    ['Restaurant', 'FoodEstablishment', 'LocalBusiness', 'Organization'],
  '@id':      `${APP_CONFIG.siteUrl}/#restaurant`,
  name:       APP_CONFIG.businessName,
  url:        APP_CONFIG.siteUrl,
  telephone:  `+${APP_CONFIG.whatsappNumber}`,
  email:      APP_CONFIG.handoverEmail,
  logo:       `${APP_CONFIG.siteUrl}/web-app-manifest-512x512.png`,
  image:      `${APP_CONFIG.siteUrl}/opengraph-image.png`,
  description: APP_CONFIG.defaultDescription,
  servesCuisine: ['Sunda', 'Seafood', 'Indonesian'],
  priceRange:   'Rp 25.000 – Rp 300.000',
  hasMenu:      `${APP_CONFIG.siteUrl}/menu`,
  hasMap:       'https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor',
  acceptsReservations: 'True',
  currenciesAccepted:  'IDR',
  paymentAccepted:     'Cash, Transfer Bank, QRIS',

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
    reviewCount:   '4080',
    bestRating:    '5',
    worstRating:   '1',
  },

  sameAs: [
    'https://www.instagram.com/restowarungpapatong',
    'https://www.tiktok.com/@restowarungpapatong',
    'https://www.youtube.com/@warungpapatong',
    'https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor',
  ],
} as const;
