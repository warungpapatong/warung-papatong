'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'

interface HeroImageProps {
  featuredMenu: Product
  featuredTodayLabel: string
  kitchenStatusLabel: string
  kitchenStatusDesc: string
}

export default function HeroImage({ featuredMenu }: HeroImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = Math.min(window.scrollY / 800, 1) * 40
      setOffsetY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-2xl">
      <div ref={ref} style={{ transform: `translateY(${offsetY}px)` }}>
        <Image
          src={featuredMenu.image}
          alt={featuredMenu.name}
          width={1025}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1025px"
          priority
          className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
        />
      </div>
    </div>
  )
}
