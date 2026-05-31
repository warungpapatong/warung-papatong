import type { MetadataRoute } from 'next'

import { BUSINESS_INFO } from '@/data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             BUSINESS_INFO.name,
    short_name:       'Papatong',
    description:      BUSINESS_INFO.tagline,
    start_url:        '/',
    display:          'standalone',
    background_color: '#ffffff',
    theme_color:      '#FFCC00',
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
    shortcuts: [
      {
        name:       'Lihat Menu',
        short_name: 'Menu',
        url:        '/menu',
        icons: [{ src: '/web-app-manifest-192x192.png', sizes: '192x192' }],
      },
    ],
  }
}