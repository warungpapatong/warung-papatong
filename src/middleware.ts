// src/middleware.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js Edge Middleware — berjalan di CDN edge sebelum request sampai ke server.
// Dipakai untuk: redirect, trailing slash, bot detection header.
//
// ⚠️ JANGAN taruh logika berat di sini (DB call, fetch external, crypto besar).
//    Middleware harus selesai dalam <50ms — ini berjalan di setiap request.
//
// ⚠️ JANGAN ubah route /menu, /venue, /tentang — aktif di Google Ads.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const url = request.url

  // ─── 1. Trailing slash normalization ──────────────────────────────────────
  // /menu/ → /menu  (301 permanent)
  // Kecuali root "/" — biarkan saja.
  // Next.js punya `trailingSlash` config, tapi ini lebih eksplisit dan
  // bisa di-customize per-path kalau nanti perlu.
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanUrl = request.nextUrl.clone()
    cleanUrl.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(cleanUrl, { status: 301 })
  }

  // ─── 2. UTM parameter preservation untuk Google Ads ──────────────────────
  // Kalau ada ?gclid (Google Click ID) tanpa utm_source, inject utm_source=google
  // supaya analytics bisa track konversi dengan benar.
  // Tidak redirect — hanya tambah header internal untuk logging downstream.
  const gclid = searchParams.get('gclid')
  if (gclid && !searchParams.get('utm_source')) {
    const response = NextResponse.next()
    response.headers.set('x-gclid', gclid)
    return response
  }

  // ─── 3. Security: block path traversal & suspicious patterns ──────────────
  // Ini bukan pengganti WAF, tapi lapisan tambahan untuk request obvious malicious.
  const suspiciousPatterns = [
    /\.\.\//,          // path traversal
    /<script/i,        // XSS attempt di URL
    /union.*select/i,  // SQL injection basic
    /etc\/passwd/,     // LFI attempt
  ]

  if (suspiciousPatterns.some(p => p.test(url))) {
    return new NextResponse(null, { status: 400 })
  }

  return NextResponse.next()
}

// ─── Matcher ─────────────────────────────────────────────────────────────────
// Jalankan middleware hanya untuk path yang relevan.
// Eksklusi: _next/static, _next/image, favicon, api routes, file statis.
//
// Penting: JANGAN run middleware untuk semua path karena bikin setiap
// request ke aset statis juga melewati middleware — ini memperlambat TTFB.

export const config = {
  matcher: [
    /*
     * Match semua path KECUALI:
     * - _next/static  (aset build Next.js)
     * - _next/image   (image optimization endpoint)
     * - favicon.ico, icon, apple-icon (file di src/app/)
     * - file ekstensi statis (gambar, font, dll)
     * - api routes (kalau ada)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf|css|js)).*)',
  ],
}