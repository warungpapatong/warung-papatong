import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Mail, Navigation2, Compass } from 'lucide-react';
import { BUSINESS_INFO, buildWALink } from '@/data';
import { trackWhatsAppConversion } from '@/lib/tracking';

export default function LocationContact() {
  
  // Custom encoded google maps query string for embedded frame
  const mapsIframeSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8821948834465!2d106.83078381744384!3d-6.512020895289522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1a8054a7b43%3A0xf582c100380d74a7!2sRESTO%20WARUNG%20PAPATONG%20-%20Cibinong-Bogor!5e0!3m2!1sid!2sid!4v1716301234567!5m2!1sid!2sid`;

  return (
    <section
      id="lokasi"
      className="py-20 md:py-24 bg-brand-surface relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold text-brand-primary tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/25 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                DENGAN AKSES STRATEGIS
              </span>
              
              <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight mt-4 leading-none">
                Mudah Dijangkau, Bersebelahan GOR Pemda
              </h2>
              
              <p className="text-brand-text/80 text-sm md:text-base leading-relaxed mt-4">
                Berlokasi prima di Nanggewer, Cibinong, hanya terpaut beberapa menit dari Exit Toll sirkuit Sentul. Area kami berada di tepi jalan raya utama GOR Pemda, menjamin kemudahan manuver putar balik untuk Bus Wisata ataupun rombongan besar.
              </p>
            </div>

            {/* Structured Contact List Card */}
            <div className="space-y-4 bg-brand-secondary/40 p-6 rounded-3xl border border-brand-border/60">
              
              {/* Address Row */}
              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">Alamat Lengkap</h4>
                  <p className="text-sm text-brand-text mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              {/* Hours Row */}
              <div className="flex items-start gap-4 border-t border-brand-border/40 pt-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">Jam Operasional</h4>
                  <p className="text-sm text-brand-text mt-1 font-sans">
                    {BUSINESS_INFO.hours}
                  </p>
                </div>
              </div>

              {/* Phone Row */}
              <div className="flex items-start gap-4 border-t border-brand-border/40 pt-4">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider">Kontak Seluler Resmi</h4>
                  <p className="text-sm text-brand-text mt-1 font-bold">
                    {BUSINESS_INFO.phone}
                  </p>
                </div>
              </div>

            </div>

            {/* Fast Action CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={buildWALink(BUSINESS_INFO.wa, "Halo Admin Resto Warung Papatong, rombongan kami ingin datang dalam waktu dekat. Bisa dibantu infokan meja lesehan kosong?")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackWhatsAppConversion(e as any, 'Location Section WhatsApp Chat')}
                className="bg-brand-primary hover:bg-brand-dark text-brand-dark hover:text-white font-bold text-sm py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5 text-brand-dark hover:text-white" />
                Chat WhatsApp Sekarang
              </a>

              <a
                href={BUSINESS_INFO.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-surface hover:bg-brand-primary text-brand-dark border border-brand-primary/45 font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Navigation2 className="w-5 h-5 text-brand-accent" />
                Rute di Google Maps
              </a>
            </div>

          </div>

          {/* Right Column (Rounded Maps Frame Widget with shadow) */}
          <div className="lg:col-span-7 h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-brand-surface relative">
            <iframe
              src={mapsIframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Google Maps Warung Papatong Nanggewer Cibinong"
              className="grayscale-[10%] contrast-[105%] brightness-[98%]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
