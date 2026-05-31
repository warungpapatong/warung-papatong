import type { MetadataRoute } from 'next'

import { APP_CONFIG } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_CONFIG.siteUrl
  const now  = new Date()

  return [
    { url: `${base}/`,       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/menu`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/venue`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}