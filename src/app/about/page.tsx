"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  X, 
  Menu, 
  Phone, 
  Sparkles, 
  Award, 
  Heart, 
  ChefHat, 
  Clock, 
  Users,
  Utensils,
  ArrowRight,
  ShieldCheck,
  Compass
} from "lucide-react";
import { APP_CONFIG, trackWhatsAppConversion } from "@/lib/config";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Kak Steven Moe",
    role: "Founder & Owner of Warung Papatong",
    photo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=450&fit=crop&q=80",
    bio: "Mendirikan Warung Papatong sejak 2018 untuk melestarikan kuliner saung Sunda autentik dengan sentuhan manajemen modern ramah keluarga di Cibinong.",
    signature: "Steven M."
  },
  {
    id: 2,
    name: "Chef Kang Dedi",
    role: "Culinary Head Chef Priangan",
    photo: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=450&fit=crop&q=80",
    bio: "Berpengalaman lebih dari 15 tahun meracik bumbu bakaran madu khas Jawa Barat dan olahan laut segar berpeta rasa tradisional.",
    signature: "K. Dedi"
  }
];

export default function NextJS_AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link href="/venue" className="text-gray-500 hover:text-black transition-colors">Galeri Venue</Link>
            <Link href="/about" className="text-black border-b-2 border-[#FFCC00] pb-1">Tentang Kami</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20Admin%20Papatong`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e, "NextJS About Click Top")}
              className="bg-[#FFCC00] hover:bg-[#E60000] text-black hover:text-white font-extrabold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-sm"
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
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-4 pb-6 space-y-3 shadow-inner">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">Beranda</Link>
            <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">E-Menu</Link>
            <Link href="/venue" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-gray-600 pl-3">Galeri Venue</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block font-bold py-2 text-black border-l-4 border-[#FFCC00] pl-3">Tentang Kami</Link>
          </div>
        )}
      </header>

      {/* SECTION 1: STORYTELLING CONTENT GRID */}
      <section className="bg-white py-20 border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5" />
                SEJARAH & TRADISI KULINER
              </span>
              <h2 className="font-sans font-black text-3xl md:text-5xl text-black tracking-tighter leading-none">
                Warisan Rasa Saung Sunda & Hasil Nelayan Nusantara
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Dimulai sejak tahun 2018 di bawah asuhan Kak Steven Moe, **Resto Warung Papatong** lahir dengan hasrat memadukan estetika saung lesehan pedesaan Pasundan yang adem dengan rasa luhur aneka seafood bakaran madu khas pesisir laut Jabar.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-sans font-black text-sm text-black uppercase tracking-wider mb-2">
                    Tradisi Pilihan
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Kami hanya memanen ikan fresh sehat langsung dari kolam patong saung lesehan sesaat sebelum dinikmati pelanggan.
                  </p>
                </div>
                
                <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-sans font-black text-sm text-black uppercase tracking-wider mb-2">
                    Cita Rasa Bumbu
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Rempah-rempah segar ditumbuk tradisional tanpa pengawet sintetik untuk mewujudkan jaminan kesegaran masakan.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Picture Frame (5 columns) */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-black shadow-xl bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&fit=crop&q=80"
                  alt="Suasana interior saung lesehan Sunda"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: MEET THE OWNER & MANAGEMENT (E-E-A-T Compliance) */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#E60000] tracking-widest uppercase bg-[#E60000]/10 border border-[#E60000]/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 block mx-auto w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              INTEGRITAS & E-E-A-T TRANSPARANSI
            </span>
            <h2 className="font-sans font-black text-3xl md:text-5xl text-black tracking-tighter mt-4 leading-none animate-pulse">
              Tim Pengelola Utama Dapur
            </h2>
            <p className="max-w-md mx-auto text-xs text-gray-400 mt-2 font-mono uppercase">
              Berkomitmen menjaga kebersihan prima, keramahan sejati, & kualitas masakan nomor satu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-[2.5rem] border border-gray-200 hover:border-[#FFCC00] shadow-sm hover:shadow-xl transition-all duration-300 md:flex overflow-hidden"
              >
                {/* Photo half */}
                <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-auto bg-gray-100 relative shrink-0">
                  <img 
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Text half */}
                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-orange-500 font-black uppercase bg-orange-100 px-3 py-1 rounded-lg inline-block">
                      {member.role}
                    </span>
                    <h3 className="font-sans font-black text-xl text-black leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-400 mt-6">
                    <span>EST. 2018 | PAPATONG RESORT</span>
                    <span className="font-sans font-extrabold text-black italic">&quot;{member.signature}&quot;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: FINAL CALL TO ACTION (RESERVATION BANNER) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white p-8 md:p-16 rounded-[3rem] border-4 border-[#FFCC00] shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <span className="text-xs font-bold text-[#FFCC00] tracking-widest uppercase bg-[#FFCC00]/15 border border-[#FFCC00]/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mx-auto w-fit">
                <Utensils className="w-3.5 h-3.5 animate-bounce" />
                SISTEM RESERVASI ONLINE CEPAT
              </span>

              <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter leading-none text-white">
                Kunci Saung Lesehan Favorit Anda Sekarang Juga
              </h2>

              <p className="max-w-lg mx-auto text-xs md:text-sm text-gray-300 leading-relaxed">
                Membantu rombongan makan siang dinas, reuni arisan keluarga, or rapat korporat Anda mengamankan lokasi saung harian di atas air dan memutus waktu tunggu penyajian dapur.
              </p>

              <div className="pt-4">
                <a
                  href={`${APP_CONFIG.whatsappBaseLink}?text=Halo%20Admin%20Papatong,%20saya%20ingin%20reservasi%20meja%20saung%20lesehan.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => trackWhatsAppConversion(e, "NextJS About Final Reserv CTA")}
                  className="inline-flex items-center gap-2 bg-[#FFCC00] hover:bg-[#E60000] text-black hover:text-white font-black text-sm px-10 py-4.5 rounded-xl transition-all duration-300 shadow-md border-2 border-black hover:border-transparent cursor-pointer"
                >
                  Booking Lesehan Sejuk <ArrowRight className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
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
