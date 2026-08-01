import type { MetadataRoute } from 'next'

import { APP_CONFIG } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_CONFIG.siteUrl

  // Tanggal stabil (rilis v2.3.0) — hindari `new Date()` agar sitemap tidak
  // berganti lastModified setiap build, sehingga Google tidak re-crawl terus.
  const lastUpdate = '2026-07-25'

  return [
    { url: `${base}/`,       lastModified: lastUpdate, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/menu`,   lastModified: lastUpdate, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/venue`,  lastModified: lastUpdate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,  lastModified: lastUpdate, changeFrequency: 'monthly', priority: 0.7 },
  ]
}