// src/components/layout/Navbar.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Menu, MessageSquare, X } from 'lucide-react'

import { NAV_ITEMS } from '@/config/navigation'
import { BUSINESS_INFO, buildWALink } from '@/data'
import { trackWhatsAppConversion } from '@/lib/tracking'

const WA_BOOKING_MESSAGE =
  'Halo Admin Papatong, saya ingin pesan / tanya menu yang tersedia.'

export default function Navbar() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleWA(source: string) {
    trackWhatsAppConversion(source)
    window.open(
      buildWALink(BUSINESS_INFO.wa, WA_BOOKING_MESSAGE),
      '_blank',
      'noopener,noreferrer'
    )
    setOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-brand-border py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO + BRAND NAME */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Warung Papatong"
          >
            <Image
              src="/images/logo/papatong-logo.webp"
              alt="Warung Papatong"
              width={140}
              height={40}
              priority
              className="h-12 w-auto rounded-full object-contain"
            />
            <span className="font-display font-black text-base text-brand-dark tracking-tight leading-none">
              Warung<br />
              <span className="text-brand-primary-dark">Papatong</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-primary-light text-brand-dark'
                      : 'text-brand-muted hover:bg-brand-primary-light hover:text-brand-dark'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* WA BUTTON */}
            <button
              onClick={() => handleWA('Navbar — Pesan via WA')}
              className="hidden sm:inline-flex btn btn-wa btn-md hover:text-brand-dark"
            >
              <MessageSquare className="h-4 w-4" />
              Pesan Sekarang
            </button>

            {/* MOBILE WA */}
            <button
              onClick={() => handleWA('Navbar Mobile — Pesan via WA')}
              className="sm:hidden inline-flex btn btn-wa btn-sm hover:text-brand-dark"
            >
              <MessageSquare className="h-4 w-4" />
              Pesan Via WA
            </button>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="lg:hidden rounded-xl p-2 text-brand-dark transition-colors hover:bg-brand-primary-light"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* TABLET DROPDOWN */}
        <div
          className={`hidden sm:block lg:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-96 border-t border-brand-border' : 'max-h-0'
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-4 bg-white">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-primary text-brand-dark'
                      : 'text-brand-muted hover:bg-brand-primary-light hover:text-brand-dark'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-40 sm:hidden transition-all duration-300 ${
          open ? 'visible' : 'invisible'
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* BOTTOM SHEET */}
        <div
          className={`absolute inset-x-0 bottom-0 rounded-t-[2rem] bg-white px-6 pb-10 pt-6 transition-transform duration-500 ease-out ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* HANDLE */}
          <div className="mx-auto mb-6 h-1.5 w-14 rounded-full bg-neutral-200" />

          {/* NAV */}
          <nav className="mb-6 flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-neutral-100 py-4 text-lg font-semibold transition-colors ${
                    isActive ? 'text-brand-primary-dark' : 'text-brand-dark'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <button
            onClick={() => handleWA('Mobile Drawer — Pesan via WA')}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-primary px-5 py-4 font-semibold text-brand-dark shadow-md transition-transform active:scale-[0.98]"
          >
            <MessageSquare className="h-5 w-5" />
            Pesan via WhatsApp
          </button>
        </div>
      </div>
    </>
  )
}