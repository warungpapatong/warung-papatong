'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import Image from 'next/image'
import type { Product } from '@/types'

interface HeroImageProps {
  featuredMenu: Product
  featuredTodayLabel: string
  kitchenStatusLabel: string
  kitchenStatusDesc: string
}

export default function HeroImage({ featuredMenu }: HeroImageProps) {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 800], [0, 40])

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-2xl">
      {/*
        PERBAIKAN (Safari fix):
        Sebelumnya `motion.create(Image)` dipakai supaya properti `style={{ y: imageY }}`
        (parallax scroll) bisa langsung nempel di Next/Image. Masalahnya: Next/Image
        di balik layar juga menulis ke `style` element yang sama untuk transisi
        loading-nya sendiri. Dua penulis style pada satu node yang sama adalah
        sumber race condition di Safari/WebKit — gambar bisa permanen tersembunyi.

        Fix: motion HANYA membungkus div wrapper (untuk efek parallax-nya),
        Next/Image di dalamnya 100% murni, tidak disentuh motion sama sekali.
      */}
      <motion.div style={{ y: imageY }}>
        <Image
          src={featuredMenu.image}
          alt={featuredMenu.name}
          width={1025}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1025px"
          priority
          className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
        />
      </motion.div>
    </div>
  )
}