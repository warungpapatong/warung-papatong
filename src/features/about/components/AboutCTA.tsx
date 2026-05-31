// src/features/about/components/AboutCTA.tsx

'use client'

import {
  MapPin, Clock, Phone, MessageSquare,
  Instagram, Youtube, ArrowRight, Utensils,
  Star, Users, CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import { BUSINESS_INFO, buildWALink } from '@/data'
import { trackWhatsAppConversion } from '@/lib/tracking'
import { cn } from '@/lib/cn'

// ─── Constants ───────────────────────────────────────────────────────────────

const WA_MESSAGE = 'Halo Admin Papatong, saya ingin reservasi meja saung lesehan.'


const STATS = [
  { value: '2018',  label: 'Tahun Berdiri',   icon: CalendarDays },
  { value: '200+',  label: 'Kursi Kapasitas',  icon: Users        },
  { value: '4.9★',  label: 'Rating Pelanggan', icon: Star         },
] satisfies { value: string; label: string; icon: LucideIcon }[]

const MAPS_IFRAME_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8821948834465!2d106.83078381744384!3d-6.512020895289522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1a8054a7b43%3A0xf582c100380d74a7!2sRESTO%20WARUNG%20PAPATONG%20-%20Cibinong-Bogor!5e0!3m2!1sid!2sid!4v1716301234567!5m2!1sid!2sid'


// TikTok tidak tersedia di lucide-react
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ value, label, icon: Icon }: typeof STATS[number]) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-brand-border bg-brand-surface p-4 text-center shadow-card md:p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary-light">
        <Icon className="h-4 w-4 text-brand-primary-dark" />
      </div>
      <span className="font-display font-black text-2xl leading-none tracking-tight text-brand-dark md:text-3xl">
        {value}
      </span>
      <span className="text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-brand-muted md:text-xs">
        {label}
      </span>
    </div>
  )
}

function InfoCard({ icon: Icon, title, children }: {
  icon: LucideIcon
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="card group flex items-start gap-4 p-5 transition-colors duration-300 hover:border-brand-primary">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light transition-colors duration-300 group-hover:bg-brand-primary">
        <Icon className="h-5 w-5 text-brand-primary-dark transition-colors duration-300 group-hover:text-brand-dark" />
      </div>
      <div className="flex-grow">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-dark">{title}</p>
        {children}
      </div>
    </div>
  )
}

function MapEmbed() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-3xl border-2 border-brand-border shadow-card-lg md:min-h-[420px] lg:col-span-7">
      <iframe
        title="Lokasi Warung Papatong di Google Maps"
        src={MAPS_IFRAME_SRC}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '420px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full grayscale-[10%] contrast-[105%] brightness-[98%]"
      />
    </div>
  )
}

function InfoCards() {
  const waHref = buildWALink(BUSINESS_INFO.wa, WA_MESSAGE)

  return (
    <div className="flex flex-col gap-4 lg:col-span-5">
      {/* Alamat */}
      <InfoCard icon={MapPin} title="Alamat">
        <p className="text-sm leading-relaxed text-brand-text">{BUSINESS_INFO.address}</p>
        <a
          href={BUSINESS_INFO.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-primary-dark hover:underline"
        >
          Buka di Google Maps
          <ArrowRight className="h-3 w-3" />
        </a>
      </InfoCard>

      {/* Jam Operasional */}
      <InfoCard icon={Clock} title="Jam Operasional">
        <p className="text-sm font-mono text-brand-text">{BUSINESS_INFO.hours}</p>
        <div className="mt-3 flex items-center gap-1.5 border-t border-brand-border pt-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand-success" />
          <span className="text-[11px] font-bold text-brand-success">Sedang Buka Sekarang</span>
        </div>
      </InfoCard>

      {/* Kontak */}
      <InfoCard icon={Phone} title="Hubungi Kami">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppConversion('About Info — WhatsApp')}
          className="flex items-center gap-2.5 text-sm font-bold text-brand-dark transition-colors hover:text-brand-success"
        >
          <MessageSquare className="h-4 w-4 text-brand-success" />
          {BUSINESS_INFO.phone}
        </a>
        <p className="mt-1.5 text-[11px] leading-relaxed text-brand-muted">
          Respons cepat via WhatsApp - tersedia setiap hari selama jam operasional
        </p>
      </InfoCard>
    </div>
  )
}

interface SocialLink {
  href: string
  label: string
  icon: LucideIcon
  className: string
  onClick?: () => void
}

function CtaBanner() {
  const waHref = buildWALink(BUSINESS_INFO.wa, WA_MESSAGE)

  const socialLinks: SocialLink[] = [
    {
      href: waHref,
      label: 'Booking via WhatsApp',
      icon: MessageSquare,
      className: 'btn-wa',
      onClick: () => trackWhatsAppConversion('About Page CTA Banner'),
    },
    {
      href: 'https://instagram.com/restowarungpapatong',
      label: 'Follow Instagram',
      icon: Instagram,
      className: 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white border-transparent hover:opacity-90',
    },
    {
      href: 'https://youtube.com/@restowarungpapatong',
      label: 'Tonton di YouTube',
      icon: Youtube,
      className: 'bg-[#FF0000] text-white border-transparent hover:bg-[#cc0000]',
    },
  ]

  return (
    <div className="relative overflow-hidden bg-brand-dark">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-primary/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-red/10 via-transparent to-transparent" />

      {/* Top border accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-primary via-brand-red to-brand-primary" />

      <div className="section-inner relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="badge badge-primary mb-6 inline-flex"
          >
            <Utensils className="h-3.5 w-3.5" />
            Reservasi Online Cepat
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Kunci Saung Lesehan
            <span className="mt-2 block text-brand-primary">Favorit Anda Sekarang</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brand-muted md:text-base"
          >
            Amankan lokasi saung lesehan untuk rombongan dinas, arisan keluarga,
            atau rapat korporat. Potong waktu tunggu dapur dengan pre-order langsung via WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {socialLinks.map(({ href, label, icon: Icon, className, onClick }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className={cn('btn btn-lg w-full transition-all duration-300 hover:shadow-lg sm:w-auto', className)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            ))}

            <a
              href="https://tiktok.com/@restowarungpapatong"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg w-full bg-[#010101] text-white transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-lg sm:w-auto"
            >
              <TikTokIcon className="h-5 w-5" />
              Ikuti di TikTok
            </a>
          </motion.div>

          <p className="mt-8 font-mono text-[11px] tracking-wider text-brand-muted/50">
            RESTO WARUNG PAPATONG
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-surface-2">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-red/5 blur-3xl" />

      {/* Info Grid */}
      <div className="section relative z-10">
        <div className="section-inner">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <span className="badge badge-primary mb-4">
              <Utensils className="h-3.5 w-3.5" />
              Temukan Kami
            </span>
            <h2 className="font-display font-black text-3xl leading-none tracking-tight text-brand-dark md:text-4xl">
              Informasi &amp; Lokasi Warung Papatong
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              Kami siap menyambut Anda - dari reservasi dadakan hingga gathering ratusan orang.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10 grid grid-cols-3 gap-4 md:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          {/* Maps + Info cards */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <MapEmbed />
            <InfoCards />
          </div>
        </div>
      </div>

      <CtaBanner />
    </section>
  )
}