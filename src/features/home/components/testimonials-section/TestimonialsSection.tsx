import { TESTIMONIALS_CONTENT, TESTIMONIALS_DATA } from '@/data'

import TestimonialsCarousel from './client/TestimonialsCarousel'

// ─── TestimonialsSection ──────────────────────────────────────────────────────

export default function TestimonialsSection() {
  return (
    <section
      id="ulasan"
      className="relative overflow-hidden border-t border-brand-border bg-brand-tropical py-20 md:py-24"
    >
      {/* Decorative blurs — warna lebih pekat agar subtle tapi tetap ada */}
      <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-brand-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-brand-primary-dark uppercase">
            {TESTIMONIALS_CONTENT.sectionLabel}
          </p>

          <h2 className="mb-4 font-display text-3xl leading-[0.95] font-black tracking-tight text-brand-dark md:text-5xl">
            {TESTIMONIALS_CONTENT.title}
          </h2>

          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-brand-primary" />

          <p className="text-xs leading-relaxed text-brand-muted sm:text-sm md:text-base">
            {TESTIMONIALS_CONTENT.description}
          </p>
        </div>

        {/* ── Carousel ── */}
        <TestimonialsCarousel testimonials={TESTIMONIALS_DATA} />

      </div>
    </section>
  )
}