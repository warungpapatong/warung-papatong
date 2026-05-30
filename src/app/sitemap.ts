// src/app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Next.js native MetadataRoute.Sitemap — lebih baik dari sitemap.xml statis:
//    - lastModified otomatis pakai tanggal build/sekarang
//    - siteUrl dari APP_CONFIG (single source of truth)
//    - bisa diperluas dengan halaman dinamis (produk, blog, dll)
//
// Output: GET /sitemap.xml
//
// CATATAN:
//   Hapus file public/sitemap.xml statis jika ada, karena Next.js
//   akan serve /sitemap.xml dari sini — keduanya tidak boleh konflik.
// ─────────────────────────────────────────────────────────────────────────────

import type { MetadataRoute } from 'next'
import { APP_CONFIG } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_CONFIG.siteUrl

  // Tanggal build — semua halaman dianggap diupdate saat deploy
  const now = new Date()

  return [
    {
      url:        `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url:        `${base}/menu`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url:        `${base}/venue`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url:        `${base}/tentang`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}