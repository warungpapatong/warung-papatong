// src/features/menu/components/MenuSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — self-contained menu page feature.
//
// IMPROVEMENTS (polish pass):
// ✅ Hero & catalog section digabung jadi satu — background konsisten (bg-brand-bg)
// ✅ Hero style mengikuti pola GallerySection (badge → h1 → subtitle → content)
// ✅ Dekorasi background accent & watermark teks konsisten dengan GallerySection
// ✅ Filter bar dirapikan — layout & spacing lebih konsisten
// ✅ Product card: info "Dapur Ready" diberi border subtle, lebih clean
// ✅ Floating basket bar: z-index & posisi dirapikan
// ✅ Semua state & logic basket tidak berubah
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react' // AnimatePresence masih dipakai untuk floating basket bar
import {
  ShoppingCart, Plus, Minus, Search, Utensils, X, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Product } from '@/types'
import { PRODUCTS_DATA, BUSINESS_INFO, buildWALink, formatPrice } from '@/data'
import { trackWhatsAppConversion } from '@/lib/tracking'
import CheckoutModal from '@/features/menu/components/CheckoutModal'

// ─── Category Filter Config ───────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',      label: 'Semua Menu'     },
  { id: 'seafood',  label: 'Seafood Olahan' },
  { id: 'sunda',    label: 'Paket Sunda'    },
  { id: 'sayur',    label: 'Veggies & Co.'  },
  { id: 'minuman',  label: 'Segar Minuman'  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export default function MenuSection() {

  const [activeTab,      setActiveTab]      = useState('all')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [basket,         setBasket]         = useState<Record<number, number>>({})
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // ── Basket handlers ───────────────────────────────────────────────────────

  const handleAddToBasket = useCallback((product: Product) => {
    setBasket(prev => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }))
  }, [])

  const handleRemoveFromBasket = useCallback((productId: number) => {
    setBasket(prev => {
      const current = prev[productId] ?? 0
      if (current <= 1) {
        const { [productId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: current - 1 }
    })
  }, [])

  const handleClearBasket = useCallback(() => setBasket({}), [])

  // ── Derived values ────────────────────────────────────────────────────────

  const filteredProducts = PRODUCTS_DATA.filter(p => {
    const matchesCategory = activeTab === 'all' || p.category === activeTab
    const matchesSearch   = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalItems = Object.values(basket).reduce((a, b) => a + b, 0)

  const subtotal = Object.entries(basket).reduce((acc, [idStr, qty]) => {
    const p = PRODUCTS_DATA.find(product => product.id === parseInt(idStr))
    return acc + (p ? p.price * qty : 0)
  }, 0)

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Unified Menu Section (Hero + Catalog) ── */}
      <section
        id="menu"
        className={cn(
          'relative overflow-hidden',
          'bg-brand-bg',
          'pt-28 md:pt-36',
          'pb-16 md:pb-24',
        )}
      >
        {/* Background Accent — mengikuti GallerySection */}
        <div className="absolute inset-0 bg-brand-primary/[0.03] pointer-events-none" />

        {/* Watermark dekoratif kanan bawah */}
        <span className="absolute bottom-12 right-8 text-[120px] font-black opacity-[0.03] select-none pointer-events-none font-display text-brand-dark leading-none hidden lg:block">
          MENU
        </span>

        {/* ── HERO CONTENT ─────────────────────────────────────────────── */}
        <div className="section-inner relative z-10 text-center mb-14 md:mb-20">

          <span className="badge badge-primary mb-5">
            <Utensils className="w-3.5 h-3.5" />
            E-Menu Digital Interaktif
          </span>

          <h1
            className={cn(
              'font-display font-black',
              'text-brand-dark',
              'tracking-tight',
              'leading-[0.95]',
              'text-4xl md:text-6xl',
              'max-w-3xl mx-auto',
              'mt-4',
            )}
          >
            Daftar Menu
            <span className="block text-brand-primary mt-2">
              Hidangan Autentik
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-base text-brand-text leading-relaxed mt-6">
            Pilih hidangan favorit, masukkan ke keranjang, dan pesan langsung via WhatsApp — mudah &amp; cepat!
          </p>

        </div>

        {/* ── CATALOG CONTENT ──────────────────────────────────────────── */}
        <div className="section-inner relative z-10">

          {/* ── Search & Category Filter Bar ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-card">

            {/* Category tabs */}
            <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:items-center md:gap-1.5">
              {CATEGORIES.map((tab, idx) => {
                const isActive  = activeTab === tab.id
                const isLastOdd = idx === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'relative px-3 py-2 text-xs md:text-sm md:px-4 font-bold',
                      'rounded-xl md:rounded-full transition-colors duration-300 focus-brand',
                      'flex items-center justify-center min-h-[36px] md:min-h-0',
                      'whitespace-nowrap text-center',
                      isLastOdd && 'col-span-2 md:col-span-1',
                      isActive
                        ? 'text-brand-dark'
                        : 'text-brand-text hover:text-brand-dark',
                    )}
                  >
                    <span className="relative z-10 leading-tight">{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeMenuTab"
                        className="absolute inset-0 bg-brand-primary rounded-xl md:rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Search input */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Cari kepiting, timbel, kangkung..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input pl-10 rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark transition-colors focus-brand rounded-full p-0.5"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* ── Product Grid ── */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-brand-surface rounded-3xl border-2 border-dashed border-brand-border">
              <p className="text-brand-muted text-base">
                Menu tidak ditemukan. Coba kata kunci lain!
              </p>
            </div>
          ) : (
            <motion.div
              key={activeTab + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredProducts.map(product => {
                  const qty = basket[product.id] ?? 0
                  return (
                    <div
                      key={product.id}
                      className="card card-hover group flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent pointer-events-none" />

                        {/* Category badge */}
                        <span className="absolute top-4 left-4 badge badge-dark">
                          {product.categoryLabel}
                        </span>

                        {/* Optional badge (e.g. "Best Seller") */}
                        {product.badge && (
                          <span className="absolute top-4 right-4 badge badge-red flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {product.badge}
                          </span>
                        )}

                        {/* Dapur ready indicator */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-brand-dark/60 backdrop-blur-sm py-1 px-2.5 rounded-full text-[10px] font-bold text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                          Dapur Ready
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-display font-bold text-xl text-brand-dark group-hover:text-brand-primary-dark transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-mono font-black text-lg text-brand-primary-dark">
                            {product.priceFormatted}
                          </span>
                          <span className="text-brand-muted text-xs">· per porsi</span>
                        </div>
                        <p className="text-brand-text text-sm mt-3 leading-relaxed line-clamp-3 flex-grow">
                          {product.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-5 border-t border-brand-border flex items-center gap-3">
                          {qty > 0 ? (
                            <div className="flex items-center bg-brand-primary text-brand-dark px-2 py-1 rounded-full gap-2">
                              <button
                                onClick={() => handleRemoveFromBasket(product.id)}
                                className="p-1.5 hover:bg-brand-dark/15 rounded-full transition-colors focus-brand"
                                aria-label="Kurangi porsi"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-sm min-w-[52px] text-center">
                                {qty} porsi
                              </span>
                              <button
                                onClick={() => handleAddToBasket(product)}
                                className="p-1.5 hover:bg-brand-dark/15 rounded-full transition-colors focus-brand"
                                aria-label="Tambah porsi"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToBasket(product)}
                              className="btn btn-outline btn-sm flex-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Keranjang
                            </button>
                          )}

                          <a
                            href={buildWALink(BUSINESS_INFO.wa, product.waMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppConversion(`Menu WA Order: ${product.name}`)}
                            className="btn btn-wa btn-sm flex-1"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Pesan WA
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </motion.div>
          )}

          {/* ── Catering Banner ── */}
          <div className="mt-20 bg-brand-primary border-2 border-brand-border-strong p-8 md:p-12 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-xl relative z-10">
              <span className="badge badge-red">Katering & Corporate Gathering</span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-brand-dark tracking-tight leading-tight">
                Mengadakan Acara Besar atau Gathering Kantor?
              </h2>
              <p className="text-sm text-brand-text leading-relaxed">
                Tim dapur Papatong siap menyusun porsi prasmanan, paket besek hantaran,
                arisan komunitas, hingga tumpeng megah untuk menyukseskan perayaan
                korporat Anda di Bogor. Hubungi Banquet Manager kami.
              </p>
            </div>
            <a
              href={buildWALink(
                BUSINESS_INFO.wa,
                'Halo Admin Papatong, saya ingin berdiskusi mengenai paket katering gathering acara besar.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppConversion('Menu Page — Catering Lead Banner')}
              className="btn btn-dark btn-lg shrink-0 relative z-10"
            >
              Diskusi Paket Acara
            </a>
          </div>

        </div>

        {/* ── Floating Basket Bar ── */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed bottom-24 left-6 right-6 lg:left-auto lg:right-12 z-[150] max-w-sm glass p-4 rounded-2xl shadow-card-lg border-2 border-brand-primary/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="w-4 h-4 text-brand-primary-dark" />
                  <span className="font-bold text-sm text-brand-dark">
                    {totalItems} item
                  </span>
                  <span className="text-brand-muted text-xs">·</span>
                  <span className="font-black text-sm text-brand-primary-dark">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="btn btn-primary btn-sm"
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* ── Checkout Modal ── */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        basket={basket}
        onAddToBasket={handleAddToBasket}
        onRemoveFromBasket={handleRemoveFromBasket}
        onClearBasket={handleClearBasket}
      />
    </>
  )
}