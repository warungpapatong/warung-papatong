// src/features/about/components/AboutStory.tsx

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Leaf, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'

// ─── Animation Variants ──────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const variants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroContent() {
  return (
    <div className="section-inner relative z-10 mb-14 text-center md:mb-20">
      <span className="badge badge-primary mb-5">
        <Leaf className="h-3.5 w-3.5" />
        Warisan Rasa Sunda &amp; Seafood
      </span>

      <h1
        className={cn(
          'mx-auto mt-4 max-w-3xl',
          'font-display font-black tracking-tight leading-[0.95]',
          'text-4xl md:text-6xl',
          'text-brand-dark',
        )}
      >
        Kisah di Balik
        <span className="mt-2 block text-brand-primary">Saung Papatong</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brand-text md:text-base">
        Dari kecintaan mendalam pada kuliner Parahyangan, Warung Papatong hadir
        membawa kehangatan saung lesehan terapung di jantung Cibinong sejak 2018.
      </p>
    </div>
  )
}

function StoryImage() {
  return (
    <div className="lg:col-span-5 relative">
      {/* Tilt background card */}
      <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 scale-95 rotate-3 rounded-[2rem] bg-brand-primary shadow-lg" />

      <div
        className="relative overflow-hidden rounded-[2rem] border-4 border-brand-surface shadow-card-lg"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}
      >
        <img
          src="/images/venue/03-gallery/balon-udara2.webp"
          alt="Spot foto balon udara Ikonik Warung Papatong"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  )
}

function StoryHighlightCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-primary-light p-5">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-dark">
        {title}
      </h4>
      <p className="text-xs leading-relaxed text-brand-muted">{body}</p>
    </div>
  )
}

function StoryText({ inView }: { inView: boolean }) {
  const animate = inView ? 'visible' : 'hidden'

  return (
    <div className="flex flex-col items-start lg:col-span-7">
      <motion.p
        variants={variants.slideLeft}
        initial="hidden"
        animate={animate}
        className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-primary-dark"
      >
        Sejarah &amp; Tradisi Kuliner
      </motion.p>

      <motion.h2
        variants={variants.fadeUp}
        initial="hidden"
        animate={animate}
        className="mb-6 font-display font-black text-3xl leading-none tracking-tight text-brand-dark md:text-4xl lg:text-5xl"
      >
        Warisan Rasa Saung Sunda &amp; Hasil Nelayan Nusantara
      </motion.h2>

      <motion.div
        variants={variants.fadeUp}
        initial="hidden"
        animate={animate}
        className="mb-8 max-w-2xl space-y-4 text-sm leading-relaxed text-brand-text md:text-base"
      >
        <p>
          Didirikan dengan kecintaan mendalam pada pusaka kuliner Parahyangan,{' '}
          <span className="font-bold text-brand-dark">Warung Papatong</span> mengawinkan
          kelembutan timbel tradisional dengan gairah kuliner seafood segar yang diolah
          langsung pasca-tangkapan kolam.
        </p>
        <p>
          Nama{' '}
          <span className="font-display font-semibold italic text-brand-primary-dark">
            Papatong
          </span>{' '}
          (artinya capung dalam Bahasa Sunda) dipilih sebagai cerminan harmoni dengan alam
          terbuka. Di sini, pengunjung tidak hanya bersantap — melainkan mengikat silaturahmi
          di saung terapung, ditemani gemericik air dan petikan musik akustik live.
        </p>
      </motion.div>

      <div className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <StoryHighlightCard
          title="Tradisi Pilihan"
          body="Kami hanya memanen ikan segar langsung dari kolam saung sesaat sebelum dinikmati pelanggan."
        />
        <StoryHighlightCard
          title="Bumbu Ulekan Asli"
          body="Rempah ditumbuk tradisional tanpa pengawet sintetik — jaminan kesegaran rasa setiap sajian."
        />
      </div>

      <motion.blockquote
        variants={variants.fadeUp}
        initial="hidden"
        animate={animate}
        className="max-w-xl rounded-r-2xl border-l-4 border-brand-red bg-brand-red/5 py-1 pl-5 pr-6 font-display text-base italic text-brand-dark md:text-lg"
      >
        &ldquo;Kebahagiaan paling murni adalah ketika melihat keluarga besar duduk mengitari
        saung lesehan, tertawa lepas sembari berebut kepiting saus Padang di bawah angin
        sewayup Papatong.&rdquo;
        <span className="mt-3 block font-sans text-xs font-bold not-italic uppercase tracking-wider text-brand-red">
          ~ Keluarga Besar Pengelola Warung Papatong
        </span>
      </motion.blockquote>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AboutStory() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-brand-surface pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 bg-brand-primary/[0.03]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/5 blur-3xl" />

      {/* Watermark */}
      <span className="pointer-events-none absolute right-8 bottom-12 hidden select-none font-display text-[120px] font-black leading-none text-brand-dark opacity-[0.03] lg:block">
        TENTANG
      </span>

      <HeroContent />

      <div className="section-inner relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <StoryImage />
          <StoryText inView={inView} />
        </div>
      </div>
    </section>
  )
}