// src/features/home/components/BestSeller.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Semua hardcode string/text dipindahkan ke src/data.ts (BEST_SELLERS_CONTENT)
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Star, Flame } from 'lucide-react'

import { PRODUCTS_DATA, BEST_SELLERS_CONTENT, formatPrice } from '@/data'
import type { Product } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Pilih 3 produk dengan stagger offset berdasarkan jam aktif,
 * memastikan variasi kategori antar card.
 */
function getDynamicDishes(currentHour: number): Product[] {
  const total = PRODUCTS_DATA.length
  if (total === 0) return []

  const baseOffset     = currentHour % total
  const staggerOffsets = [0, 5, 11]
  const dishes: Product[] = []

  for (const stagger of staggerOffsets) {
    const dish = PRODUCTS_DATA[(baseOffset + stagger) % total]
    if (!dishes.some(d => d.id === dish.id)) dishes.push(dish)
  }

  // Fallback jika array sangat kecil
  let fallback = 0
  while (dishes.length < Math.min(3, total)) {
    const dish = PRODUCTS_DATA[(baseOffset + fallback) % total]
    if (!dishes.some(d => d.id === dish.id)) dishes.push(dish)
    fallback++
  }

  return dishes
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BestSellers() {
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, BEST_SELLERS_CONTENT.intervalMs)
    return () => clearInterval(timer)
  }, [])

  const dishes = getDynamicDishes(currentHour)

  return (
    <section
      id="best-sellers"
      className="py-24 bg-brand-surface border-t border-brand-border relative overflow-hidden"
    >
      {/* Ambient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">

          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-brand-primary animate-bounce" />
              {BEST_SELLERS_CONTENT.badge}
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-dark tracking-tight leading-none">
              {BEST_SELLERS_CONTENT.title}
            </h2>

            <p className="text-sm md:text-base text-brand-text leading-relaxed">
              {BEST_SELLERS_CONTENT.description}
            </p>
          </div>

          <Link
            href={BEST_SELLERS_CONTENT.ctaHref}
            className="group flex items-center gap-2 text-xs font-bold text-brand-primary-dark hover:text-brand-primary transition-colors py-3.5 px-6 rounded-full border border-brand-primary/30 hover:border-brand-primary bg-brand-surface shadow-card hover:shadow-card-md shrink-0"
          >
            {BEST_SELLERS_CONTENT.ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

        </div>

        {/* ── Card grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {dishes.map((dish, idx) => (
              <motion.article
                key={`${dish.id}-${currentHour}`}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                layout
                className="card card-hover group flex flex-col h-[470px] sm:h-[490px] md:h-[520px] lg:h-[490px] xl:h-[470px]"
              >
                {/* Image */}
                <div className="relative aspect-card w-full overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {dish.badge && (
                    <span className="absolute top-4 left-4 badge badge-primary flex items-center gap-1">
                      <Star className="w-3 h-3 fill-brand-dark" />
                      {dish.badge}
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 font-mono font-black text-xs text-brand-dark bg-brand-primary px-3 py-1.5 rounded-xl">
                    {formatPrice(dish.price)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between gap-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-brand-success uppercase font-bold">
                      {dish.categoryLabel}
                    </span>
                    <h3 className="font-display font-black text-lg md:text-xl text-brand-dark group-hover:text-brand-primary-dark transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-muted line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                    <span className="text-[10px] font-mono text-brand-subtle">
                      {BEST_SELLERS_CONTENT.freshBadgeLabel}
                    </span>
                    <Link
                      href={BEST_SELLERS_CONTENT.ctaHref}
                      className="text-xs font-mono font-extrabold text-brand-primary-dark hover:text-brand-primary flex items-center gap-1 transition-colors"
                    >
                      {BEST_SELLERS_CONTENT.detailCtaText}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}