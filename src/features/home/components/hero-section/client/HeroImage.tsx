'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import Image from 'next/image'
import type { Product } from '@/types'

const MotionImage = motion.create(Image)

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
      <MotionImage
        src={featuredMenu.image}
        alt={featuredMenu.name}
        width={1025}
        height={500}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1025px"
        priority
        style={{ y: imageY }}
        className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
      />
    </div>
  )
}