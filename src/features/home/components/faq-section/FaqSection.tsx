// src/features/home/components/FaqSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ SERVER COMPONENT — tidak ada 'use client', tidak ada hooks browser
// ✅ Semua konten statis (heading, semua teks Q&A, CTA callout) ada di HTML
//    → Google bot crawl seluruh konten FAQ tanpa eksekusi JS
// ✅ Client logic diisolasi di:
//    - FaqAccordion.tsx  → useState (openId) + AnimatePresence
//    - WAButton.tsx      → onClick tracking (reuse dari Hero)
//
// CATATAN SEO:
//   Seluruh teks pertanyaan & jawaban ada di HTML server — sangat penting
//   karena Google mengindeks FAQ untuk featured snippet / rich result.
//   Animasi accordion hanya lapisan visual di atas konten yang sudah crawlable.
// ─────────────────────────────────────────────────────────────────────────────

import { MessageSquare } from 'lucide-react'

import { FAQS_DATA, BUSINESS_INFO, buildWALink } from '@/data'

import FaqAccordion from './client/FaqAccordion'
import WAButton from '../button/WAButton'

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_FAQ_MESSAGE =
  'Halo Admin Warung Papatong, saya ingin bertanya terkait rencana acara rombongan kami.'

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="py-20 md:py-24 bg-brand-bg border-t border-brand-border relative"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header — pure server HTML ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase mb-2">
            PERTANYAAN UMUM (FAQ)
          </p>
          {/* ✅ h2 di HTML — Google gunakan ini untuk featured snippet */}
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

        {/*
          FaqAccordion = Client Component untuk toggle & animasi.
          FAQS_DATA dikirim sebagai props — artinya seluruh teks Q&A
          sudah ada di HTML pada saat server render, bukan di-inject JS.
          Google dapat crawl semua pertanyaan & jawaban langsung.
        */}
        <FaqAccordion faqs={FAQS_DATA} />

        {/* ── CTA callout — pure server HTML ── */}
        <div className="mt-12">
          <div className="bg-brand-primary p-6 md:p-8 rounded-4xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-primary">
            {/* Decorative orb — pure CSS */}
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

            {/*
              WAButton = Client Component (reuse dari Hero) — hanya untuk onClick tracking.
              Jika tidak butuh tracking, bisa pakai <a> biasa di sini.
            */}
            <WAButton
              href={buildWALink(BUSINESS_INFO.wa, WA_FAQ_MESSAGE)}
              label="Chat Langsung Sekarang"
              trackingLabel="FAQ WhatsApp CTA"
              className="btn btn-dark btn-md shrink-0 relative z-10"
              icon={<MessageSquare className="w-4 h-4" />}
            />
          </div>
        </div>

      </div>
    </section>
  )
}