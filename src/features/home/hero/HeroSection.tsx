import { ArrowRight, BookOpen, Clock, ExternalLink, Instagram, MapPin, Star } from 'lucide-react'

import {
  BUSINESS_INFO,
  FULL_MENU_PDF_URL,
  HERO_DATA,
  PRODUCTS_DATA,
  buildWALink,
  formatProductPrice,
} from '@/data'

import {
  HeroAnimatedContainer,
  HeroAnimatedItem,
  HeroRightCol,
} from './hero-animations'
import HeroImage from './hero-image'
import WAButton from '../wa-button'

function getFeaturedMenu() {
  const currentBlock = Math.floor(new Date().getHours() / 4)
  return PRODUCTS_DATA[currentBlock % PRODUCTS_DATA.length]
}

export default function HeroSection() {
  const featuredMenu = getFeaturedMenu()

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-brand-bg pt-28 pb-20 sm:pt-32 lg:min-h-screen lg:flex lg:items-center"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-brand-primary/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8">

        <HeroAnimatedContainer className="order-1 lg:col-span-6">

          <HeroAnimatedItem className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            {HERO_DATA.pillBadge}
          </HeroAnimatedItem>

          <HeroAnimatedItem
            as="h1"
            className="max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl"
          >
            {HERO_DATA.headlineText}
          </HeroAnimatedItem>

          <HeroAnimatedItem
            as="p"
            className="mt-5 max-w-xl text-base leading-relaxed text-brand-text sm:text-lg"
          >
            {HERO_DATA.description}
          </HeroAnimatedItem>

          <HeroAnimatedItem className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={FULL_MENU_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-sm font-bold text-brand-dark shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-brand-dark hover:shadow-xl active:scale-[0.985] sm:text-base"
            >
              <BookOpen className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
              <span>{HERO_DATA.ctaMenuText}</span>
              <ExternalLink className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <WAButton
              href={buildWALink(BUSINESS_INFO.wa, HERO_DATA.waMessage)}
              label={HERO_DATA.ctaBookingText}
              trackingLabel="Hero WA Button"
            />
          </HeroAnimatedItem>

          <HeroAnimatedItem className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={BUSINESS_INFO.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-primary/30 hover:text-brand-dark"
            >
              <MapPin className="h-4 w-4" />
              {HERO_DATA.quickLinks.mapsLabel}
            </a>

            <a
              href={`https://instagram.com/${BUSINESS_INFO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-primary/30 hover:text-brand-dark"
            >
              <Instagram className="h-4 w-4" />
              @{BUSINESS_INFO.instagram}
            </a>
          </HeroAnimatedItem>

          <HeroAnimatedItem className="mt-8 grid grid-cols-3 border-t border-brand-border pt-5 sm:mt-10 sm:gap-2 sm:pt-6">
            <div className="flex flex-col justify-start pr-3">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-brand-warning text-brand-warning sm:h-4 sm:w-4" />
                <span className="text-[17px] font-black leading-none text-brand-dark sm:text-lg">
                  {HERO_DATA.stats.rating}
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-tight text-brand-muted sm:text-xs">
                {HERO_DATA.stats.ratingLabel}
              </p>
            </div>

            <div className="flex flex-col justify-start border-l border-brand-border px-3">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-brand-primary-dark sm:h-4 sm:w-4" />
                <span className="text-[17px] font-black leading-none text-brand-dark sm:text-lg">
                  {HERO_DATA.stats.hours}
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-tight text-brand-muted sm:text-xs">
                {HERO_DATA.stats.hoursLabel}
              </p>
            </div>

            <div className="flex flex-col justify-start border-l border-brand-border pl-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-primary-dark sm:h-4 sm:w-4" />
                <span className="text-[17px] font-black leading-none text-brand-dark sm:text-lg">
                  {HERO_DATA.stats.location}
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-tight text-brand-muted sm:text-xs">
                {HERO_DATA.stats.locationLabel}
              </p>
            </div>
          </HeroAnimatedItem>

        </HeroAnimatedContainer>

        <HeroRightCol className="relative order-2 lg:col-span-6">

          <div className="mb-4 flex justify-end">
            <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                  {HERO_DATA.kitchenStatusLabel}
                </p>
                <p className="mt-1 text-xs font-semibold text-brand-dark">
                  {HERO_DATA.kitchenStatusDesc}
                </p>
              </div>
            </div>
          </div>

          <HeroImage
            featuredMenu={featuredMenu}
            featuredTodayLabel={HERO_DATA.featuredTodayLabel}
            kitchenStatusLabel={HERO_DATA.kitchenStatusLabel}
            kitchenStatusDesc={HERO_DATA.kitchenStatusDesc}
          />

          <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-xl">
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                {HERO_DATA.featuredTodayLabel}
              </p>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-black tracking-tight text-brand-dark sm:text-2xl">
                    {featuredMenu.name}
                  </h2>
                  {featuredMenu.description && (
                    <p className="mt-3 text-sm leading-relaxed text-brand-text sm:text-[15px]">
                      {featuredMenu.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-brand-border pt-4 sm:block sm:border-0 sm:pt-0">
                  <span className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-5 py-3 text-base font-black text-brand-dark shadow-sm">
                    {formatProductPrice(featuredMenu)}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </HeroRightCol>

      </div>
    </section>
  )
}
