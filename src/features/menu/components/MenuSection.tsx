'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingCart, Plus, Minus, Search, Utensils, X, Sparkles, BookOpen, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Product } from '@/types'
import {
  PRODUCTS_DATA,
  BUSINESS_INFO,
  buildWALink,
  formatPrice,
  formatProductPrice,
  MENU_CATEGORIES,
  MENU_PAGE_DATA,
} from '@/data'
import {
  buildMenuWAMessage,
  buildMenuWAMessageWithQty,
  buildCateringWAMessage,
} from '@/lib/whatsapp'
import { trackWhatsAppConversion } from '@/lib/tracking'
import CheckoutModal from '@/features/menu/components/CheckoutModal'

// ─── Config ──────────────────────────────────────────────────────────────────

const FULL_MENU_PDF_URL = 'https://drive.google.com/file/d/1M-z3FuQCmDNILTBXF72jJoqWWyE5_PTf/view'

// ─── FullMenuBanner ───────────────────────────────────────────────────────────

function FullMenuBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const QRCode = (await import('qrcode')).default
        if (cancelled || !canvasRef.current) return
        await QRCode.toCanvas(canvasRef.current, FULL_MENU_PDF_URL, {
          width: 148,
          margin: 2,
          color: { dark: '#1a1a1a', light: '#ffffff' },
        })
      } catch (err) {
        console.warn('QR Code generation failed:', err)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="relative mt-16 overflow-hidden rounded-4xl border-2 border-brand-border-strong bg-brand-surface p-8 md:p-12">

      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-brand-primary/10 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-16">

        {/* Left — teks + CTA */}
        <div className="max-w-lg space-y-5 text-center md:text-left">
          <span className="badge badge-primary inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Buku Menu Lengkap
          </span>

          <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-brand-dark md:text-4xl">
            Mau lihat semua menu{' '}
            <span className="text-brand-primary">secara lengkap?</span>
          </h2>

          <p className="text-sm leading-relaxed text-brand-text">
            Klik tombol di bawah untuk membuka buku menu PDF kami — semua
            pilihan, harga, dan paket tersedia lengkap di sana.
            <span className="hidden md:inline">
              {' '}Atau scan QR code di samping langsung dari kamera HP kamu.
            </span>
          </p>

          <a
            href={FULL_MENU_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <BookOpen className="h-4 w-4" />
            Buka Menu Lengkap
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>

        {/* Right — QR code card (desktop only) */}
        <div className="hidden shrink-0 flex-col items-center gap-3 md:flex">
          <div className="rounded-2xl border-2 border-brand-border bg-white p-3 shadow-card">
            <canvas
              ref={canvasRef}
              width={148}
              height={148}
              aria-label="QR Code menuju buku menu PDF lengkap"
            />
          </div>
          <p className="text-center text-xs font-semibold text-brand-muted">
            Scan untuk buka menu PDF
          </p>
        </div>

      </div>
    </div>
  )
}

// ─── MenuSection ──────────────────────────────────────────────────────────────

export default function MenuSection() {
  const [activeTab,      setActiveTab]      = useState<string>('all')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [basket,         setBasket]         = useState<Record<number, number>>({})
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

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

  const filteredProducts = PRODUCTS_DATA.filter(p => {
    const matchesCategory = activeTab === 'all' || p.category === activeTab
    const matchesSearch   = (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return matchesCategory && matchesSearch
  })

  const totalItems = Object.values(basket).reduce((a, b) => a + b, 0)

  const subtotal = Object.entries(basket).reduce((acc, [idStr, qty]) => {
    const p = PRODUCTS_DATA.find(product => product.id === parseInt(idStr))
    return acc + (p ? p.price * qty : 0)
  }, 0)

  const d = MENU_PAGE_DATA

  return (
    <>
      <section
        id="menu"
        className="relative overflow-hidden bg-brand-bg pb-16 pt-28 md:pb-24 md:pt-36"
      >
        <div className="pointer-events-none absolute inset-0 bg-brand-primary/[0.03]" />

        <span className="pointer-events-none absolute bottom-12 right-8 hidden select-none font-display text-[120px] font-black leading-none text-brand-dark opacity-[0.03] lg:block">
          {d.watermarkText}
        </span>

        {/* ── Header ── */}
        <div className="section-inner relative z-10 mb-14 text-center md:mb-20">
          <span className="badge badge-primary mb-5">
            <Utensils className="h-3.5 w-3.5" />
            {d.badge}
          </span>

          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight text-brand-dark md:text-6xl">
            {d.title}
            <span className="mt-2 block text-brand-primary">
              {d.titleAccent}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brand-text md:text-base">
            {d.description}
          </p>
        </div>

        <div className="section-inner relative z-10">

          {/* ── Filter & Search ── */}
          <div className="mb-12 flex flex-col gap-4">
            <div
              className="
                grid grid-cols-2 gap-2
                sm:grid-cols-3
                md:flex md:flex-wrap md:items-center md:justify-center md:gap-3
              "
            >
              {MENU_CATEGORIES.map((tab, idx) => {
                const isActive  = activeTab === tab.id
                const isLastOdd = idx === MENU_CATEGORIES.length - 1 && MENU_CATEGORIES.length % 2 !== 0
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'relative flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-xl border px-4 py-2.5 text-center text-xs font-bold shadow-sm transition-all duration-200 focus-brand md:text-sm',
                      isLastOdd && 'col-span-2 sm:col-span-1',
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

            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder={d.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input w-full rounded-xl pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-brand-muted transition-colors hover:text-brand-dark focus-brand"
                  aria-label={d.searchClearLabel}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* ── Product Grid ── */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-brand-border bg-brand-surface py-24 text-center">
              <p className="text-base text-brand-muted">{d.emptyStateText}</p>
            </div>
          ) : (
            <motion.div
              key={activeTab + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProducts.map(product => {
                const qty = basket[product.id] ?? 0

                const waMessage = qty > 0
                  ? buildMenuWAMessageWithQty(BUSINESS_INFO.name, product, qty)
                  : buildMenuWAMessage(BUSINESS_INFO.name, product)

                return (
                  <div key={product.id} className="card card-hover group flex flex-col">

                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />

                      <span className="absolute left-4 top-4 badge badge-dark">
                        {product.categoryLabel}
                      </span>

                      {product.badge && (
                        <span className="absolute right-4 top-4 badge badge-red flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {product.badge}
                        </span>
                      )}

                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-brand-dark/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-success" />
                        {d.kitchenReadyLabel}
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col p-6">
                      <h3 className="font-display text-xl font-bold leading-tight text-brand-dark transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-mono text-lg font-black text-brand-primary-dark">
                          {formatProductPrice(product)}
                        </span>
                      </div>
                      <p className="mt-3 flex-grow break-words text-sm leading-relaxed text-brand-text">
                        {product.description}
                      </p>

                      <div className="mt-6 flex items-center gap-3 border-t border-brand-border pt-5">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2 rounded-full bg-brand-primary px-2 py-1 text-brand-dark">
                            <button
                              onClick={() => handleRemoveFromBasket(product.id)}
                              className="rounded-full p-1.5 transition-colors hover:bg-brand-dark/15 focus-brand"
                              aria-label={d.reduceLabel}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[52px] text-center text-sm font-bold">
                              {qty} {d.porsiSuffix}
                            </span>
                            <button
                              onClick={() => handleAddToBasket(product)}
                              className="rounded-full p-1.5 transition-colors hover:bg-brand-dark/15 focus-brand"
                              aria-label={d.addLabel}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToBasket(product)}
                            className="btn btn-outline btn-sm flex-1"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            {d.addToCartLabel}
                          </button>
                        )}
                        <a
                          href={buildWALink(BUSINESS_INFO.wa, waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppConversion(`Menu WA Order: ${product.name}`)}
                          className="btn btn-wa btn-sm flex-1"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          {d.orderWaLabel}
                        </a>
                      </div>
                    </div>

                  </div>
                )
              })}
            </motion.div>
          )}

          {/* ── Full Menu PDF Banner ── */}
          <FullMenuBanner />

          {/* ── Catering Banner ── */}
          <div className="relative mt-12 overflow-hidden rounded-4xl border-2 border-brand-border-strong bg-brand-primary p-8 md:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
              <div className="max-w-xl space-y-4">
                <span className="badge badge-red">{d.cateringBadge}</span>
                <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-brand-dark md:text-4xl">
                  {d.cateringTitle}
                </h2>
                <p className="text-sm leading-relaxed text-brand-text">
                  {d.cateringDescription}
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
                className="btn btn-dark btn-lg relative z-10 shrink-0"
              >
                {d.cateringCtaLabel}
              </a>
            </div>
          </div>

        </div>

        {/* ── Floating Basket ── */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed bottom-24 left-6 right-6 z-floating max-w-sm rounded-2xl border-2 border-brand-primary/40 glass p-4 shadow-card-lg lg:left-auto lg:right-12"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="h-4 w-4 text-brand-primary-dark" />
                  <span className="text-sm font-bold text-brand-dark">
                    {totalItems} {d.basketItemsLabel}
                  </span>
                  <span className="text-xs text-brand-muted">·</span>
                  <span className="text-sm font-black text-brand-primary-dark">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="btn btn-primary btn-sm"
                >
                  {d.basketCheckoutLabel}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

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