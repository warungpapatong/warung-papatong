// src/features/menu/components/MenuSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// UI TWEAK:
//   - Category filter tab: setiap tab kini punya border + background sendiri
//     sehingga jelas terlihat sebagai button tersendiri, bukan satu strip menyatu.
//   - Active state: border-brand-primary + bg-brand-primary + text-brand-dark
//   - Inactive state: border-brand-border + bg-brand-surface + text-brand-text
//     dengan hover: border-brand-primary/40 + bg-brand-primary/8 + text-brand-dark
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShoppingCart, Plus, Minus, Search, Utensils, X, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Product } from '@/types'
import {
  PRODUCTS_DATA, BUSINESS_INFO,
  buildWALink, formatPrice, formatProductPrice,
} from '@/data'
import {
  buildMenuWAMessage,
  buildMenuWAMessageWithQty,
  buildCateringWAMessage,
} from '@/lib/whatsapp'
import { trackWhatsAppConversion } from '@/lib/tracking'
import CheckoutModal from '@/features/menu/components/CheckoutModal'

// ─── Category Filter Config ───────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',             label: 'Semua'           },
  { id: 'seafood',         label: 'Seafood'         },
  { id: 'ikan-air-tawar',  label: 'Ikan Air Tawar'  },
  { id: 'sunda',           label: 'Sunda'           },
  { id: 'ayam-dan-daging', label: 'Ayam dan Daging' },
  { id: 'sayuran',         label: 'Sayuran'         },
  { id: 'minuman',         label: 'Segar Minuman'   },
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
        {/* Background Accent */}
        <div className="absolute inset-0 bg-brand-primary/[0.03] pointer-events-none" />

        {/* Watermark dekoratif kanan bawah */}
        <span className="absolute bottom-12 right-8 text-[120px] font-black opacity-[0.03] select-none pointer-events-none font-display text-brand-dark leading-none hidden lg:block">
          MENU
        </span>

        {/* ── HERO CONTENT ─────────────────────────────────────────────── */}
        <div className="section-inner relative z-10 text-center mb-14 md:mb-20">

          <span className="badge badge-primary mb-5">
            <Utensils className="w-3.5 h-3.5" />
            Menu Kami
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
          <div className="flex flex-col gap-4 mb-12">

            {/* ── Category tabs — setiap tab punya card/border sendiri ── */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:gap-2">
              {CATEGORIES.map((tab, idx) => {
                const isActive  = activeTab === tab.id
                const isLastOdd = idx === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      // Base — setiap tab punya border & background sendiri
                      'relative px-4 py-2.5 text-xs md:text-sm font-bold',
                      'rounded-xl border transition-all duration-200 focus-brand',
                      'flex items-center justify-center min-h-[40px]',
                      'whitespace-nowrap text-center shadow-sm',
                      // Odd last item di mobile: span 2 kolom
                      isLastOdd && 'col-span-2 sm:col-span-1 md:col-span-[unset]',
                      // Active state
                      isActive
                        ? 'border-brand-primary bg-brand-primary text-brand-dark shadow-md'
                        : 'border-brand-border bg-brand-surface text-brand-text hover:border-brand-primary/40 hover:bg-brand-primary/[0.06] hover:text-brand-dark',
                    )}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* ── Search input ── */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Cari kepiting, timbel, kangkung..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input pl-10 rounded-xl w-full"
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

                const waMessage = qty > 0
                  ? buildMenuWAMessageWithQty(BUSINESS_INFO.name, product, qty)
                  : buildMenuWAMessage(BUSINESS_INFO.name, product)

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

                      <span className="absolute top-4 left-4 badge badge-dark">
                        {product.categoryLabel}
                      </span>

                      {product.badge && (
                        <span className="absolute top-4 right-4 badge badge-red flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {product.badge}
                        </span>
                      )}

                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-brand-dark/60 backdrop-blur-sm py-1 px-2.5 rounded-full text-[10px] font-bold text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                        Dapur Ready
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-display font-bold text-xl text-brand-dark transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-mono font-black text-lg text-brand-primary-dark">
                          {formatProductPrice(product)}
                        </span>
                      </div>
                      <p className="text-brand-text text-sm mt-3 leading-relaxed whitespace-pre-line break-words flex-grow">
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
                          href={buildWALink(BUSINESS_INFO.wa, waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppConversion(`Menu WA Order: ${product.name}`)}
                          className="btn btn-wa btn-sm flex-1 hover:text-white"
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
                buildCateringWAMessage(BUSINESS_INFO.name),
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