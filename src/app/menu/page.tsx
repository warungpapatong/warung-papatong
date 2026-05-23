"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  X, 
  Menu, 
  Phone, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  ShoppingCart, 
  Filter, 
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { APP_CONFIG, trackWhatsAppConversion } from "@/lib/config";

import { PRODUCTS_DATA } from "@/data";

const CATEGORIES = ["Semua", "Seafood Olahan", "Paket Sunda", "Veggies & Co.", "Segar Minuman"];

export default function NextJS_MenuPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Semua");

  const filteredCatalog = currentTab === "Semua" 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(item => item.categoryLabel === currentTab);

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#202124] antialiased">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-8 font-sans font-bold text-sm">
            <Link href="/" className="text-gray-500 hover:text-black transition-colors">
              Beranda
            </Link>
            <Link href="/menu" className="text-black border-b-2 border-[#FFCC00] pb-1">
              E-Menu
            </Link>
            <Link href="/venue" className="text-gray-500 hover:text-black transition-colors">
              Galeri Venue
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-black transition-colors">
              Tentang Kami
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20Admin%20Papatong`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e, "NextJS E-Menu WA Chat Top")}
              className="bg-[#FFCC00] hover:bg-[#E60000] text-black hover:text-white font-extrabold text-sm px-6 py-3 rounded-full transition-all duration-300"
            >
              Order via WhatsApp
            </a>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-lg justify-center"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-4 pb-6 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">Beranda</Link>
            <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-black border-l-4 border-[#FFCC00] pl-3">E-Menu</Link>
            <Link href="/venue" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">Galeri Venue</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">Tentang Kami</Link>
          </div>
        )}
      </header>

      {/* SECTION 1: INNER PAGE HERO BANNER */}
      <section className="bg-[#202124] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FFCC00]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-[#FFCC00] tracking-widest uppercase bg-[#FFCC00]/15 border border-[#FFCC00]/20 px-3 py-1 rounded-full gap-1.5 inline-flex items-center">
            <Utensils className="w-3 h-3" />
            E-MENU HIDANGAN AUTENTIK
          </span>
          <h1 className="font-sans font-black text-3xl md:text-5xl text-white tracking-tighter mt-4 leading-none">
            Daftar Menu & Hidangan Otentik
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-gray-400 mt-2">
            Pesan instan di bawah ini secara online untuk memperpendek waktu tunggu antrean dapur saung lesehan.
          </p>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 overflow-x-auto pb-2">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-5 py-2.5 text-xs font-black rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                currentTab === tab 
                  ? "bg-[#FFCC00] text-black border-black shadow-md scale-102"
                  : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SECTION 3: PRODUCT ITEM CATLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCatalog.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-[2rem] border border-gray-200 hover:border-[#FFCC00] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#E60000] text-white text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono font-black tracking-widest text-orange-500">
                    {product.category}
                  </span>
                  <h3 className="font-sans font-black text-lg md:text-xl text-black">
                    {product.name}
                  </h3>
                  <p className="font-mono text-xs font-black text-[#E60000]">
                    {product.priceFormatted}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={`${APP_CONFIG.whatsappBaseLink}?text=${encodeURIComponent(`Halo Resto Warung Papatong, saya ingin memesan menu instan '${product.name}' (${product.priceFormatted}) dlm porsi rombongan.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => trackWhatsAppConversion(e, `NextJS Instant Food Order: ${product.name}`)}
                    className="w-full bg-[#FFCC00] hover:bg-[#E60000] hover:text-white text-black font-black text-xs py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors border border-black/15 hover:border-transparent cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Pesan Instan via WA
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: EVENT & CORPORATE BANNER */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFCC00] border-4 border-black p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E60000]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 max-w-xl text-black">
              <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-3 py-1 rounded-full inline-block">
                KATERING & Corporate GATHERING
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-black tracking-tight leading-none">
                Mengadakan Acara Besar or Gathering Kantor?
              </h2>
              <p className="text-xs md:text-sm text-gray-800 leading-relaxed">
                Tim dapur patong siap menyusun porsi prasmanan, paket besek hantaran, arisan komunitas, hingga tumpeng megah khusus untuk menyukseskan perayaan corporat Anda di Bogor. Hubungi Banquet Manager kami di bawah ini.
              </p>
            </div>

            <a
              href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20Admin%20Papatong,%20saya%20ingin%20berdiskusi%20mengenai%20paket%20katering%20gathering%20acara%20besar.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e, "NextJS Catering Lead Banner")}
              className="bg-black hover:bg-[#E60000] text-white font-black text-sm px-8 py-4 rounded-xl transition-all duration-300 md:shrink-0 flex items-center gap-2 border border-black hover:border-transparent shrink-0"
            >
              Diskusi Paket Acara <ArrowRight className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#202124] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono border-t border-white/5 pt-8">
            <span>&copy; 2026 {APP_CONFIG.businessName}. All Rights Reserved.</span>
            <span>Crafted by {APP_CONFIG.handoverEmail.split(".")[0]} | heyitskuril</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
