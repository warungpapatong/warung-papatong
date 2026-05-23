/**
 * Warung Papatong Core System Configuration
 * Optimized for local SEO indexing, Google Ads integration, and simple handovers.
 */

export interface AppConfig {
  googleAdsId: string;
  googleAdsConversionLabel: string;
  searchConsoleVerificationTag: string;
  whatsappNumber: string;
  whatsappBaseLink: string;
  googleMapsApiReference: string;
  handoverEmail: string;
  businessName: string;
  phoneRaw: string;
  phoneFormatted: string;
  hoursOfOperation: string;
  locationAddress: string;
  cityRegency: string;
  postalCode: string;
  gpsCoordinates: {
    lat: number;
    lng: number;
  };
  financialMilestones: {
    grandTotal: string;
    termin1: string;
    termin2: string;
    termin3: string;
  };
}

// Global master parameters loaded dynamically from modern VITE_ variables with secure pre-production fallbacks
export const APP_CONFIG: AppConfig = {
  googleAdsId: ((import.meta as any).env?.VITE_GOOGLE_ADS_ID as string) || "AW-1649827361",
  googleAdsConversionLabel: ((import.meta as any).env?.VITE_GOOGLE_ADS_CONVERSION_LABEL as string) || "WA_Click_Conversion_Label_XYZ",
  searchConsoleVerificationTag: ((import.meta as any).env?.VITE_GSC_VERIFICATION_TAG as string) || "google-site-verification=p1t9_gqXU_someRealLookingVerificationKey2026",
  whatsappNumber: ((import.meta as any).env?.VITE_WHATSAPP_NUMBER as string) || "6281388497651",
  whatsappBaseLink: `https://wa.me/${((import.meta as any).env?.VITE_WHATSAPP_NUMBER as string) || "6281388497651"}`,
  googleMapsApiReference: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.332305599811!2d106.8415758!3d-6.4800742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c17ab0cc8e33%3A0x7d6f5f9e2b14bb44!2sJl.%20Alternatif%20GOR%20Pemda%20No.9%2C%20Nanggewer%20Mekar%2C%20Kec.%20Cibinong%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016912!5e0!3m2!1sid!2sid!4v1716382103504!5m2!1sid!2sid",
  handoverEmail: "warungpapatong.project@gmail.com",
  businessName: "Resto Warung Papatong",
  phoneRaw: "081388497651",
  phoneFormatted: "0813-8849-7651",
  hoursOfOperation: "Senin–Minggu: 11:00 AM – 10:00 PM",
  locationAddress: "Jl. Alternatif GOR Pemda No.9, Nanggewer Mekar, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16912 (Strategic Landmark: Dekat exit toll Sirkuit Sentul)",
  cityRegency: "Bogor, Cibinong",
  postalCode: "16912",
  gpsCoordinates: {
    lat: -6.4800742,
    lng: 106.8415758
  },
  financialMilestones: {
    grandTotal: "Rp 1.000.000",
    termin1: "Rp 400.000",
    termin2: "Rp 300.000",
    termin3: "Rp 300.000"
  }
};

/**
 * Declaring global window interface for gtag analytics trackers
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Universal Click Tracking Handler for Google Ads Conversions.
 * Fires standard gtag event elements directly.
 */
export function trackWhatsAppConversion(
  event?: any,
  position?: string
): void {
  const context = position || "Generic WhatsApp Trigger";
  console.log(`[GoogleAds Tracker] Conversion clicked position: "${context}"`);

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${APP_CONFIG.googleAdsId}/${APP_CONFIG.googleAdsConversionLabel}`,
      event_callback: () => {
        console.log(`[GoogleAds] Completed conversion callback from position: "${context}"`);
      }
    });
  } else {
    console.warn(`[GoogleAds Mock] gtag not initialized. Conversion simulated at: "${context}"`);
  }
}

/**
 * Strict Local SEO structured data (schema.org/Restaurant) injection block
 */
export const LOCAL_SEO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": APP_CONFIG.businessName,
  "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop&q=80",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Alternatif GOR Pemda No.9, Nanggewer Mekar, Kec. Cibinong",
    "addressLocality": "Cibinong, Kabupaten Bogor",
    "addressRegion": "Jawa Barat",
    "postalCode": APP_CONFIG.postalCode,
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": APP_CONFIG.gpsCoordinates.lat,
    "longitude": APP_CONFIG.gpsCoordinates.lng
  },
  "url": "https://warungpapatong.com",
  "telephone": APP_CONFIG.phoneFormatted,
  "servesCuisine": [
    "Sundanese",
    "Indonesian Seafood"
  ],
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "11:00",
    "closes": "22:00"
  }
};
