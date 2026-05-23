/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Define explicit TypeScript interfaces for strict Type-Safety
export interface AppConfig {
  googleAdsId: string;
  googleAdsConversionLabel: string;
  searchConsoleVerificationTag: string;
  whatsappNumber: string;
  whatsappBaseLink: string;
  googleMapsApiReference: string;
  handoverEmail: string;
  businessName: string;
}

// Concentration of parameters for perfect handover via warungpapatong.project@gmail.com
export const APP_CONFIG: AppConfig = {
  googleAdsId: "AW-1649827361", // Replace with actual Google Ads ID
  googleAdsConversionLabel: "WA_Click_Conversion_Label_XYZ", // Replace with actual conversion label
  searchConsoleVerificationTag: "google-site-verification=p1t9_gqXU_someRealLookingVerificationKey2026",
  whatsappNumber: "6281388497651",
  whatsappBaseLink: "https://wa.me/6281388497651",
  googleMapsApiReference: "https://www.google.com/maps/embed/v1/place?key=AIzaSyA_RealApiPlaceholder_Papatong",
  handoverEmail: "warungpapatong.project@gmail.com",
  businessName: "Warung Papatong"
};

// Declaring global window interface safely for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Initializes Google Ads gtag.js dynamically into the document head
 * conforming with strict SEO and performance standards.
 */
export function initGoogleAdsTracking(config: AppConfig): void {
  if (typeof window === "undefined") return;

  // 1. Inject Google Search Console Meta Verification Tag
  if (config.searchConsoleVerificationTag) {
    let metaTag = document.querySelector('meta[name="google-site-verification"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "google-site-verification");
      metaTag.setAttribute("content", config.searchConsoleVerificationTag);
      document.head.appendChild(metaTag);
    }
  }

  // 2. Load gtag.js script
  const scriptId = "google-ads-gtag-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAdsId}`;
    document.head.appendChild(script);

    // Initialise dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };

    // Configuration call
    window.gtag("js", new Date());
    window.gtag("config", config.googleAdsId);
    
    console.log(`[GoogleAds] Initialized tracker for id: ${config.googleAdsId}`);
  }
}

/**
 * Universal Click Tracking Handler for external conversion triggers.
 * Automatically signals Google Ads conversion events in a strictly typed manner.
 */
export function trackWhatsAppConversion(
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | MouseEvent,
  position: string
): void {
  // Prevent default can be decided where triggered, here we log & signal
  console.log(`[ConversionTrigger] WhatsApp CTA clicked at position: "${position}"`);

  if (typeof window !== "undefined" && window.gtag) {
    // Fire Google Ads conversion event
    window.gtag("event", "conversion", {
      send_to: `${APP_CONFIG.googleAdsId}/${APP_CONFIG.googleAdsConversionLabel}`,
      event_callback: () => {
        console.log(`[GoogleAds] Converted successfully at position: ${position}`);
      }
    });
  } else {
    // Development verification mock fallback
    console.warn(
      `[GoogleAds] Tracking hit registered, but gtag is offline (simulation mode). Event: ${position}`
    );
  }
}
