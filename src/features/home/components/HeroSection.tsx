// src/features/home/components/HeroSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ Semua hardcode string/text dipindahkan ke src/data.ts (HERO_DATA)
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'

import {
  ArrowRight,
  Clock,
  Instagram,
  MapPin,
  MessageSquare,
  Star,
  UtensilsCrossed,
} from 'lucide-react'

import {
  BUSINESS_INFO,
  HERO_DATA,
  PRODUCTS_DATA,
  buildWALink,
} from '@/data'

import { trackWhatsAppConversion } from '@/lib/tracking'

// ─── Animation Config ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 800], [0, 40])

  /**
   * Dynamic Featured Menu
   * Rotasi otomatis setiap 4 jam dari PRODUCTS_DATA.
   */
  const featuredMenu = useMemo(() => {
    const currentBlock = Math.floor(new Date().getHours() / 4)
    return PRODUCTS_DATA[currentBlock % PRODUCTS_DATA.length]
  }, [])

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-brand-bg pt-28 pb-20 sm:pt-32 lg:min-h-screen lg:flex lg:items-center"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-brand-primary/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8">

        {/* ── LEFT: teks & CTA ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-1 lg:col-span-6"
        >

          {/* Pill badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary-dark sm:text-xs"
          >
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            {HERO_DATA.pillBadge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl"
          >
            {HERO_DATA.headlineText}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-brand-text sm:text-lg"
          >
            {HERO_DATA.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Menu CTA */}
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-sm font-bold text-brand-dark shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-black/70 hover:shadow-xl active:scale-[0.985] sm:text-base"
            >
              <UtensilsCrossed className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
              <span>{HERO_DATA.ctaMenuText}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* WhatsApp CTA */}
            <a
              href={buildWALink(BUSINESS_INFO.wa, HERO_DATA.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppConversion('Hero WA Button')}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-200/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white/80 hover:shadow-xl hover:shadow-green-300/50 active:scale-[0.985] sm:text-base"
            >
              <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
              <span>{HERO_DATA.ctaBookingText}</span>
            </a>
          </motion.div>

          {/* Quick links */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href={BUSINESS_INFO.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-primary/30 hover:text-brand-dark"
            >
              <MapPin className="h-4 w-4" />
              {HERO_DATA.quickLinks.mapsLabel}
            </a>

            <a
              href={`https://instagram.com/${BUSINESS_INFO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-primary/30 hover:text-brand-dark"
            >
              <Instagram className="h-4 w-4" />
              @{BUSINESS_INFO.instagram}
            </a>
          </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-3 border-t border-brand-border pt-5 sm:mt-10 sm:gap-2 sm:pt-6"
        >

          {/* Rating */}
          <div className="flex flex-col justify-start pr-3">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-brand-warning text-brand-warning sm:h-4 sm:w-4" />

              <span className="text-[17px] font-black leading-none text-brand-dark sm:text-lg">
                {HERO_DATA.stats.rating}
              </span>
            </div>

            <p className="mt-1 text-[10px] leading-tight text-brand-muted sm:text-xs">
              {HERO_DATA.stats.ratingLabel}
            </p>
          </div>

          {/* Hours */}
          <div className="flex flex-col justify-start border-l border-brand-border px-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-brand-primary-dark sm:h-4 sm:w-4" />

              <span className="text-[17px] font-black leading-none text-brand-dark sm:text-lg">
                {HERO_DATA.stats.hours}
              </span>
            </div>

            <p className="mt-1 text-[10px] leading-tight text-brand-muted sm:text-xs">
              {HERO_DATA.stats.hoursLabel}
            </p>
          </div>

          {/* Location */}
          <div className="flex flex-col justify-start border-l border-brand-border pl-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-primary-dark sm:h-4 sm:w-4" />

              <span className="text-[17px] font-black leading-none text-brand-dark sm:text-lg">
                {HERO_DATA.stats.location}
              </span>
            </div>

            <p className="mt-1 text-[10px] leading-tight text-brand-muted sm:text-xs">
              {HERO_DATA.stats.locationLabel}
            </p>
          </div>

        </motion.div>

        </motion.div>

        {/* ── RIGHT: gambar & featured menu ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative order-2 lg:col-span-6"
        >

          {/* Kitchen status pill */}
          <div className="mb-4 flex justify-end">
            <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                  {HERO_DATA.kitchenStatusLabel}
                </p>

                <p className="mt-1 text-xs font-semibold text-brand-dark">
                  {HERO_DATA.kitchenStatusDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Hero image */}
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

          {/* Featured menu card */}
          <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-xl">

            <div className="p-5">

              {/* Desktop + Mobile Label */}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                {HERO_DATA.featuredTodayLabel}
              </p>

              {/* Content */}
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0 flex-1">

                  <h3 className="text-xl font-black tracking-tight text-brand-dark sm:text-2xl">
                    {featuredMenu.name}
                  </h3>

                  {featuredMenu.description && (
                    <p className="mt-3 text-sm leading-relaxed text-brand-text sm:text-[15px]">
                      {featuredMenu.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-brand-border pt-4 sm:block sm:border-0 sm:pt-0">
                  <span className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-5 py-3 text-base font-black text-brand-dark shadow-sm">
                    {featuredMenu.priceFormatted}
                  </span>
                </div>

              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}