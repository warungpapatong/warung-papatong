// src/app/manifest.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Next.js native MetadataRoute.Manifest — lebih baik dari manifest.json statis:
//    - nama & deskripsi dari BUSINESS_INFO (single source of truth)
//    - tidak ada drift antara manifest dan metadata lainnya
//
// Output: GET /manifest.webmanifest
//
// CATATAN:
//   Hapus file public/manifest.json statis jika ada.
// ─────────────────────────────────────────────────────────────────────────────

import type { MetadataRoute } from 'next'
import { BUSINESS_INFO } from '@/data'
import { APP_CONFIG } from '@/lib/config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             BUSINESS_INFO.name,
    short_name:       'Papatong',
    description:      BUSINESS_INFO.tagline,
    start_url:        '/',
    display:          'standalone',
    background_color: '#ffffff',
    theme_color:      '#ffffff',
    lang:             'id',
    scope:            '/',
    icons: [
      {
        src:     '/web-app-manifest-192x192.png',
        sizes:   '192x192',
        type:    'image/png',
        purpose: 'maskable',
      },
      {
        src:     '/web-app-manifest-512x512.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
    // shortcuts: pintasan ke halaman menu dari home screen app
    shortcuts: [
      {
        name:      'Lihat Menu',
        short_name: 'Menu',
        url:       '/menu',
        icons: [{ src: '/web-app-manifest-192x192.png', sizes: '192x192' }],
      },
    ],
  }
}