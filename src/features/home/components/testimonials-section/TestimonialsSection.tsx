import { TESTIMONIALS_DATA, TESTIMONIALS_CONTENT } from '@/data'
import TestimonialsCarousel from './client/TestimonialsCarousel'

export default function TestimonialsSection() {
  return (
    <section
      id="ulasan"
      className="relative overflow-hidden border-t border-brand-border bg-brand-surface-2 py-20 md:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

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

        <TestimonialsCarousel testimonials={TESTIMONIALS_DATA} />

      </div>
    </section>
  )
}