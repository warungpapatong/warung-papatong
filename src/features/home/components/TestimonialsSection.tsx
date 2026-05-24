//src/features/home/components/TestimonialsSection.tsx

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS_DATA } from '@/data'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getItemsPerView(width: number): number {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const trackRef = useRef<HTMLDivElement | null>(null)

  // Responsive
  useEffect(() => {
    const update = () => {
      setItemsPerView(getItemsPerView(window.innerWidth))
    }

    update()

    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  /**
   * Infinite Loop Technique
   *
   * Clone first N cards to the end
   * so when slider reaches the end,
   * we instantly reset without visible jump.
   */
  const extendedTestimonials = useMemo(() => {
    return [
      ...TESTIMONIALS_DATA,
      ...TESTIMONIALS_DATA.slice(0, itemsPerView),
    ]
  }, [itemsPerView])

  const total = TESTIMONIALS_DATA.length

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 4200)

    return () => clearInterval(timer)
  }, [])

  // Infinite reset without flicker
  useEffect(() => {
    if (currentIndex === total) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false)
        setCurrentIndex(0)
      }, 700)

      return () => clearTimeout(timeout)
    }

    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true)
        })
      })
    }
  }, [currentIndex, total, transitionEnabled])

  return (
    <section
      id="ulasan"
      className="relative overflow-hidden border-t border-brand-border bg-brand-surface-2 py-20 md:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-brand-primary-dark uppercase">
            SUARA KONSUMEN AUTENTIK
          </p>

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

        {/* Carousel */}
        <div className="relative">

          {/* Viewport */}
          <div className="overflow-hidden py-3">

            {/* Track */}
            <div
              ref={trackRef}
              className={`flex gap-5 will-change-transform ${
                transitionEnabled
                  ? 'transition-transform duration-700 ease-out'
                  : ''
              }`}
              style={{
                transform: `translateX(calc(-${
                  currentIndex * (100 / itemsPerView)
                }% - ${currentIndex * (20 / itemsPerView)}px))`,
              }}
            >

              {extendedTestimonials.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="flex shrink-0"
                  style={{
                    width: `calc(${
                      100 / itemsPerView
                    }% - ${
                      (20 * (itemsPerView - 1)) / itemsPerView
                    }px)`,
                  }}
                >

                  {/* Card */}
                  <article className="card group relative flex h-[360px] w-full flex-col rounded-[2rem] border border-brand-border/80 bg-white/95 p-6 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl lg:h-[380px] xl:h-[400px]">

                    {/* Glow */}
                    <div className="pointer-events-none absolute top-0 right-0 h-28 w-28 translate-x-6 -translate-y-6 rounded-full bg-brand-primary/5 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col">

                      {/* Top */}
                      <div>

                        {/* Stars */}
                        <div className="mb-5 flex items-center justify-between">

                          <div className="flex items-center gap-1">
                            {Array.from({
                              length: review.rating,
                            }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-brand-warning text-brand-warning"
                              />
                            ))}
                          </div>

                          <Quote className="h-9 w-9 text-brand-border transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                        </div>

                        {/* Review */}
                        <p className="line-clamp-9 text-sm leading-relaxed italic text-brand-text xl:line-clamp-[10]">
                          &ldquo;{review.review}&rdquo;
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="mt-auto pt-5">

                        <div className="flex items-center gap-3 border-t border-brand-border pt-4">

                          <img
                            src={review.avatar}
                            alt={review.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-11 w-11 rounded-full border border-brand-border object-cover shadow-card"
                          />

                          <div className="min-w-0">

                            <h4 className="truncate font-display text-sm leading-none font-black text-brand-dark">
                              {review.name}
                            </h4>

                            <div className="mt-1 flex flex-wrap items-center gap-1.5">

                              <span className="truncate text-[11px] text-brand-muted">
                                {review.city}
                              </span>

                              {review.product && (
                                <>
                                  <span className="text-[9px] text-brand-border">
                                    •
                                  </span>

                                  <span className="truncate font-mono text-[10px] font-bold tracking-wider text-brand-primary-dark uppercase">
                                    {review.product}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">

          {Array.from({ length: total }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`rounded-full transition-all duration-500 ${
                currentIndex % total === idx
                  ? 'h-2.5 w-10 bg-brand-primary'
                  : 'h-2.5 w-2.5 bg-brand-border hover:bg-brand-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}