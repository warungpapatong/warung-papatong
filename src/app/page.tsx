"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Phone, 
  Sparkles, 
  MapPin, 
  Clock, 
  Utensils, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Music,
  Heart,
  MessageCircle,
  Instagram,
  Navigation,
  Compass
} from "lucide-react";
import { APP_CONFIG, trackWhatsAppConversion } from "@/lib/config";
import { PRODUCTS_DATA, TESTIMONIALS_DATA, BUSINESS_INFO, AMBIENCE_TEASER_DATA } from "@/data";

export default function NextJS_HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const prevReview = () => {
    setReviewIdx((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setReviewIdx((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#202124] antialiased">
      
      {/* SECTION 1: GLOBAL HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo and Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#FFCC00] rounded-full border border-black flex items-center justify-center font-black text-black text-xs shadow-md">
              WP
            </div>
            <div>
              <span className="font-sans font-black text-lg md:text-xl tracking-tight text-black block">
                WARUNG PAPATONG
              </span>
              <span className="text-[10px] font-mono text-gray-400 block tracking-wider uppercase">
                Sunda & Seafood Resto
              </span>
            </div>
          </Link>

          {/* Desktop Links Container */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-bold text-sm">
            <Link href="/" className="text-black border-b-2 border-[#FFCC00] pb-1">
              Beranda
            </Link>
            <Link href="/menu" className="text-gray-500 hover:text-black transition-colors">
              E-Menu
            </Link>
            <Link href="/venue" className="text-gray-500 hover:text-black transition-colors">
              Galeri Venue
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-black transition-colors">
              Tentang Kami
            </Link>
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={APP_CONFIG.whatsappBaseLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e, "NextJS Header Call Button")}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 text-black rounded-full transition-colors flex items-center gap-1.5"
              aria-label="Hubungi Telepon"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={`${APP_CONFIG.whatsappBaseLink}?text=${encodeURIComponent("Halo Admin Resto Warung Papatong Cibinong, saya ingin reservasi meja saung lesehan.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e, "NextJS Hero Reserve CTA")}
              className="bg-[#FFCC00] hover:bg-[#E60000] text-black hover:text-white font-extrabold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md"
            >
              Booking Lesehan Sejuk
            </a>
          </div>

          {/* Mobile Right Hamburguer button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-lg justify-center transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-4 pb-6 space-y-3 shadow-inner">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-2 text-black border-l-4 border-[#FFCC00] pl-3"
            >
              Beranda
            </Link>
            <Link 
              href="/menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-2 text-gray-600 hover:text-black pl-3"
            >
              E-Menu
            </Link>
            <Link 
              href="/venue" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-2 text-gray-600 hover:text-black pl-3"
            >
              Galeri Venue
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold py-2 text-gray-600 hover:text-black pl-3"
            >
              Tentang Kami
            </Link>
            
            <div className="pt-4 grid grid-cols-1 gap-3">
              <a
                href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20Admin%20Papatong`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackWhatsAppConversion(e, "NextJS Mobile Drawer WA")}
                className="bg-[#FFCC00] text-black font-extrabold text-center py-3 rounded-xl block border border-black"
              >
                Pemesanan Instan via WA
              </a>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 2: HERO BANNER SECTION */}
      <section className="relative py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden border-b border-gray-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                REKOMENDASI BOGOR RAYA
              </span>
              <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-black tracking-tighter leading-none">
                Restaurant Sunda & Seafood Segar Terbaik
              </h1>
              <p className="font-mono text-xs uppercase text-gray-400 font-extrabold tracking-wider">
                Family • Friends • Quality Time • Corporate Event
              </p>
              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                Melestarikan kekayaan tradisi kuliner Sunda autentik dengan paduan aneka tangkapan seafood laut yang dibakar gurih madu. Nikmati saung lesehan terapung yang sejuk dipagari kolam ikan indah di Cibinong.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  href="/menu"
                  className="bg-[#FFCC00] hover:bg-[#E60000] text-black hover:text-white text-center font-black text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-md"
                >
                  Lihat Daftar Menu Lengkap
                </Link>
                <a
                  href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20saya%20tertarik%20mencoba%20hidangan%20di%20lesehan%20Warung%20Papatong`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => trackWhatsAppConversion(e, "NextJS Hero Web WA Click")}
                  className="bg-transparent hover:bg-gray-100 text-black border border-gray-300 text-center font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Chat Admin WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Business Owner Quick Access Buttons: Google Maps and Instagram Social */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block sm:inline">Akses Cepat:</span>
                <a
                  href="https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor/@-6.5120209,106.8329725,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c1a8054a7b43:0xf582c100380d74a7!8m2!3d-6.5120209!4d106.8329725!16s%2Fg%2F11h12xm87x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[#2B6CB0] border border-[#4285F4]/20 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#4285F4]" />
                  Rute Peta G-Maps ↗
                </a>

                <a
                  href="https://instagram.com/warungpapatong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 text-[#B83280] border border-[#E1306C]/20 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  Instagram Resmi @warungpapatong ↗
                </a>
              </div>
            </div>

            {/* Right Interactive Card / CLS Immune aspect frame */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-black shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop&q=80"
                alt="Meja saung terapung asri Warung Papatong Cibinong"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black text-[#FFCC00] text-[10px] font-mono font-black uppercase px-3 py-1.5 rounded-lg">
                Cibinong, Jawa Barat
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: BEST SELLER HIGHLIGHTS */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" />
              Sajian Bestseller Kuliner
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-black tracking-tighter leading-none mt-4">
              Hidangan Autentik Pilihan Pelanggan
            </h2>
            <p className="text-xs font-mono text-gray-400 uppercase mt-2">
              Dibuat dari bahan bumbu segar hasil alam Nusantara alami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS_DATA.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2rem] overflow-hidden border border-gray-200 hover:border-[#FFCC00] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {item.badge && (
                    <span className="absolute top-4 left-4 bg-[#E60000] text-white text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-lg md:text-xl text-black leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono font-extrabold text-[#E60000]">
                      {item.priceFormatted}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href="/menu"
                    className="mt-4 block text-center bg-[#F8F9FA] hover:bg-[#FFCC00] text-black font-extrabold text-xs py-3 rounded-xl transition-colors border border-gray-200 hover:border-transparent"
                  >
                    Lihat Cara Pesan
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: AMBIENCE TEASER */}
      <section className="relative py-24 md:py-32 bg-[#202124] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#FFCC00] tracking-widest uppercase bg-[#FFCC00]/15 border border-[#FFCC00]/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                MOMEN GRUP & KELUARGA
              </span>
              <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-none">
                Suasana Asri Saung Lesehan Air
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-md">
                Menghadirkan pemandangan kolam patong alami dengan panggung live akustik Gitar syahdu harian khusus untuk menemani kumpul bersama rekan kerja maupun temu kangen rombongan makan dinas Anda.
              </p>
              
              <Link
                href="/venue"
                className="inline-flex items-center gap-2 bg-[#FFCC00] hover:bg-[#E60000] text-black hover:text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300"
              >
                Jelajahi Galeri Foto Suasana <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Responsive Ambience grid displays (budget quota constraint compliant) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AMBIENCE_TEASER_DATA.slice(0, 2).map((item, index) => (
                <div key={index} className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                  <img 
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover hover:scale-103 duration-300"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: LOCAL SEO QUICK CONTACT BLOCK */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* NAP Identity Panel */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-3 py-1.5 rounded-full inline-block">
                  LOKASI RESMI BOGOR
                </span>
                <h2 className="font-sans font-black text-3xl md:text-5xl text-black tracking-tighter leading-none pt-2">
                  Kunjungi Restoran Kami
                </h2>
                <p className="text-xs font-mono text-gray-400">
                  Google Maps Citation Anchor & Structured Addresses
                </p>
              </div>

              {/* Semantic NAP Block */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-gray-100 rounded-xl text-[#FFCC00] shrink-0 border border-black/10">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase font-black block">Alamat Peta</span>
                    <p className="text-sm font-sans font-extrabold text-black mt-1">
                      {APP_CONFIG.locationAddress}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-gray-100 rounded-xl text-black shrink-0 border border-black/10">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase font-black block">Jam Operasional</span>
                    <p className="text-sm font-sans font-extrabold text-black mt-1">
                      {APP_CONFIG.hoursOfOperation}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (Setiap hari: Jam 11 Siang - Jam 10 Malam)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-gray-100 rounded-xl text-black shrink-0 border border-black/10">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase font-black block">Hubungi Langsung</span>
                    <p className="text-sm font-sans font-extrabold text-black mt-1">
                      {APP_CONFIG.phoneFormatted}
                    </p>
                    <p className="text-xs text-gray-500">
                      (Nomor WhatsApp Customer Service Utama)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Iframe Map Container with explicit sizing parameters (prevent layout shifts) */}
            <div className="relative w-full h-96 lg:h-auto rounded-[2.5rem] overflow-hidden border-4 border-black shadow-lg bg-gray-100">
              <iframe
                title="Google Maps Resmi Warung Papatong Cibinong"
                src={APP_CONFIG.googleMapsApiReference}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: SOCIAL PROOF (CLIENT SLIDER TESTIMONIAL) */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          
          <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            ULASAN KONSUMEN SETIA
          </span>

          <div className="relative mt-8 min-h-[14rem] flex flex-col justify-center">
            <p className="text-lg md:text-2xl text-black font-semibold font-sans italic leading-relaxed max-w-2xl mx-auto">
              &ldquo;{TESTIMONIALS_DATA[reviewIdx].review}&rdquo;
            </p>
            
            <div className="mt-6 flex flex-col items-center">
              <span className="font-black text-sm text-black uppercase tracking-wider block">
                {TESTIMONIALS_DATA[reviewIdx].name}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {TESTIMONIALS_DATA[reviewIdx].city}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 bg-white text-black hover:bg-[#FFCC00] rounded-full border border-gray-200 transition-colors cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Visual pager indicator points matching Instagram Highlights aesthetic */}
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === reviewIdx ? "bg-[#FFCC00] scale-120 border border-black" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 bg-white text-black hover:bg-[#FFCC00] rounded-full border border-gray-200 transition-colors cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* GLOBAL PERSISTENT FOOTER */}
      <footer className="bg-[#202124] text-white border-t border-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            
            <div className="space-y-4">
              <span className="text-lg font-sans font-black text-white tracking-widest block">
                WARUNG PAPATONG
              </span>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                Sajian legendaris kuliner Sunda autentik dan tangkapan seafood bermutu tinggi di kawasan strategis Sentul - Cibinong Bogor.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-[#FFCC00] uppercase font-black block tracking-wider mb-4">
                Sitemap Index
              </span>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Beranda Utama</Link></li>
                <li><Link href="/menu" className="hover:text-white transition-colors">E-Menu Digital</Link></li>
                <li><Link href="/venue" className="hover:text-white transition-colors">Galeri Venue</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono text-[#FFCC00] uppercase font-black block tracking-wider mb-4">
                Layanan Pelanggan
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                Reservasi arisan, katering kantor, paket nasi kotak keluarga, atau acara corporate silakan hubungi customer support WhatsApp kami.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-[#FFCC00] uppercase font-black block tracking-wider mb-4">
                Kontak Pusat
              </span>
              <p className="text-xs text-white font-extrabold">{APP_CONFIG.phoneFormatted}</p>
              <p className="text-[10px] text-gray-400 mt-1">{APP_CONFIG.handoverEmail}</p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>
              &copy; 2026 {APP_CONFIG.businessName}. All Rights Reserved.
            </span>
            <span className="mt-2 sm:mt-0 flex items-center gap-1">
              Developed & Crafted by <span className="text-white hover:text-[#FFCC00] transition-colors">heyitskuril</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating CTAs on bottom right edge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href={APP_CONFIG.whatsappBaseLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => trackWhatsAppConversion(e, "NextJS Floating WA Button")}
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-transform duration-300 transform hover:scale-105"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>

    </div>
  );
}
