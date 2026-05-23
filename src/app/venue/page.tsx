"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  X, 
  Menu, 
  Phone, 
  Camera, 
  Maximize2, 
  Instagram, 
  Heart, 
  MessageCircle, 
  Sparkles,
  Award
} from "lucide-react";
import { APP_CONFIG, trackWhatsAppConversion } from "@/lib/config";

// High-resolution image records reflecting the strict 25-asset image allocation constraint
const VENUE_PHOTOS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&q=80",
    alt: "Gazebo saung terapung asri keluarga",
    gridSize: "large",
    category: "Suasana Resto"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&h=600&fit=crop&q=80",
    alt: "Pemandangan air mancur kolam ikan mas",
    gridSize: "medium",
    category: "Suasana Resto"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop&q=80",
    alt: "Panggung live music gratis Papatong",
    gridSize: "medium",
    category: "Aktivitas Pengunjung"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
    alt: "Rapat kerja & santap siang dinas dlm saung besar",
    gridSize: "medium",
    category: "Aktivitas Pengunjung"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=800&h=600&fit=crop&q=80",
    alt: "Bancakan porsi besar nasi liwet beralas daun pisang",
    gridSize: "large",
    category: "Aktivitas Pengunjung"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=600&fit=crop&q=80",
    alt: "Meja lesehan teduh di bawah rindang kelapa sawit",
    gridSize: "medium",
    category: "Suasana Resto"
  }
];

const INSTAGRAM_MOCKS = [
  { id: 1, img: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop&q=80", likes: "1.4k", comments: "124" },
  { id: 2, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop&q=80", likes: "978", comments: "82" },
  { id: 3, img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop&q=80", likes: "1.8k", comments: "165" },
  { id: 4, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop&q=80", likes: "845", comments: "61" }
];

export default function NextJS_VenuePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Semua");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof VENUE_PHOTOS[0] | null>(null);

  const filteredPhotos = currentTab === "Semua" 
    ? VENUE_PHOTOS 
    : VENUE_PHOTOS.filter(item => item.category === currentTab);

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#202124] antialiased">
      
      {/* NAVBAR */}
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
            <Link href="/" className="text-gray-500 hover:text-black transition-colors">Beranda</Link>
            <Link href="/menu" className="text-gray-500 hover:text-black transition-colors">E-Menu</Link>
            <Link href="/venue" className="text-black border-b-2 border-[#FFCC00] pb-1">Galeri Venue</Link>
            <Link href="/about" className="text-gray-500 hover:text-black transition-colors">Tentang Kami</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20Admin%20Papatong`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e, "NextJS Venue WA Chat Top")}
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
            <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">E-Menu</Link>
            <Link href="/venue" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-black border-l-4 border-[#FFCC00] pl-3">Galeri Venue</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">Tentang Kami</Link>
          </div>
        )}
      </header>

      {/* SECTION 1: INNER PAGE HERO BANNER */}
      <section className="bg-[#202124] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-[#FFCC00] tracking-widest uppercase bg-[#FFCC00]/15 border border-[#FFCC00]/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 inline-block">
            <Camera className="w-3.5 h-3.5" />
            LANSKAP SAUNG PASUNDAN
          </span>
          <h1 className="font-sans font-black text-3xl md:text-5xl text-white tracking-tighter mt-4 leading-none">
            Galeri & Suasana Warung Papatong
          </h1>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-400 mt-3 leading-relaxed">
            Menatap kenyamanan saung lesehan premium kami langsung di atas air, panggung pertunjukan gitar harian, serta ekspresi bahagia rombongan pemburu kuliner.
          </p>
        </div>
      </section>

      {/* SECTION 2: PHOTO TAB CONTROLLERS & MASONRY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* State Tab Controllers */}
        <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
          {["Semua", "Suasana Resto", "Aktivitas Pengunjung"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-6 py-2.5 text-xs font-black rounded-full border transition-all duration-300 transform whitespace-nowrap cursor-pointer ${
                currentTab === tab 
                  ? "bg-[#FFCC00] text-black border-black shadow-md scale-102"
                  : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Cards Grid (Cls mitigation constraint alignment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPhotos.map((photo) => {
            // Span configuration dynamically mapping classes without typescript issues
            const sizeClass = photo.gridSize === "large" 
              ? "sm:col-span-2 lg:col-span-2 row-span-1" 
              : "col-span-1";

            return (
              <div
                key={photo.id}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-200 hover:border-[#FFCC00] hover:shadow-2xl transition-all duration-300 aspect-[4/3] ${sizeClass}`}
              >
                <img 
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />

                {/* Cover Overlay Trigger Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 text-white">
                  <span className="text-[10px] font-mono text-[#FFCC00] uppercase font-black flex items-center gap-1 mb-1.5">
                    <Sparkles className="w-3 h-3 text-[#FFCC00]" />
                    {photo.category}
                  </span>
                  <h3 className="font-sans font-black text-sm md:text-lg tracking-tight">
                    {photo.alt}
                  </h3>
                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="mt-4 inline-flex items-center gap-1 text-[10px] bg-[#FFCC00] hover:bg-white text-black font-extrabold px-3.5 py-1.5 rounded-lg transition-transform hover:scale-103 cursor-pointer self-start border border-black"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    Perbesar Visual
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* SECTION 3: SOCIAL MEDIA SHOWCASE STREAM */}
      <section className="bg-white border-t border-gray-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 block mx-auto w-fit">
              <Instagram className="w-3.5 h-3.5" />
              INTEGRASI INSTAGRAM POSTS
            </span>
            <h2 className="font-sans font-black text-3xl md:text-5xl text-black tracking-tighter mt-4 leading-none">
              Ikuti Kami @restowarungpapatong
            </h2>
            <p className="max-w-md mx-auto text-xs text-gray-500 mt-2">
              Promo nasi liwet mingguan, diskon rombongan wisata, dan jadwal akustik free harian
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {INSTAGRAM_MOCKS.map((feed) => (
              <a
                key={feed.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 block"
              >
                <img 
                  src={feed.img}
                  alt={`Instagram Post ${feed.id}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-mono text-sm">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <span className="font-bold">{feed.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 text-[#FFCC00] fill-[#FFCC00]" />
                    <span className="font-bold">{feed.comments}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFCC00] hover:bg-black text-black hover:text-white font-black text-sm px-8 py-4 rounded-full border border-black shadow-md focus-visible:outline-none transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Gabung Rombongan Instagram
            </a>
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL DIALOG DISPLAY */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-2xl md:flex cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-[#F8F9FA]/60 hover:bg-[#FFCC00] text-black p-2.5 rounded-full transition-all duration-200 z-10 cursor-pointer border border-black/10"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:max-h-[70vh] bg-neutral-900">
              <img 
                src={selectedPhoto.image}
                alt={selectedPhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-orange-500 uppercase font-black bg-orange-100 px-3 py-1 rounded-lg inline-block">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-sans font-black text-xl md:text-2xl text-black leading-tight">
                  Visualisasi Area Lesehan
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {selectedPhoto.alt}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>EST 2018 | PAPATONG RESORT</span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="font-black text-[#E60000] hover:text-black hover:underline cursor-pointer"
                >
                  Kembali ke grid
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

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
