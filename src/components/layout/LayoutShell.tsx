// src/components/layout/LayoutShell.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component wrapper untuk RootLayout.
//
// Kenapa dipisah dari layout.tsx?
// layout.tsx harus Server Component agar bisa export `metadata`.
// State (modal, basket) butuh useState → harus 'use client'.
//
// Data flow:
//   layout.tsx (Server)
//     └─ LayoutShell (Client)
//          ├─ Navbar          ← terima onOpenBooking
//          ├─ <main>children  ← page content
//          ├─ Footer
//          ├─ FloatingWA
//          └─ InteractiveBooking Modal ← terima basket state + handlers
//
// State yang tinggal di sini (single source of truth):
//   isBookingOpen  — buka/tutup modal InteractiveBooking
//   basket         — pre-order items { [productId]: quantity }
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { Product } from '@/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const FloatingWA = dynamic(() => import('@/components/common/FloatingWA'), {
  ssr: false,
})

// Dynamic import — CheckoutModal tidak di-bundle saat initial load.
// Komponen ini baru di-fetch saat isBookingOpen pertama kali jadi true.
// Hemat ~23 KB dari chunk yang muncul di audit PageSpeed.
const InteractiveBooking = dynamic(
  () => import('@/features/menu/components/CheckoutModal'),
  {
    // Tidak perlu loading state — modal punya animasi masuk sendiri,
    // dan koneksi modern fetch ~23 KB dalam <100ms.
    loading: () => null,
    // Modal butuh browser API (window.open, motion) → ssr: false
    ssr: false,
  },
)

interface LayoutShellProps {
  children: React.ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {

  // ── Modal State ──────────────────────────────────────────────────────────
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // ── Basket State — { productId: quantity } ───────────────────────────────
  const [basket, setBasket] = useState<Record<number, number>>({})

  // ── Basket Handlers ──────────────────────────────────────────────────────
  const handleAddToBasket = useCallback((product: Product) => {
    setBasket((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }))
  }, [])

  const handleRemoveFromBasket = useCallback((productId: number) => {
    setBasket((prev) => {
      const current = prev[productId] ?? 0
      if (current <= 1) {
        const { [productId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: current - 1 }
    })
  }, [])

  const handleClearBasket = useCallback(() => setBasket({}), [])

  // ── Modal Handlers ───────────────────────────────────────────────────────
  const handleOpenBooking  = useCallback(() => setIsBookingOpen(true),  [])
  const handleCloseBooking = useCallback(() => setIsBookingOpen(false), [])

  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      <FloatingWA />

      {/* Modal hanya di-render setelah chunk selesai di-fetch.
          isBookingOpen={false} saat initial load → dynamic() tidak fetch sama sekali
          sampai user pertama kali membuka modal. */}
      <InteractiveBooking
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        basket={basket}
        onAddToBasket={handleAddToBasket}
        onRemoveFromBasket={handleRemoveFromBasket}
        onClearBasket={handleClearBasket}
      />
    </>
  )
}