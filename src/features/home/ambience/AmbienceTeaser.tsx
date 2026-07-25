import Link from 'next/link'
import { ArrowRight, Camera, Compass } from 'lucide-react'

import { AMBIENCE_TEASER_CONTENT, AMBIENCE_TEASER_DATA } from '@/data'

import AmbienceCard from './AmbienceCard'

export default function AmbienceTeaser() {
  return (
    <section
      id="ambience-teaser"
      className="py-24 bg-brand-surface border-t border-brand-border relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold text-brand-dark tracking-widest uppercase bg-brand-primary/20 border border-brand-primary/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-primary" />
              {AMBIENCE_TEASER_CONTENT.badge}
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-dark tracking-tight leading-tight">
              {AMBIENCE_TEASER_CONTENT.title}
            </h2>

            <p className="text-brand-text text-sm md:text-base leading-relaxed">
              {AMBIENCE_TEASER_CONTENT.description}
            </p>

            <Link
              href={AMBIENCE_TEASER_CONTENT.ctaHref}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-sm font-bold text-brand-dark shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-brand-dark hover:shadow-xl active:scale-[0.985] sm:text-base"
            >
              <Camera className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
              <span>{AMBIENCE_TEASER_CONTENT.ctaText}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {AMBIENCE_TEASER_DATA.map((img, idx) => (
              <AmbienceCard
                key={idx}
                url={img.url}
                caption={img.caption}
                desc={img.desc}
                brandLabel={AMBIENCE_TEASER_CONTENT.brandLabel}
                idx={idx}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
