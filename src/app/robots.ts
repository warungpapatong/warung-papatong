import type { MetadataRoute } from 'next'

import { APP_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${APP_CONFIG.siteUrl}/sitemap.xml`,
    host:    APP_CONFIG.siteUrl,
  }
}