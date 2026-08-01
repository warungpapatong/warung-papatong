import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  experimental: {},

  transpilePackages: [],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.elfsight.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com https://*.elfsight.com https://*.facebook.com https://*.instagram.com https://www.google.com https://www.gstatic.com https://*.gstatic.com https://lh3.googleusercontent.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://*.googlesyndication.com",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://td.doubleclick.net https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://*.googlesyndication.com https://*.elfsight.com https://*.facebook.com https://*.instagram.com https://api.instagram.com",
              "frame-src 'self' https://www.google.com https://maps.google.com https://googleads.g.doubleclick.net https://*.elfsight.com https://*.facebook.com https://*.instagram.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },

      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Legacy WordPress-era slugs → halaman baru.
      // /tentang (dan /tentang/) adalah nama halaman "About" versi lama
      // yang sempat dipakai & bisa saja masih di-link dari Google Ads,
      // media sosial, atau backlink lama.
      {
        source: '/tentang/:path*',
        destination: '/about/:path*',
        permanent: true,
      },
      {
        source: '/tentang',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.warungpapatong.com',
          },
        ],
        destination: 'https://warungpapatong.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig