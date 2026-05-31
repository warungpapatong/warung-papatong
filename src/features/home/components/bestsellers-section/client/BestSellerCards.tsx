'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

import { PRODUCTS_DATA, formatPrice } from '@/data'
import type { Product } from '@/types'

const MotionImage = motion.create(Image)

function getDynamicDishes(tick: number): Product[] {
  const total = PRODUCTS_DATA.length
  if (total === 0) return []
  const baseOffset = tick % total
  const staggerOffsets = [0, 5, 11]
  const dishes: Product[] = []
  for (const stagger of staggerOffsets) {
    const dish = PRODUCTS_DATA[(baseOffset + stagger) % total]
    if (!dishes.some(d => d.id === dish.id)) dishes.push(dish)
  }
  let fallback = 0
  while (dishes.length < Math.min(3, total)) {
    const dish = PRODUCTS_DATA[(baseOffset + fallback) % total]
    if (!dishes.some(d => d.id === dish.id)) dishes.push(dish)
    fallback++
  }
  return dishes
}

interface BestSellerCardsProps {
  intervalMs: number
  ctaHref: string
  freshBadgeLabel: string
  detailCtaText: string
}

export default function BestSellerCards({ intervalMs, ctaHref, freshBadgeLabel, detailCtaText }: BestSellerCardsProps) {
  const [tick, setTick] = useState(() => new Date().getHours())

  useEffect(() => {
    const timer = setInterval(() => setTick(prev => prev + 1), intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs])

  const dishes = getDynamicDishes(tick)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {dishes.map((dish, idx) => (
          <motion.article
            key={`${dish.id}-${tick}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            layout
            className="card card-hover group flex flex-col h-[470px] sm:h-[490px] md:h-[520px] lg:h-[490px] xl:h-[470px]"
          >
            <div className="relative aspect-card w-full overflow-hidden">

              <MotionImage
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                <span className="text-[10px] font-mono text-brand-subtle">{freshBadgeLabel}</span>
                <Link
                  href={ctaHref}
                  className="text-xs font-mono font-extrabold text-brand-primary-dark hover:text-brand-primary flex items-center gap-1 transition-colors"
                >
                  {detailCtaText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  )
}