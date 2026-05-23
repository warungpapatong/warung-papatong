import React from 'react';
import { ArrowUp, Phone, MapPin, Mail, Compass } from 'lucide-react';
import { BUSINESS_INFO } from '@/data';
import Logo from './Logo';

export default function Footer() {
  
  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0b0e0c] text-brand-secondary z-10">
      
      {/* Accent strip 2px at the very top */}
      <div className="h-1 bg-brand-accent w-full" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
          
          {/* Col 1 - Brand Identity (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo size="md" />

            <p className="text-brand-secondary/80 text-sm leading-relaxed max-w-sm">
              Surganya masakan khas Sunda autentik dan hidangan olahan seafood segar di Cibinong. Tempat silaturahmi favorit keluarga Jabodetabek sejak {BUSINESS_INFO.founded || '2018'}.
            </p>

            {/* Custom SVG Social Icons row (Instagram & TikTok) as constraint */}
            <div className="flex items-center gap-3">
              <a
                href={`https://instagram.com/${BUSINESS_INFO.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary/40 hover:bg-brand-accent hover:scale-105 p-3 rounded-full text-white transition-all"
                aria-label="Kunjungi profil Instagram kami"
              >
                {/* Custom Inline SVG for Instagram since Lucide has none */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href={`https://tiktok.com/@${BUSINESS_INFO.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary/40 hover:bg-brand-accent hover:scale-105 p-3 rounded-full text-white transition-all"
                aria-label="Kunjungi profil TikTok kami"
              >
                {/* Custom Inline SVG for TikTok since Lucide has none */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.02 1.59 4.23.95 1.12 2.27 1.9 3.73 2.19v3.96c-1.78-.11-3.48-.84-4.81-2.04v7.4c0 1.15-.22 2.27-.67 3.32-.44 1.05-1.09 1.99-1.92 2.76-.83.77-1.81 1.36-2.88 1.73s-2.19.55-3.32.55-2.26-.18-3.33-.55c-1.07-.37-2.05-.96-2.88-1.73-.83-.77-1.48-1.71-1.92-2.76-.45-1.05-.67-2.17-.67-3.32s.22-2.27.67-3.32c.44-1.05 1.09-1.99 1.92-2.76.83-.77 1.81-1.36 2.88-1.73 1.07-.37 2.19-.55 3.33-.55.43 0 .86.03 1.29.08V8.92c-.43-.07-.86-.1-1.29-.1-3.14 0-5.7 2.56-5.7 5.7s2.56 5.7 5.7 5.7 5.7-2.56 5.7-5.7V0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 - Quick Links (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm text-brand-secondary/80">
              <li><a href="#beranda" className="hover:text-brand-accent transition-colors">Beranda Utama</a></li>
              <li><a href="#tentang" className="hover:text-brand-accent transition-colors">Kisah Rasa</a></li>
              <li><a href="#menu" className="hover:text-brand-accent transition-colors">E-Menu Digital</a></li>
              <li><a href="#proses" className="hover:text-brand-accent transition-colors">Langkah Booking</a></li>
              <li><a href="#ulasan" className="hover:text-brand-accent transition-colors">Ulasan Pelanggan</a></li>
              <li><a href="#lokasi" className="hover:text-brand-accent transition-colors">Lokasi & Kontak</a></li>
            </ul>
          </div>

          {/* Col 3 - Contact & Hours (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">Operasional & Lokasi</h4>
            <ul className="space-y-4 text-sm text-brand-secondary/80">
              
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {BUSINESS_INFO.address}
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-brand-accent shrink-0" />
                <span>
                  Buka Setiap Hari: 11.00 - 22.00 WIB
                </span>
              </li>

              <li className="flex items-center gap-2.5 border-t border-brand-primary/30 pt-4">
                <Phone className="w-5 h-5 text-brand-accent shrink-0" />
                <span className="font-bold">
                  WA: {BUSINESS_INFO.phone}
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-brand-primary/30 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-secondary/60">
          <div>
            <p>&copy; {new Date().getFullYear()} Resto Warung Papatong Cibinong. Hak Cipta Dilindungi.</p>
            <p className="mt-1 font-bold text-brand-accent">Penyelamat Kuliner Keluarga Dekat Tol Sentul.</p>
          </div>

          <button
            onClick={handleBackToTop}
            className="group flex items-center gap-2 bg-brand-primary/40 hover:bg-brand-accent p-2.5 rounded-full text-white transition-all transform hover:-translate-y-1"
            aria-label="Kembali ke atas halaman"
          >
            <span>Atas</span>
            <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
          </button>
        </div>

      </div>
    </footer>
  );
}
