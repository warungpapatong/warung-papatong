'use client'

import { motion } from 'motion/react'
import { ShoppingCart, Trash2, MessageSquare, X } from 'lucide-react'
import type { Product, PreOrderBasketItem } from '@/types'
import {
  PRODUCTS_DATA,
  formatPrice,
  formatProductPrice,
  BUSINESS_INFO,
  buildWALink,
  CHECKOUT_MODAL_DATA,
} from '@/data'
import { buildCartWAMessage } from '@/lib/whatsapp'
import { trackWhatsAppConversion } from '@/lib/tracking'

interface CheckoutModalProps {
  isOpen:             boolean
  onClose:            () => void
  basket:             Record<number, number>
  onAddToBasket:      (product: Product) => void
  onRemoveFromBasket: (productId: number) => void
  onClearBasket:      () => void
}

export default function CheckoutModal({
  isOpen,
  onClose,
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  onClearBasket,
}: CheckoutModalProps) {
  if (!isOpen) return null

  const basketItems: PreOrderBasketItem[] = Object.entries(basket)
    .map(([idStr, qty]) => {
      const p = PRODUCTS_DATA.find(product => product.id === parseInt(idStr))
      return p ? { product: p, quantity: qty } : null
    })
    .filter((item): item is PreOrderBasketItem => item !== null)

  const subtotal = basketItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  )

  const totalQty = basketItems.reduce((a, b) => a + b.quantity, 0)

  const handleCheckout = () => {
    const message = buildCartWAMessage(
      BUSINESS_INFO.name,
      basketItems.map(item => ({ product: item.product, qty: item.quantity })),
      subtotal,
    )
    trackWhatsAppConversion('Checkout — Order via WA')
    window.open(buildWALink(BUSINESS_INFO.wa, message), '_blank')
    onClearBasket()
    onClose()
  }

  const { title, itemSuffix, closeLabel, emptyText, reduceLabel, addLabel, totalLabel, orderWaLabel, clearLabel, dialogTitleId } = CHECKOUT_MODAL_DATA

  return (
    <div
      className="fixed inset-0 z-modal overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
    >
      <div className="flex min-h-screen items-end justify-center sm:items-center sm:p-4">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full overflow-hidden rounded-t-3xl border border-brand-border bg-brand-surface shadow-card-lg sm:max-w-md sm:rounded-3xl"
        >

          <div className="flex items-center justify-between border-b border-brand-border px-6 py-5">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="h-5 w-5 text-brand-primary-dark" />
              <h2
                id={dialogTitleId}
                className="font-display text-lg font-black text-brand-dark"
              >
                {title}
              </h2>
              <span className="badge badge-primary text-xs">
                {totalQty} {itemSuffix}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-brand-muted transition-colors hover:bg-brand-border hover:text-brand-dark focus-brand"
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[50vh] space-y-3 overflow-y-auto px-6 py-4">
            {basketItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-brand-muted">
                {emptyText}
              </p>
            ) : (
              basketItems.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 rounded-2xl border border-brand-border bg-brand-surface-2 p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-grow">
                    <p className="line-clamp-1 text-sm font-bold text-brand-dark">
                      {item.product.name}
                    </p>
                    <p className="mt-0.5 text-xs text-brand-muted">
                      {formatProductPrice(item.product)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={() => onRemoveFromBasket(item.product.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-dark transition-colors hover:bg-brand-border"
                      aria-label={reduceLabel}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-brand-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onAddToBasket(item.product)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-dark transition-colors hover:bg-brand-border"
                      aria-label={addLabel}
                    >
                      +
                    </button>
                  </div>

                  <span className="w-20 shrink-0 text-right text-xs font-black text-brand-primary-dark">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))
            )}
          </div>

          {basketItems.length > 0 && (
            <div className="space-y-4 border-t border-brand-border px-6 pb-6 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brand-dark">{totalLabel}</span>
                <span className="font-display text-xl font-black text-brand-primary-dark">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-wa btn-lg w-full"
              >
                <MessageSquare className="h-5 w-5" />
                {orderWaLabel}
              </button>

              <button
                onClick={onClearBasket}
                className="btn btn-outline btn-sm w-full border-brand-red/30 text-brand-red hover:bg-brand-red-light"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {clearLabel}
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  )
}