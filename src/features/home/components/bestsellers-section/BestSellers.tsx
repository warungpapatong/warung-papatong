import Link from 'next/link'
import { ArrowRight, BookOpen, ExternalLink, Flame } from 'lucide-react'

import { BEST_SELLERS_CONTENT } from '@/data'

import BestSellerCards from './client/BestSellerCards'

// ─── Config ──────────────────────────────────────────────────────────────────

const FULL_MENU_PDF_URL = 'https://drive.google.com/file/d/1nUGidEczIAhZNUIEswCxknBtElb7yRcP/view'

// ─── BestSellers ─────────────────────────────────────────────────────────────

export default function BestSellers() {
  return (
    <section
      id="best-sellers"
      className="py-24 bg-brand-cream border-t border-brand-border relative overflow-hidden"
    >
      {/* Decorative blur */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header Row ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-brand-primary animate-bounce" />
              {BEST_SELLERS_CONTENT.badge}
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-dark tracking-tight leading-none">
              {BEST_SELLERS_CONTENT.title}
            </h2>

            <p className="text-sm md:text-base text-brand-text leading-relaxed">
              {BEST_SELLERS_CONTENT.description}
            </p>
          </div>

          {/* ── CTAs ── */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center shrink-0">
            <a
              href={FULL_MENU_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-sm font-bold text-brand-dark shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.985] sm:text-base"
            >
              <BookOpen className="h-5 w-5" />
              <span>Lihat Menu PDF Lengkap</span>
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>

            <Link
              href={BEST_SELLERS_CONTENT.ctaHref}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-primary/30 bg-brand-surface px-6 py-4 text-sm font-bold text-brand-primary-dark shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary hover:shadow-card-md active:scale-[0.985] sm:text-base"
            >
              <span>{BEST_SELLERS_CONTENT.ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Cards ── */}
        <BestSellerCards
          intervalMs={BEST_SELLERS_CONTENT.intervalMs}
          ctaHref={BEST_SELLERS_CONTENT.ctaHref}
          freshBadgeLabel={BEST_SELLERS_CONTENT.freshBadgeLabel}
          detailCtaText={BEST_SELLERS_CONTENT.detailCtaText}
        />

      </div>
    </section>
  )
}