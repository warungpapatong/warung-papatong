// src/features/home/components/HeroImage.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ CLIENT COMPONENT — hanya untuk parallax scroll effect
// ✅ Terima data sebagai props dari Server Component (tidak ada data fetching)
// ✅ Seminimal mungkin: HANYA logika yang butuh browser API (useScroll)
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useScroll, useTransform, motion } from 'motion/react'

import type { PRODUCTS_DATA } from '@/data'

interface HeroImageProps {
  featuredMenu: (typeof PRODUCTS_DATA)[number]  // Tipe produk tunggal dari PRODUCTS_DATA
  featuredTodayLabel: string
  kitchenStatusLabel: string
  kitchenStatusDesc: string
}

export default function HeroImage({
  featuredMenu,
  featuredTodayLabel,
  kitchenStatusLabel,
  kitchenStatusDesc,
}: HeroImageProps) {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 800], [0, 40])

  return (
    <>
      {/* Hero image dengan parallax */}
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-2xl">
        <motion.img
          src={featuredMenu.image}
          alt={featuredMenu.name}
          loading="eager"
          fetchPriority="high"
          style={{ y: imageY }}
          className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
        />
      </div>
    </>
  )
}