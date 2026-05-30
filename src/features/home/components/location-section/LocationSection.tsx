// src/features/home/components/LocationSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ SERVER COMPONENT — hapus 'use client', tidak ada hooks browser
// ✅ Semua konten (h2, alamat, jam, telepon, iframe maps) ada di HTML
//    → Google crawl NAP (Name, Address, Phone) langsung — penting untuk SEO lokal
// ✅ Client logic diisolasi di:
//    - WAButton.tsx → hanya onClick tracking (reuse dari section lain)
//
// CATATAN SEO LOKAL:
//   NAP consistency (nama, alamat, telepon) di HTML server adalah faktor
//   ranking Google Maps / Local Pack. Pastikan BUSINESS_INFO.address,
//   BUSINESS_INFO.phone, dan BUSINESS_INFO.hours konsisten dengan
//   profil Google Business Profile restoran.
// ─────────────────────────────────────────────────────────────────────────────

import { MapPin, Clock, Phone, MessageCircle, Navigation2, Compass } from 'lucide-react'

import { BUSINESS_INFO, buildWALink } from '@/data'

import WAButton from '../button/WAButton'

// ─── Constants ────────────────────────────────────────────────────────────────

const MAPS_IFRAME_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8821948834465!2d106.83078381744384!3d-6.512020895289522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1a8054a7b43%3A0xf582c100380d74a7!2sRESTO%20WARUNG%20PAPATONG%20-%20Cibinong-Bogor!5e0!3m2!1sid!2sid!4v1716301234567!5m2!1sid!2sid'

const WA_LOCATION_MESSAGE =
  'Halo Admin Resto Warung Papatong, rombongan kami ingin datang dalam waktu dekat. Bisa dibantu infokan meja lesehan yang tersedia?'

// ─── Component ────────────────────────────────────────────────────────────────

export default function LocationSection() {
  return (
    <section
      id="lokasi"
      className="py-20 md:py-24 bg-brand-surface border-t border-brand-border relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left: contact detail — pure server HTML ── */}
          <div className="lg:col-span-5 space-y-8">

            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/25 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-primary" />
                DENGAN AKSES STRATEGIS
              </span>

              {/* ✅ h2 di HTML */}
              <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none">
                Mudah Dijangkau, Bersebelahan GOR Pemda
              </h2>

              <p className="text-brand-text text-sm md:text-base leading-relaxed">
                Berlokasi prima di Nanggewer, Cibinong, hanya terpaut beberapa menit dari Exit Toll
                Sirkuit Sentul. Area kami di tepi jalan raya utama GOR Pemda, menjamin kemudahan
                manuver putar balik untuk Bus Wisata ataupun rombongan besar.
              </p>
            </div>

            {/* ✅ NAP info — Name, Address, Phone di HTML untuk SEO lokal */}
            <div className="space-y-4 bg-brand-surface-2 p-6 rounded-3xl border border-brand-border">

              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">Alamat Lengkap</h4>
                  <p className="text-sm text-brand-text mt-1 leading-relaxed">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-brand-border pt-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">Jam Operasional</h4>
                  <p className="text-sm text-brand-text mt-1 font-mono">{BUSINESS_INFO.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-brand-border pt-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">Kontak Seluler Resmi</h4>
                  <p className="text-sm text-brand-text mt-1 font-bold font-mono">{BUSINESS_INFO.phone}</p>
                </div>
              </div>

            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/*
                WAButton = Client Component (reuse) — hanya untuk onClick tracking.
                className di-override ke btn-wa agar sesuai style section ini.
              */}
              <WAButton
                href={buildWALink(BUSINESS_INFO.wa, WA_LOCATION_MESSAGE)}
                label="Chat WhatsApp Sekarang"
                trackingLabel="Location Section WhatsApp Chat"
                className="btn btn-wa btn-md"
                icon={<MessageCircle className="w-5 h-5" />}
              />

              {/*
                Link Google Maps tidak butuh tracking → <a> biasa di server.
                Tidak perlu WAButton atau komponen client sama sekali.
              */}
              <a
                href={BUSINESS_INFO.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-md"
              >
                <Navigation2 className="w-5 h-5" />
                Rute di Google Maps
              </a>
            </div>

          </div>

          {/* ── Right: Google Maps embed — pure HTML, zero JS ── */}
          {/*
            <iframe> adalah elemen HTML standar, tidak butuh JS sama sekali.
            Browser langsung load Maps secara native tanpa hydration.
          */}
          <div className="lg:col-span-7 h-[350px] md:h-[450px] rounded-4xl overflow-hidden shadow-card-lg border-4 border-brand-surface">
            <iframe
              src={MAPS_IFRAME_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Google Maps Warung Papatong Cibinong"
              className="grayscale-[10%] contrast-[105%] brightness-[98%]"
            />
          </div>

        </div>
      </div>
    </section>
  )
}