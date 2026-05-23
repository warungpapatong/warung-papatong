import React from "react";
import { APP_CONFIG, LOCAL_SEO_SCHEMA } from "@/lib/config";
import "@/index.css";

export const metadata = {
  title: `${APP_CONFIG.businessName} - Restaurant Sunda & Seafood Segar Terbaik Cibinong`,
  description: "Selamat datang di Warung Papatong Cibinong, tempat makan Sunda legendaris & Seafood bakar madu terlaris dengan lesehan asri, kolam ikan sejuk, dan parkiran luas di Bogor.",
  keywords: ["Sunda", "Seafood", "Cibinong", "Warung Papatong", "Sentul", "Bogor Lesehan"],
  verification: {
    google: "p1t9_gqXU_someRealLookingVerificationKey2026",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content={APP_CONFIG.searchConsoleVerificationTag.split("=")[1]} />
        
        {/* Modern non-blocking script injection for Google Ads Tracking (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${APP_CONFIG.googleAdsId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${APP_CONFIG.googleAdsId}');
            `,
          }}
        />

        {/* Local SEO schema.org/Restaurant Rich Metadata Card */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_SEO_SCHEMA),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F9FA] text-[#202124] antialiased selection:bg-[#FFCC00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
