'use client'

import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { motion, AnimatePresence } from 'motion/react'
import { Camera, Instagram, Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { GalleryItem } from '@/types'
import { BUSINESS_INFO, GALLERY_DATA, GALLERY_PAGE_DATA } from '@/data'
import { trackSocialClick } from '@/lib/config'

// ─── Types ────────────────────────────────────────────────────────────────────

type ActiveTab = typeof GALLERY_PAGE_DATA.filterTabs[number]['id']

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCategory = (category: string) => category.replace('-', ' ')

// ─── GallerySection ───────────────────────────────────────────────────────────

export default function GallerySection() {
  const [activeTab,     setActiveTab]     = useState<ActiveTab>('semua')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems   = GALLERY_DATA.filter(
    item => activeTab === 'semua' || item.category === activeTab,
  )
  const featuredImage   = filteredItems[0]
  const remainingImages = filteredItems.slice(1)

  const instagramUrl   = `https://instagram.com/${BUSINESS_INFO.instagram}`
  const instagramTitle = GALLERY_PAGE_DATA.instagramTitle.replace('{instagram}', BUSINESS_INFO.instagram)

  const d = GALLERY_PAGE_DATA

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />

      {/* ── Section 1: Gallery Grid ── */}
      <section className="relative overflow-hidden bg-brand-tropical pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-brand-primary/[0.03]" />

        {/* ── Page Header ── */}
        <div className="section-inner relative z-10 mb-14 text-center md:mb-20">
          <span className="badge badge-primary mb-5">
            <Camera className="h-3.5 w-3.5" />
            {d.badge}
          </span>

          <h1 className="mx-auto max-w-5xl font-display text-4xl font-black leading-[0.95] tracking-tight text-brand-dark md:text-6xl">
            {d.title}
            <span className="mt-2 block text-brand-primary">
              {d.titleAccent}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brand-text md:text-base">
            {d.description}
          </p>
        </div>

        <div className="section-inner relative z-10">

          {/* ── Filter Tabs ── */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3 md:mb-14">
            {d.filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 focus-brand md:text-sm',
                  activeTab === tab.id
                    ? 'text-brand-dark'
                    : 'border border-brand-border bg-brand-surface text-brand-text hover:border-brand-primary hover:text-brand-dark',
                )}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 z-0 rounded-full bg-brand-primary shadow-card"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/*
            PERBAIKAN (Safari fix):
            Sebelumnya featuredImage & grid pakai `initial={{opacity:0}}` +
            `animate={{opacity:1}}` langsung (bukan whileInView) — ini lebih
            aman karena tidak bergantung IntersectionObserver. Risiko di sini
            justru beda: `layout` prop dari motion (untuk shared layout
            animation antar tab) memicu FLIP animation yang menghitung ulang
            posisi elemen lewat getBoundingClientRect(). Di Safari, kalau
            recalculation ini terjadi SEBELUM image selesai decode (gambar
            belum punya intrinsic size), hasil pengukuran bisa 0x0 dan
            elemen "terkunci" di collapsed state.

            Fix: tambahkan `min-height` via aspect ratio class yang SUDAH
            terpasang sebelumnya (aspect-[16/9], aspect-[4/3]) sehingga
            container punya dimensi pasti dari CSS, tidak bergantung pada
            gambar selesai load dulu. Class ini sudah ada di kode asli,
            jadi tidak perlu diubah — yang diubah adalah memastikan tidak
            ada div yang dirender tanpa exit-safe layout, lihat AnimatePresence
            di bawah.
          */}

          {/* ── Featured Image ── */}
          {featuredImage && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="group relative mb-8 aspect-[16/9] overflow-hidden rounded-4xl border border-brand-border bg-brand-surface shadow-card transition-all duration-300 hover:border-brand-primary hover:shadow-card-lg md:aspect-[16/7]"
            >
              <Image
                src={featuredImage.image}
                alt={featuredImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-8">
                <span className="mb-2 font-mono text-[10px] font-black uppercase tracking-widest text-brand-primary">
                  {formatCategory(featuredImage.category)}
                </span>
                <p className="max-w-2xl font-display text-base font-bold leading-snug text-white md:text-lg">
                  {featuredImage.alt}
                </p>
                <button
                  onClick={() => setSelectedImage(featuredImage)}
                  className="btn btn-primary btn-sm mt-5 self-start"
                  aria-label={`${d.expandBtnText} foto ${featuredImage.alt}`}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  {d.expandBtnText}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Grid ── */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
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
                  className="group relative aspect-[4/3] overflow-hidden rounded-4xl border border-brand-border bg-brand-surface shadow-card transition-all duration-300 hover:border-brand-primary hover:shadow-card-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="mb-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-brand-primary">
                      {formatCategory(item.category)}
                    </span>
                    <p className="font-display text-sm font-bold leading-snug text-white md:text-base">
                      {item.alt}
                    </p>
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="btn btn-primary btn-sm mt-4 self-start"
                      aria-label={`${d.expandBtnText} foto ${item.alt}`}
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      {d.expandBtnText}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ── Section 2: Instagram Feed ── */}
      <section className="section overflow-hidden border-t border-brand-border bg-brand-cream">
        <div className="section-inner">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="badge badge-dark mb-4">
              <Instagram className="h-3.5 w-3.5" />
              {d.instagramBadge}
            </span>
            <h2 className="section-title mt-2 font-display">
              {instagramTitle}
            </h2>
            <p className="section-subtitle">{d.instagramDesc}</p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-brand-border bg-brand-surface p-3 shadow-card-lg md:p-5">
            <div className={d.elfsightAppId} data-elfsight-app-lazy />
          </div>

          <div className="mt-12 text-center">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('Instagram', 'Gallery Instagram Feed CTA')}
              className="btn btn-dark btn-lg"
            >
              <Instagram className="h-4 w-4" />
              {d.instagramCtaText}
            </a>
          </div>

        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-modal flex items-center justify-center bg-brand-dark/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-4xl border border-brand-border bg-brand-surface shadow-card-lg md:flex"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-brand-surface/80 p-2.5 text-brand-dark shadow-card transition-colors hover:bg-brand-primary focus-brand"
                aria-label={d.lightboxCloseLabel}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex aspect-[4/3] w-full items-center bg-brand-dark md:aspect-auto md:max-h-[70vh] md:w-3/5">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              <div className="flex w-full flex-col justify-between border-t border-brand-border bg-brand-surface p-8 md:w-2/5 md:border-l md:border-t-0">
                <div>
                  <span className="badge badge-primary mb-4 capitalize">
                    {formatCategory(selectedImage.category)}
                  </span>
                  <h3 className="font-display text-2xl font-black leading-tight tracking-tight text-brand-dark">
                    {d.lightboxTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-brand-text">
                    {selectedImage.alt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand-muted">
                    {d.estLabel} {BUSINESS_INFO.founded} · {BUSINESS_INFO.name}
                  </span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-xs font-bold text-brand-primary-dark transition-colors hover:text-brand-dark"
                  >
                    {d.lightboxBackText}
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