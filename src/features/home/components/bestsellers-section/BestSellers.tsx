import Link from 'next/link'
import { ArrowRight, Flame } from 'lucide-react'

import { BEST_SELLERS_CONTENT } from '@/data'

import BestSellerCards from './client/BestSellerCards'

export default function BestSellers() {
  return (
    <section
      id="best-sellers"
      className="py-24 bg-brand-surface border-t border-brand-border relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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

          <Link
            href={BEST_SELLERS_CONTENT.ctaHref}
            className="group flex items-center gap-2 text-xs font-bold text-brand-primary-dark hover:text-brand-primary transition-colors py-3.5 px-6 rounded-full border border-brand-primary/30 hover:border-brand-primary bg-brand-surface shadow-card hover:shadow-card-md shrink-0"
          >
            {BEST_SELLERS_CONTENT.ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

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