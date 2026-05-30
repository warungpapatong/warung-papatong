// src/app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Next.js native MetadataRoute.Robots — lebih baik dari robots.txt statis
//    karena bisa pakai APP_CONFIG sebagai single source untuk siteUrl.
//
// Output: GET /robots.txt
// ─────────────────────────────────────────────────────────────────────────────

import type { MetadataRoute } from 'next'
import { APP_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Blokir path yang tidak perlu diindeks
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${APP_CONFIG.siteUrl}/sitemap.xml`,
    host: APP_CONFIG.siteUrl,
  }
}