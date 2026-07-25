'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { Quote, Star } from 'lucide-react'

import type { Testimonial } from '@/types'

const AVATAR_COLORS = [
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
  'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-pink-500',
  'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-lime-500',
]

function getAvatarColor(name: string): string {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase()
}

function getItemsPerView(width: number): number {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState<number | null>(null)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const total = testimonials.length

  useEffect(() => {
    const update = () => setItemsPerView(getItemsPerView(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const extendedTestimonials = useMemo(
    () => [...testimonials, ...testimonials.slice(0, itemsPerView ?? 3)],
    [testimonials, itemsPerView],
  )

  useEffect(() => {
    if (total === 0) return
    const timer = setInterval(() => setCurrentIndex(prev => prev + 1), 4200)
    return () => clearInterval(timer)
  }, [total])

  useEffect(() => {
    if (total === 0) return

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
          requestAnimationFrame(() => setTransitionEnabled(true))
        })
      })
    }
  }, [currentIndex, total, transitionEnabled])

  if (itemsPerView === null || total === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-[360px] lg:h-[380px] xl:h-[400px] rounded-[2rem] bg-brand-border/30 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden py-3">
          <div
            ref={trackRef}
            className={`flex gap-5 will-change-transform ${
              transitionEnabled ? 'transition-transform duration-700 ease-out' : ''
            }`}
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${
                currentIndex * (20 / itemsPerView)
              }px))`,
            }}
          >
            {extendedTestimonials.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="flex shrink-0"
                style={{
                  width: `calc(${100 / itemsPerView}% - ${
                    (20 * (itemsPerView - 1)) / itemsPerView
                  }px)`,
                }}
              >
                <article className="card group relative flex h-[360px] w-full flex-col rounded-[2rem] border border-brand-border/80 bg-white/95 p-6 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl lg:h-[380px] xl:h-[400px]">
                  <div className="pointer-events-none absolute top-0 right-0 h-28 w-28 translate-x-6 -translate-y-6 rounded-full bg-brand-primary/5 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-brand-warning text-brand-warning" />
                          ))}
                        </div>
                        <Quote className="h-9 w-9 text-brand-border transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                      </div>

                      <p className="line-clamp-9 text-sm leading-relaxed italic text-brand-text xl:line-clamp-[10]">
                        &ldquo;{review.review}&rdquo;
                      </p>
                    </div>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white text-sm font-black shadow-card border-2 border-white/20 ${getAvatarColor(review.name)}`}>
                          {getInitials(review.name)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-sm leading-none font-black text-brand-dark">
                            {review.name}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <span className="truncate text-[11px] text-brand-muted">
                              {review.city}
                            </span>
                            {review.product && (
                              <>
                                <span className="text-[9px] text-brand-border">•</span>
                                <span className="truncate font-mono text-[10px] font-bold tracking-wider text-brand-dark uppercase">
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

      <div className="mt-10 flex items-center justify-center gap-3">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`relative flex items-center justify-center rounded-full transition-all duration-500 min-w-[28px] min-h-[28px] ${
              currentIndex % total === idx
                ? 'w-12 h-3 bg-brand-primary'
                : 'w-3 h-3 bg-black/20 hover:bg-black/35'
            }`}
          />
        ))}
      </div>
    </>
  )
}
