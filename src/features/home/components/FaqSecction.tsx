//src/features/home/components/FaqSecction.tsx

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, MessageSquare } from 'lucide-react'
import { FAQS_DATA, BUSINESS_INFO, buildWALink } from '@/data'
import { trackWhatsAppConversion } from '@/lib/tracking'

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_FAQ_MESSAGE =
  'Halo Admin Warung Papatong, saya ingin bertanya terkait rencana acara rombongan kami.'

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqSecction() {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id))

  return (
    <section
      id="faq"
      className="py-20 md:py-24 bg-brand-bg border-t border-brand-border relative"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase mb-2">
            PERTANYAAN UMUM (FAQ)
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none mb-4">
            Ragu Terkait Rencana Acara Rombongan Anda?
          </h2>
          <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full mb-6" />
          <p className="text-brand-muted text-xs sm:text-sm md:text-base leading-relaxed">
            Berikut rangkuman hal-hal krusial yang paling sering ditanyakan oleh koordinator reuni,
            sekretaris dinas, dan pengelola arisan keluarga besar sebelum melakukan pemesanan tempat
            di Warung Papatong Cibinong.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS_DATA.map(item => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className={`border rounded-[1.75rem] overflow-hidden bg-brand-surface transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-primary shadow-card-md'
                    : 'border-brand-border hover:border-brand-primary/40'
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus-brand"
                >
                  <span className="font-display font-black text-xs sm:text-sm md:text-base text-brand-dark pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`p-1.5 rounded-full shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-brand-primary text-brand-dark'
                        : 'bg-brand-surface-2 text-brand-primary'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-6 pt-4 border-t border-brand-border border-l-4 border-l-brand-primary text-brand-text text-xs sm:text-sm leading-relaxed bg-brand-surface-2 pr-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA callout */}
        <div className="mt-12">
          <div className="bg-brand-primary p-6 md:p-8 rounded-4xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-primary">
            {/* Decorative orb */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-primary-dark/20 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center md:text-left space-y-2 relative z-10">
              <h3 className="font-display font-black text-base md:text-lg text-brand-dark">
                Jawaban Belum Menjawab?
              </h3>
              <p className="text-xs text-brand-dark leading-relaxed max-w-md">
                Punya request istimewa, jumlah rombongan sangat besar, atau butuh bantuan dekorasi
                khusus? Hubungi admin resmi kami via WhatsApp.
              </p>
            </div>

            <a
              href={buildWALink(BUSINESS_INFO.wa, WA_FAQ_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppConversion('FAQ WhatsApp CTA')}
              className="btn btn-dark btn-md shrink-0 relative z-10"
            >
              <MessageSquare className="w-4 h-4" />
              Chat Langsung Sekarang
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}