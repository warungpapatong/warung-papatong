// src/components/layout/Footer.tsx

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, ArrowUpRight, Instagram } from 'lucide-react'
import { NAV_ITEMS } from '@/config/navigation'
import { BUSINESS_INFO, buildWALink } from '@/data'

const WA_FOOTER_MSG = 'Halo Admin Papatong, saya ingin bertanya mengenai reservasi.'

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-5">
      {children}
    </p>
  )
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href:     string
  label:    string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 bg-white/5 hover:bg-brand-primary border border-white/10 hover:border-brand-primary rounded-xl flex items-center justify-center text-white/60 hover:text-brand-dark transition-all duration-300"
    >
      {children}
    </a>
  )
}

function ContactRow({
  icon,
  href,
  children,
}: {
  icon:     React.ReactNode
  href?:    string
  children: React.ReactNode
}) {
  const inner = (
    <div className="group flex gap-3 items-start">
      <div className="w-7 h-7 bg-white/5 group-hover:bg-brand-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors">
        {icon}
      </div>
      <span className="text-xs text-white/55 group-hover:text-white/80 leading-relaxed transition-colors">
        {children}
      </span>
    </div>
  )

  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  )
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.23 8.23 0 004.84 1.56V7a4.85 4.85 0 01-1.07-.31z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative bg-brand-dark text-white overflow-hidden">

      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent" />

      {/* Ghost decorative text */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[180px] font-black text-white/[0.025] select-none pointer-events-none font-display leading-none whitespace-nowrap hidden lg:block">
        PAPATONG
      </span>

      <div className="section-inner pt-16 pb-10 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Brand column ── */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-6">

            {/* Logo + Brand Name */}
            <Link href="/" className="flex items-center gap-3" aria-label="Beranda Warung Papatong">
              <Image
                src="/images/logo/papatong-logo.webp"
                alt="Logo Warung Papatong"
                width={160}
                height={48}
                className="rounded-full h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display font-black text-lg text-white tracking-tight">
                  Warung
                </span>
                <span className="font-display font-black text-lg text-brand-primary tracking-tight -mt-1">
                  Papatong
                </span>
                <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase mt-0.5">
                  Est. {BUSINESS_INFO.founded}
                </span>
              </div>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              Surganya masakan Sunda autentik dan hidangan seafood segar di Cibinong.
              Tempat silaturahmi favorit keluarga Jabodetabek.
            </p>

            {/* Social buttons */}
            <div className="flex items-center gap-2.5">
              <SocialBtn
                href={`https://instagram.com/${BUSINESS_INFO.instagram}`}
                label="Instagram Warung Papatong"
              >
                <Instagram className="w-4 h-4" />
              </SocialBtn>

              {BUSINESS_INFO.tiktok && (
                <SocialBtn
                  href={`https://tiktok.com/@${BUSINESS_INFO.tiktok}`}
                  label="TikTok Warung Papatong"
                >
                  <TikTokIcon />
                </SocialBtn>
              )}

              <SocialBtn
                href={buildWALink(BUSINESS_INFO.wa, WA_FOOTER_MSG)}
                label="WhatsApp Warung Papatong"
              >
                <WhatsAppIcon />
              </SocialBtn>
            </div>
          </div>

          {/* ── Nav column ── */}
          <div className="lg:col-span-3">
            <ColLabel>Navigasi</ColLabel>
            <ul className="space-y-3">
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 text-sm text-white/55 hover:text-brand-primary transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div className="sm:col-span-2 lg:col-span-4">
            <ColLabel>Hubungi Kami</ColLabel>
            <ul className="space-y-4">
              <ContactRow
                icon={<MapPin className="w-3.5 h-3.5 text-brand-primary" />}
                href={BUSINESS_INFO.mapsLink}
              >
                {BUSINESS_INFO.address}
              </ContactRow>

              <ContactRow
                icon={<Phone className="w-3.5 h-3.5 text-brand-primary" />}
                href={`tel:${BUSINESS_INFO.phone}`}
              >
                {BUSINESS_INFO.phone}
              </ContactRow>

              {BUSINESS_INFO.email && (
                <ContactRow
                  icon={<Mail className="w-3.5 h-3.5 text-brand-primary" />}
                  href={`mailto:${BUSINESS_INFO.email}`}
                >
                  <span className="break-all">{BUSINESS_INFO.email}</span>
                </ContactRow>
              )}
            </ul>
          </div>

        </div>

        <div className="mt-14 mb-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <p className="text-xs text-white/30 text-center">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-white/50 font-semibold">{BUSINESS_INFO.name}</span>
          {' '}· All Rights Reserved.
        </p>

      </div>
    </footer>
  )
}