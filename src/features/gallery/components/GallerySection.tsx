// src/features/gallery/components/GallerySection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — self-contained venue/gallery page feature.
//
// IMPROVEMENTS:
// ✅ Featured image mobile overlay fixed
// ✅ Overlay sekarang muncul saat hover/tap mobile
// ✅ Mobile caption terpisah dihapus
// ✅ Featured image lebih clean
// ✅ Desktop & mobile behavior konsisten
// ✅ Instagram feed tetap auto sync via Elfsight
// ✅ Semua hardcode string/text dipindahkan ke src/data.ts (GALLERY_PAGE_DATA)
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useState } from 'react'

import Script from 'next/script'

import { motion, AnimatePresence } from 'motion/react'

import {
  Camera,
  Maximize2,
  X,
  Instagram,
} from 'lucide-react'

import { cn } from '@/lib/cn'

import type { GalleryItem, GalleryFilterTab } from '@/types'

import {
  GALLERY_DATA,
  GALLERY_PAGE_DATA,
  BUSINESS_INFO,
} from '@/data'

// ─── Component ────────────────────────────────────────────────────────────────

export default function GallerySection() {

  const [activeTab, setActiveTab] =
    useState<GalleryFilterTab['id']>('semua')

  const [selectedImage, setSelectedImage] =
    useState<GalleryItem | null>(null)

  // ── Filter logic ──────────────────────────────────────────────────────────

  const filteredItems = GALLERY_DATA.filter(item => {
    if (activeTab === 'semua')     return true
    if (activeTab === 'tempat')   return item.category === 'tempat'
    if (activeTab === 'aktivitas') return item.category === 'aktivitas'
    return true
  })

  const featuredImage   = filteredItems[0]
  const remainingImages = filteredItems.slice(1)

  const instagramUrl = `https://instagram.com/${BUSINESS_INFO.instagram}`

  // Resolve placeholder {instagram} di instagramTitle
  const instagramTitle = GALLERY_PAGE_DATA.instagramTitle.replace(
    '{instagram}',
    BUSINESS_INFO.instagram
  )

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Elfsight Script ─────────────────────────────────────────────── */}
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />

      {/* ── HERO + GALLERY SECTION ───────────────────────────────────── */}
      <section
        className={cn(
          'relative overflow-hidden',
          'bg-brand-bg',
          'pt-28 md:pt-36',
          'pb-16 md:pb-24',
        )}
      >

        {/* Background Accent */}
        <div className="absolute inset-0 bg-brand-primary/[0.03] pointer-events-none" />

        {/* ── HERO CONTENT ───────────────────────────────────────── */}
        <div
          className={cn(
            'section-inner relative z-10',
            'text-center',
            'mb-14 md:mb-20',
          )}
        >

          <span className="badge badge-primary mb-5">
            <Camera className="w-3.5 h-3.5" />
            {GALLERY_PAGE_DATA.badge}
          </span>

          <h1
            className={cn(
              'font-display font-black',
              'text-brand-dark',
              'tracking-tight',
              'leading-[0.95]',
              'text-4xl md:text-6xl',
              'max-w-5xl mx-auto',
            )}
          >
            {GALLERY_PAGE_DATA.title}

            <span className="block text-brand-primary mt-2">
              {GALLERY_PAGE_DATA.titleAccent}
            </span>

          </h1>

          <p
            className={cn(
              'max-w-2xl mx-auto',
              'text-sm md:text-base',
              'text-brand-text',
              'leading-relaxed',
              'mt-6',
            )}
          >
            {GALLERY_PAGE_DATA.description}
          </p>

        </div>

        {/* ── GALLERY CONTENT ───────────────────────────────────── */}
        <div className="section-inner relative z-10">

          {/* ── Filter Tabs ───────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 md:mb-14">

            {GALLERY_PAGE_DATA.filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative px-6 py-2.5',
                  'text-xs md:text-sm font-bold',
                  'rounded-full',
                  'transition-all duration-300',
                  'focus-brand whitespace-nowrap',

                  activeTab === tab.id
                    ? 'text-brand-dark'
                    : 'bg-brand-surface text-brand-text border border-brand-border hover:border-brand-primary hover:text-brand-dark',
                )}
              >

                <span className="relative z-10">
                  {tab.label}
                </span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 bg-brand-primary rounded-full z-0 shadow-card"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 28,
                    }}
                  />
                )}

              </button>
            ))}

          </div>

          {/* ── Featured Image ───────────────────────────────── */}
          {featuredImage && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={cn(
                'group relative overflow-hidden rounded-4xl',
                'border border-brand-border hover:border-brand-primary',
                'shadow-card hover:shadow-card-lg',
                'transition-all duration-300',
                'aspect-[16/9] md:aspect-[16/7]',
                'mb-8 bg-brand-surface',
              )}
            >

              <img
                src={featuredImage.image}
                alt={featuredImage.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Featured Overlay */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col justify-end',
                  'p-5 md:p-8',
                  'bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent',
                  'opacity-0',
                  'group-hover:opacity-100',
                  'transition-opacity duration-300',
                )}
              >

                <span className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-mono font-black text-brand-primary tracking-widest uppercase">
                    {featuredImage.category.replace('-', ' ')}
                  </span>
                </span>

                <p className="font-display font-bold text-base md:text-lg text-white leading-snug max-w-2xl">
                  {featuredImage.alt}
                </p>

                <button
                  onClick={() => setSelectedImage(featuredImage)}
                  className="btn btn-primary btn-sm mt-5 self-start"
                  aria-label={`${GALLERY_PAGE_DATA.expandBtnText} foto ${featuredImage.alt}`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  {GALLERY_PAGE_DATA.expandBtnText}
                </button>

              </div>

            </motion.div>
          )}

          {/* ── Remaining Gallery Grid ───────────────────────── */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >

            <AnimatePresence mode="popLayout">

              {remainingImages.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    'group relative overflow-hidden rounded-4xl bg-brand-surface',
                    'border border-brand-border hover:border-brand-primary',
                    'shadow-card hover:shadow-card-lg transition-all duration-300',
                    'aspect-[4/3]',
                  )}
                >

                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">

                    <span className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-mono font-black text-brand-primary tracking-widest uppercase">
                        {item.category.replace('-', ' ')}
                      </span>
                    </span>

                    <p className="font-display font-bold text-sm md:text-base text-white leading-snug">
                      {item.alt}
                    </p>

                    <button
                      onClick={() => setSelectedImage(item)}
                      className="btn btn-primary btn-sm mt-4 self-start"
                      aria-label={`${GALLERY_PAGE_DATA.expandBtnText} foto ${item.alt}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      {GALLERY_PAGE_DATA.expandBtnText}
                    </button>

                  </div>

                </motion.div>
              ))}

            </AnimatePresence>

          </motion.div>

        </div>
      </section>

      {/* ── Instagram Feed Section ───────────────────────────── */}
      <section className="section bg-brand-surface border-t border-brand-border overflow-hidden">

        <div className="section-inner">

          <div className="text-center max-w-2xl mx-auto mb-14">

            <span className="badge badge-dark mb-4">
              <Instagram className="w-3.5 h-3.5" />
              {GALLERY_PAGE_DATA.instagramBadge}
            </span>

            <h2 className="section-title font-display mt-2">
              {instagramTitle}
            </h2>

            <p className="section-subtitle">
              {GALLERY_PAGE_DATA.instagramDesc}
            </p>

          </div>

          <div
            className={cn(
              'rounded-4xl overflow-hidden',
              'border border-brand-border',
              'bg-brand-bg',
              'shadow-card-lg',
              'p-3 md:p-5',
            )}
          >

            <div
              className={GALLERY_PAGE_DATA.elfsightAppId}
              data-elfsight-app-lazy
            />

          </div>

          <div className="text-center mt-12">

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark btn-lg"
            >
              <Instagram className="w-4 h-4" />
              {GALLERY_PAGE_DATA.instagramCtaText}
            </a>

          </div>

        </div>
      </section>

      {/* ── Lightbox Modal ─────────────────────────────────── */}
      <AnimatePresence>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-modal flex items-center justify-center p-4"
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 220,
              }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-brand-surface rounded-4xl overflow-hidden border border-brand-border shadow-card-lg md:flex"
            >

              {/* Close */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-brand-surface/80 hover:bg-brand-primary text-brand-dark p-2.5 rounded-full transition-colors z-10 focus-brand shadow-card"
                aria-label="Tutup galeri"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:max-h-[70vh] bg-brand-dark flex items-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detail */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-brand-surface border-t md:border-t-0 md:border-l border-brand-border">

                <div>

                  <span className="badge badge-primary mb-4 capitalize">
                    {selectedImage.category.replace('-', ' ')}
                  </span>

                  <h3 className="font-display font-black text-2xl text-brand-dark leading-tight tracking-tight">
                    {GALLERY_PAGE_DATA.lightboxTitle}
                  </h3>

                  <p className="text-sm text-brand-text mt-4 leading-relaxed">
                    {selectedImage.alt}
                  </p>

                </div>

                <div className="pt-6 border-t border-brand-border mt-6 flex items-center justify-between">

                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                    Est. {BUSINESS_INFO.founded} · {BUSINESS_INFO.name}
                  </span>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-xs font-bold text-brand-primary-dark hover:text-brand-dark transition-colors"
                  >
                    {GALLERY_PAGE_DATA.lightboxBackText}
                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}