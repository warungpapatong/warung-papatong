// src/features/home/components/AmbienceTeaser.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Semua hardcode string/text dipindahkan ke src/data.ts
//    (AMBIENCE_TEASER_DATA, AMBIENCE_TEASER_CONTENT)
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Compass, Camera } from 'lucide-react'

import {
  AMBIENCE_TEASER_DATA,
  AMBIENCE_TEASER_CONTENT,
} from '@/data'

// ─── Component ────────────────────────────────────────────────────────────────

export default function AmbienceTeaser() {
  return (
    <section
      id="ambience-teaser"
      className="py-24 bg-brand-bg border-t border-brand-border relative overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Left: text ────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            <span className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-primary" />
              {AMBIENCE_TEASER_CONTENT.badge}
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-dark tracking-tight leading-tight">
              {AMBIENCE_TEASER_CONTENT.title}
            </h2>

            <p className="text-brand-text text-sm md:text-base leading-relaxed">
              {AMBIENCE_TEASER_CONTENT.description}
            </p>

            <Link
              href={AMBIENCE_TEASER_CONTENT.ctaHref}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-sm font-bold text-brand-dark shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-black/70 hover:shadow-xl active:scale-[0.985] sm:text-base"
            >
              <Camera className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
              <span>{AMBIENCE_TEASER_CONTENT.ctaText}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* ── Right: image cards ────────────────────────────────────── */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">

            {AMBIENCE_TEASER_DATA.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative h-96 overflow-hidden rounded-4xl border border-brand-border hover:border-brand-primary/40 shadow-card hover:shadow-card-lg transition-all duration-500 flex flex-col justify-end p-6"
              >
                {/* Background image */}
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                />

                {/* Gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent transition-opacity duration-300" />

                {/* Caption */}
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-brand-success uppercase flex items-center gap-1">
                    {AMBIENCE_TEASER_CONTENT.brandLabel}
                  </span>
                  <h3 className="font-display font-black text-base text-white leading-tight">
                    {img.caption}
                  </h3>
                  <p className="text-[11px] text-brand-border leading-snug translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {img.desc}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </div>
    </section>
  )
}