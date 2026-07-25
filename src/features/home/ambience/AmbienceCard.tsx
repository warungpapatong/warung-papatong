'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

interface AmbienceCardProps {
  url: string
  caption: string
  desc: string
  brandLabel: string
  idx: number
}

export default function AmbienceCard({ url, caption, desc, brandLabel, idx }: AmbienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className="group relative h-96 overflow-hidden rounded-4xl border border-brand-border hover:border-brand-primary/40 shadow-card hover:shadow-card-lg transition-all duration-500 flex flex-col justify-end p-6"
    >
      <Image
        src={url}
        alt={caption}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105 select-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent transition-opacity duration-300" />

      <div className="relative z-10 space-y-1.5">
        <span className="text-[9px] font-mono font-bold tracking-widest text-brand-success uppercase flex items-center gap-1">
          {brandLabel}
        </span>
        <h3 className="font-display font-black text-base text-white leading-tight">
          {caption}
        </h3>
        <p className="text-[11px] text-brand-border leading-snug translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {desc}
        </p>
      </div>
    </motion.div>
  )
}
