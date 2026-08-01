// src/lib/config.ts
// ─────────────────────────────────────────────────────────────────────────────
// App-level configuration: env vars, tracking helpers, SEO JSON-LD schema.
// ─────────────────────────────────────────────────────────────────────────────

export const APP_CONFIG = {
  googleAdsId:         process.env.NEXT_PUBLIC_GOOGLE_ADS_ID           ?? '',
  googleAdsLabel:      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? '',
  googleAdsInstagramLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_INSTAGRAM_LABEL ?? '',
  googleAdsTiktokLabel:    process.env.NEXT_PUBLIC_GOOGLE_ADS_TIKTOK_LABEL ?? '',
  googleAdsYoutubeLabel:   process.env.NEXT_PUBLIC_GOOGLE_ADS_YOUTUBE_LABEL ?? '',
  googleAnalyticsId:   process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID   ?? '',
  gscVerification:     process.env.NEXT_PUBLIC_GSC_VERIFICATION_TAG ?? '',
  whatsappNumber:      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER      ?? '6281388497651',
  siteUrl:             process.env.NEXT_PUBLIC_SITE_URL             ?? 'https://warungpapatong.com',
  siteName:            'Warung Papatong',
  defaultTitle:        'Resto Warung Papatong — Sunda & Seafood di Cibinong',
  defaultDescription:  'Restoran Sunda & seafood segar di Cibinong Bogor. Lesehan saung asri, live music, parkir bus wisata, dan booking rombongan gratis.',
  businessName:        'Resto Warung Papatong',
  handoverEmail:       'warungpapatong@gmail.com',
} as const;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export interface WhatsAppConversionOptions {
  /** Nilai pesanan dalam Rupiah (opsional, hanya untuk checkout). */
  value?: number;
  /** ID transaksi unik (opsional) untuk mencegah double-counting. */
  transactionId?: string;
}

export type SocialPlatform = 'Instagram' | 'TikTok' | 'YouTube';

const socialAdsLabels: Record<SocialPlatform, string> = {
  Instagram: APP_CONFIG.googleAdsInstagramLabel,
  TikTok:    APP_CONFIG.googleAdsTiktokLabel,
  YouTube:   APP_CONFIG.googleAdsYoutubeLabel,
};

/**
 * Firebase SEMUA klik WhatsApp yang relevan sebagai konversi bisnis:
 *
 *  1. Google Ads conversion  — pakai tag AW-xxxxx/<label> (WAJIB label asli,
 *     bukan placeholder). Ini yang bikin klik muncul di kolom "Conversions".
 *  2. GA4 event `whatsapp_click` — tercatat di GA4. Bisa dijadikan konversi
 *     GA4, lalu di-import ke Google Ads sebagai "Import from Google Analytics".
 *
 * Jika label Ads masih placeholder, function ini diam saja untuk Ads (tidak
 * error) tapi tetap mengirim event ke GA4 — jadi tracking tidak hilang total.
 */
export function trackWhatsAppConversion(
  positionLabel: string,
  options: WhatsAppConversionOptions = {},
): void {
  if (typeof window === 'undefined') return;
  const { googleAdsId, googleAdsLabel, googleAnalyticsId } = APP_CONFIG;

  try {
    // 1. Google Ads conversion — hanya jika kedua nilai sudah terisi & bukan placeholder
    if (googleAdsId && googleAdsLabel && !googleAdsLabel.startsWith('WA_Click_Conversion_Label')) {
      window.gtag?.('event', 'conversion', {
        send_to:        `${googleAdsId}/${googleAdsLabel}`,
        event_category: 'WhatsApp',
        event_label:    positionLabel,
        ...(options.value !== undefined ? { value: options.value, currency: 'IDR' } : {}),
        ...(options.transactionId ? { transaction_id: options.transactionId } : {}),
      });
    }

    // 2. GA4 custom event — tercatat di GA4 & bisa di-import ke Ads.
    //    Catatan: untuk GA4, event custom yang diinginkan sebagai konversi
    //    harus ditandai "Mark as conversion" di Admin GA4 → Events.
    if (googleAnalyticsId) {
      window.gtag?.('event', 'whatsapp_click', {
        event_category: 'WhatsApp',
        event_label:    positionLabel,
        ...(options.value !== undefined ? { value: options.value, currency: 'IDR' } : {}),
      });
    }
  } catch {
    // Silent fail
  }
}

/**
 * Track klik ke akun sosial media (Instagram / TikTok / YouTube).
 *
 * 1. GA4 custom event `social_click` — selalu dikirim.
 * 2. Google Ads conversion — hanya jika label konversi akun sosial sudah
 *    diisi di env (`NEXT_PUBLIC_GOOGLE_ADS_{PLATFORM}_LABEL`).
 *
 * Sumber label: Google Ads → Tools → Conversions → klik konversi
 * "Instagram"/"Tiktok"/"YouTube" → Tag setup → salin label setelah "/".
 */
export function trackSocialClick(
  platform: SocialPlatform,
  positionLabel?: string,
): void {
  if (typeof window === 'undefined') return;
  const { googleAdsId, googleAnalyticsId } = APP_CONFIG;
  const fullLabel = positionLabel ? `${platform} — ${positionLabel}` : platform;

  try {
    // 1. GA4 — event social_click (bisa dijadikan konversi GA4 / diimport ke Ads)
    if (googleAnalyticsId) {
      window.gtag?.('event', 'social_click', {
        event_category: 'Social',
        event_label:    fullLabel,
        platform:       platform.toLowerCase(),
      });
    }

    // 2. Google Ads — hanya jika label asli sudah diisi (bukan placeholder)
    const adsLabel = socialAdsLabels[platform];
    if (googleAdsId && adsLabel && !adsLabel.startsWith('SOCIAL_Label')) {
      window.gtag?.('event', 'conversion', {
        send_to:        `${googleAdsId}/${adsLabel}`,
        event_category: 'Social',
        event_label:    fullLabel,
      });
    }
  } catch {
    // Silent fail
  }
}

/** WebSite schema — memperkuat sinyal entity situs untuk AI engines. */
export const WEB_SITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  '@id':      `${APP_CONFIG.siteUrl}/#website`,
  url:        APP_CONFIG.siteUrl,
  name:       APP_CONFIG.siteName,
  description: APP_CONFIG.defaultDescription,
  inLanguage: 'id-ID',
  publisher:  { '@id': `${APP_CONFIG.siteUrl}/#restaurant` },
} as const;

/** BreadcrumbList schema — untuk tiap halaman agar konteks navigasi jelas. */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
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
  foundingDate: '2019',
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
