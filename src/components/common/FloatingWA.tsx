// src/components/common/FloatingWA.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Tombol WhatsApp floating di sudut kanan bawah.
// Muncul setelah user scroll 300px ke bawah.
// Tooltip auto-tampil 2.5 detik setelah muncul, auto-hilang setelah 8.5 detik.
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BUSINESS_INFO, buildWALink } from '@/data'
import { trackWhatsAppConversion } from '@/lib/tracking'

const WA_MESSAGE =
  'Halo Admin Warung Papatong Cibinong, saya ingin reservasi tempat duduk & pre-order menu makanan untuk acara makan bersama rombongan keluarga kami.'

export default function FloatingWA() {
  const [isVisible,   setIsVisible]   = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Toggle visibility berdasarkan scroll position
  useEffect(() => {
    const checkScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  // Auto-show tooltip setelah tombol muncul, auto-hide setelah beberapa detik
  useEffect(() => {
    if (!isVisible) {
      setShowTooltip(false)
      return
    }
    const showTimer = setTimeout(() => setShowTooltip(true),  2500)
    const hideTimer = setTimeout(() => setShowTooltip(false), 8500)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [isVisible])

  const waURL = buildWALink(BUSINESS_INFO.wa, WA_MESSAGE)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          // z-floating = 500 dari tailwind.config.js
          className="fixed bottom-6 right-6 z-floating flex items-center gap-3 select-none"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.9 }}
                animate={{ opacity: 1, x: 0,  scale: 1   }}
                exit={{   opacity: 0, x: 15, scale: 0.9 }}
                className="bg-brand-dark border border-brand-primary/20 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-card-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-wa flex-shrink-0 animate-pulse" />
                <span>Ada Lesehan Kosong? Chat Saja!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button dengan pulse ring */}
          <div className="relative group">
            {/* Pulse ring — pakai animate-pulse-ring dari tailwind.config.js */}
            <div className="absolute inset-0 bg-wa rounded-full animate-pulse-ring -z-10" />

            <a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat dengan Admin Warung Papatong via WhatsApp"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => trackWhatsAppConversion('Floating WhatsApp Button Bottom-Right')}
              className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-wa hover:bg-wa-hover text-white rounded-full shadow-glow-wa transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              {/* WhatsApp SVG icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.38 2.038 13.9 1.012 11.275 1.01c-5.438 0-9.863 4.372-9.867 9.802-.001 1.73.473 3.42 1.37 4.937L1.644 20.73l5.003-1.576zM17.478 14.3c-.3-.149-1.77-.872-2.04-.972-.269-.099-.465-.148-.659.15-.195.297-.752.942-.918 1.14-.166.197-.331.223-.63.074-.3-.149-1.265-.465-2.41-1.487-.893-.797-1.493-1.784-1.672-2.08-.179-.297-.019-.458.13-.606.134-.133.3-.347.449-.52.149-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.659-1.583-.902-2.17-.237-.568-.478-.49-.659-.499-.17-.008-.365-.01-.56-.01-.196 0-.515.074-.784.371-.269.297-1.03 1.016-1.03 2.479s1.057 2.876 1.206 3.075c.149.198 2.086 3.195 5.054 4.482.706.306 1.258.489 1.687.625.71.226 1.355.194 1.865.118.57-.085 1.77-.723 2.019-1.42.25-.697.25-1.295.175-1.42-.075-.125-.269-.199-.57-.348z" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}