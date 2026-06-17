import { MessageSquare } from 'lucide-react'

import { BUSINESS_INFO, FAQS_DATA, FAQ_SECTION_DATA, buildWALink } from '@/data'

import FaqAccordion from './client/FaqAccordion'
import WAButton from '../button/WAButton'

// ─── FaqSection ──────────────────────────────────────────────────────────────

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="py-20 md:py-24 bg-brand-bg border-t border-brand-border relative"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase mb-2">
            {FAQ_SECTION_DATA.sectionLabel}
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none mb-4">
            {FAQ_SECTION_DATA.title}
          </h2>
          <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full mb-6" />
          <p className="text-brand-muted text-xs sm:text-sm md:text-base leading-relaxed">
            {FAQ_SECTION_DATA.description}
          </p>
        </div>

        {/* ── Accordion ── */}
        <FaqAccordion faqs={FAQS_DATA} />

        {/* ── WA Callout Banner ── */}
        <div className="mt-12">
          <div className="bg-brand-primary p-6 md:p-8 rounded-4xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-primary">
            <div className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 bg-brand-primary-dark/20 rounded-full blur-2xl" />

            <div className="text-center md:text-left space-y-2 relative z-10">
              <h3 className="font-display font-black text-base md:text-lg text-brand-dark">
                {FAQ_SECTION_DATA.calloutTitle}
              </h3>
              <p className="text-xs text-brand-dark leading-relaxed max-w-md">
                {FAQ_SECTION_DATA.calloutDesc}
              </p>
            </div>

            <WAButton
              href={buildWALink(BUSINESS_INFO.wa, FAQ_SECTION_DATA.waMessage)}
              label={FAQ_SECTION_DATA.calloutCtaText}
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