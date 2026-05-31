import { MapPin, Clock, Phone, MessageCircle, Navigation2, Compass } from 'lucide-react'

import { BUSINESS_INFO, LOCATION_DATA, buildWALink } from '@/data'

import WAButton from '../button/WAButton'

export default function LocationSection() {
  return (
    <section
      id="lokasi"
      className="py-20 md:py-24 bg-brand-surface border-t border-brand-border relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-5 space-y-8">

            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-primary-dark tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/25 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-primary" />
                {LOCATION_DATA.badge}
              </span>

              <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none">
                {LOCATION_DATA.title}
              </h2>

              <p className="text-brand-text text-sm md:text-base leading-relaxed">
                {LOCATION_DATA.description}
              </p>
            </div>

            <div className="space-y-4 bg-brand-surface-2 p-6 rounded-3xl border border-brand-border">
              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary-dark shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">
                    {LOCATION_DATA.labelAddress}
                  </h4>
                  <p className="text-sm text-brand-text mt-1 leading-relaxed">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-brand-border pt-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary-dark shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">
                    {LOCATION_DATA.labelHours}
                  </h4>
                  <p className="text-sm text-brand-text mt-1 font-mono">{BUSINESS_INFO.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-brand-border pt-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary-dark shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">
                    {LOCATION_DATA.labelPhone}
                  </h4>
                  <p className="text-sm text-brand-text mt-1 font-bold font-mono">{BUSINESS_INFO.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <WAButton
                href={buildWALink(BUSINESS_INFO.wa, LOCATION_DATA.waMessage)}
                label={LOCATION_DATA.ctaWaText}
                trackingLabel="Location Section WhatsApp Chat"
                className="btn btn-wa btn-md"
                icon={<MessageCircle className="w-5 h-5" />}
              />

              <a
                href={BUSINESS_INFO.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-md"
              >
                <Navigation2 className="w-5 h-5" />
                {LOCATION_DATA.ctaMapsText}
              </a>
            </div>

          </div>

          <div className="lg:col-span-7 h-[350px] md:h-[450px] rounded-4xl overflow-hidden shadow-card-lg border-4 border-brand-surface">
            <iframe
              src={LOCATION_DATA.mapsIframeSrc}
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