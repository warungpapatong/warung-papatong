// src/features/menu/components/CheckoutModal.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Modal checkout keranjang belanja — tampilkan item, hitung total,
// kirim order langsung ke WhatsApp admin.
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { motion } from 'motion/react'
import { ShoppingCart, Trash2, MessageSquare, X } from 'lucide-react'
import type { Product, PreOrderBasketItem } from '@/types'
import { PRODUCTS_DATA, formatPrice, BUSINESS_INFO, buildWALink } from '@/data'
import { trackWhatsAppConversion } from '@/lib/tracking'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckoutModalProps {
  isOpen:             boolean
  onClose:            () => void
  basket:             Record<number, number>
  onAddToBasket:      (product: Product) => void
  onRemoveFromBasket: (productId: number) => void
  onClearBasket:      () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutModal({
  isOpen,
  onClose,
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  onClearBasket,
}: CheckoutModalProps) {

  if (!isOpen) return null

  // ── Derived state ──────────────────────────────────────────────────────────
  const basketItems: PreOrderBasketItem[] = Object.entries(basket)
    .map(([idStr, qty]) => {
      const p = PRODUCTS_DATA.find(product => product.id === parseInt(idStr))
      return p ? { product: p, quantity: qty } : null
    })
    .filter((item): item is PreOrderBasketItem => item !== null)

  const subtotal = basketItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity, 0,
  )

  const totalQty = basketItems.reduce((a, b) => a + b.quantity, 0)

  // ── Build WA message ───────────────────────────────────────────────────────
  const buildOrderMessage = () => {
    let msg = `*ORDER WARUNG PAPATONG*\n`
    msg += `──────────────────\n`
    basketItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.name} × ${item.quantity} porsi → ${formatPrice(item.product.price * item.quantity)}\n`
    })
    msg += `──────────────────\n`
    msg += `*Total: ${formatPrice(subtotal)}*\n`
    msg += `_(${totalQty} porsi)_`
    return msg
  }

  const handleCheckout = () => {
    trackWhatsAppConversion('Checkout — Order via WA')
    window.open(buildWALink(BUSINESS_INFO.wa, buildOrderMessage()), '_blank')
    onClearBasket()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-modal overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="flex items-end sm:items-center justify-center min-h-screen sm:p-4">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-brand-surface w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl border border-brand-border shadow-card-lg overflow-hidden"
        >

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-5 h-5 text-brand-primary-dark" />
              <h2 id="checkout-title" className="font-display font-black text-lg text-brand-dark">
                Keranjang Belanja
              </h2>
              <span className="badge badge-primary text-xs">{totalQty} item</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-brand-muted hover:text-brand-dark hover:bg-brand-border transition-colors focus-brand"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Item list */}
          <div className="px-6 py-4 space-y-3 max-h-[50vh] overflow-y-auto">
            {basketItems.length === 0 ? (
              <p className="text-center text-brand-muted text-sm py-10">
                Keranjang masih kosong.
              </p>
            ) : (
              basketItems.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 bg-brand-surface-2 border border-brand-border rounded-2xl p-3"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-sm text-brand-dark line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-brand-muted mt-0.5">
                      {formatPrice(item.product.price)} / porsi
                    </p>
                  </div>

                  {/* Counter */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onRemoveFromBasket(item.product.id)}
                      className="w-7 h-7 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-dark hover:bg-brand-border transition-colors"
                      aria-label="Kurangi"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-brand-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onAddToBasket(item.product)}
                      className="w-7 h-7 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-dark hover:bg-brand-border transition-colors"
                      aria-label="Tambah"
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <span className="text-xs font-black text-brand-primary-dark shrink-0 w-20 text-right">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {basketItems.length > 0 && (
            <div className="px-6 pb-6 pt-4 border-t border-brand-border space-y-4">

              {/* Total row */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-brand-dark">Total</span>
                <span className="font-display font-black text-xl text-brand-primary-dark">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Actions */}
              <button
                onClick={handleCheckout}
                className="btn btn-wa btn-lg w-full"
              >
                <MessageSquare className="w-5 h-5" />
                Pesan via WhatsApp
              </button>

              <button
                onClick={onClearBasket}
                className="btn btn-outline btn-sm w-full flex items-center justify-center gap-1.5 text-brand-red border-brand-red/30 hover:bg-brand-red-light"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Kosongkan Keranjang
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}