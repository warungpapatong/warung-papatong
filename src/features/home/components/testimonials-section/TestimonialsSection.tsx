// src/features/home/components/TestimonialsSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ SERVER COMPONENT — tidak ada 'use client', tidak ada hooks browser
// ✅ Konten statis (heading, deskripsi) ada di HTML → Google crawl langsung
// ✅ Client logic diisolasi di:
//    - TestimonialsCarousel.tsx → seluruh carousel state & window API
//
// CATATAN SEO:
//   Teks ulasan pelanggan (isi kartu) memang dirender di client karena
//   ada di dalam carousel. Ini acceptable — konten SEO-critical sudah
//   tercukupi dari h2 dan deskripsi section di server HTML.
//   Jika ingin ulasan juga crawlable, pertimbangkan Schema.org Review
//   structured data via JSON-LD di layout atau page.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import { TESTIMONIALS_DATA } from '@/data'
import TestimonialsCarousel from './client/TestimonialsCarousel'

export default function TestimonialsSection() {
  return (
    <section
      id="ulasan"
      className="relative overflow-hidden border-t border-brand-border bg-brand-surface-2 py-20 md:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header — pure server HTML, crawlable ── */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-brand-primary-dark uppercase">
            SUARA KONSUMEN AUTENTIK
          </p>

          {/* ✅ h2 di HTML — Google crawl angka ulasan sebagai social proof signal */}
          <h2 className="mb-4 font-display text-3xl leading-[0.95] font-black tracking-tight text-brand-dark md:text-5xl">
            Ulasan Kejujuran dari 4.080+ Keluarga di Google Maps
          </h2>

          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-brand-primary" />

          <p className="text-xs leading-relaxed text-brand-muted sm:text-sm md:text-base">
            Kepuasan rasa makan keluarga adalah kehormatan bagi kami.
            Simak penuturan asli pelanggan setelah menikmati suasana
            hangat dan menu seafood favorit di Warung Papatong Cibinong.
          </p>
        </div>

        {/*
          TestimonialsCarousel = Client Component.
          TESTIMONIALS_DATA dikirim sebagai props dari server.
          Semua carousel state & window API terisolasi di sana.
        */}
        <TestimonialsCarousel testimonials={TESTIMONIALS_DATA} />

      </div>
    </section>
  )
}