/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, TreeDeciduous, Star, ChevronRight, Compass, Sparkles, Utensils } from 'lucide-react';
import { Product } from '@/types';
import { initGoogleAdsTracking, APP_CONFIG } from '@/lib/tracking';

// Importing Custom Modular components from Feature-Based Folders using absolute @/ aliases
import Navbar from '@/features/common/components/Navbar';
import Hero from '@/features/home/components/Hero';
import StatsSection from '@/features/home/components/StatsSection';
import AboutUs from '@/features/about/components/AboutUs';
import TeamSection from '@/features/about/components/TeamSection';
import MenuSection from '@/features/menu/components/MenuSection';
import InteractiveBooking from '@/features/booking/components/InteractiveBooking';
import Testimonials from '@/features/home/components/Testimonials';
import ProcessSteps from '@/features/home/components/ProcessSteps';
import FaqAccordion from '@/features/home/components/FaqAccordion';
import LocationContact from '@/features/common/components/LocationContact';
import FloatingWA from '@/features/booking/components/FloatingWA';
import Footer from '@/features/common/components/Footer';
import DynamicSEO from '@/features/common/components/DynamicSEO';
import GallerySection from '@/features/gallery/components/GallerySection';
import BestSellers from '@/features/home/components/BestSellers';
import AmbienceTeaser from '@/features/home/components/AmbienceTeaser';

export default function App() {
  // Initialize tracking and Google Ads metadata
  useEffect(() => {
    initGoogleAdsTracking(APP_CONFIG);
  }, []);

  // Page Routing State
  const [currentPage, setCurrentPage] = useState<'beranda' | 'menu' | 'venue' | 'tentang'>('beranda');

  // Global pre-order basket state: mapping product IDs to quantity count
  const [basket, setBasket] = useState<Record<number, number>>({});
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Basket action handlers
  const handleAddToBasket = (product: Product) => {
    setBasket((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const handleRemoveFromBasket = (productId: number) => {
    setBasket((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId] -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const handleClearBasket = () => {
    setBasket({});
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
    document.body.style.overflow = 'hidden'; // block body scroll for accessibility
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="relative min-h-screen bg-brand-secondary text-brand-text selection:bg-brand-primary selection:text-brand-secondary overflow-x-hidden antialiased">
      
      {/* Scroll Progress Bar at the top page edge */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left" />

      {/* Floating Header Navigation Panel */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />

      {/* Main Multi-Halaman Page Container with smooth route animations */}
      <main className="pt-24 min-h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'beranda' && (
              <>
                <DynamicSEO 
                  pagePath="/" 
                  pageTitle="Beranda" 
                  pageDescription="Selamat datang di Warung Papatong Cibinong, tempat makan Sunda legendaris & Seafood bakar madu terlaris dengan lesehan asri dan parkiran luas di Bogor." 
                />
                
                {/* SECTION 2: Hero Section */}
                <Hero onOpenBooking={handleOpenBooking} />

                {/* SECTION 3: Best Seller Highlight (Teaser Menu) */}
                <BestSellers onNavigateToMenu={() => setCurrentPage('menu')} />

                {/* SECTION 4: Ambience Teaser */}
                <AmbienceTeaser onNavigateToGallery={() => setCurrentPage('venue')} />

                {/* Additional Stats Section */}
                <StatsSection />

                {/* Live Music & Harmony Highlight */}
                <section className="relative py-24 md:py-32 bg-brand-dark text-brand-secondary overflow-hidden">
                  <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(ellipse at 15% 30%, var(--color-brand-accent) 0%, transparent 60%),
                        radial-gradient(ellipse at 85% 70%, var(--color-brand-primary) 0%, transparent 60%)
                      `
                    }}
                  />
                  
                  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Left text block - 7 columns */}
                      <div className="lg:col-span-7 space-y-6">
                        <span className="text-xs font-bold text-brand-accent tracking-widest uppercase bg-brand-accent/10 border border-brand-accent/30 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5 animate-pulse" />
                          MOMEN KUMPUL HARMONIS
                        </span>

                        <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-brand-surface tracking-tighter leading-none">
                          Santap Istimewa Dihangatkan Akustik Syahdu & Lesehan Asri
                        </h2>

                        <p className="text-brand-secondary/80 text-base md:text-lg leading-relaxed max-w-xl">
                          Kami percaya wisata kuliner terbaik adalah penggabungan rasa lezat di lidah, pandangan segar mata memandang kesejukan kolam ikan, serta alunan musik akustik gitar mengiringi kisah canda keluarga Anda. Panggung live music kami hadir gratis bagi semua pelanggan setia.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                          <button
                            onClick={handleOpenBooking}
                            className="bg-brand-accent hover:bg-brand-surface hover:text-brand-dark text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-brand-accent/20 cursor-pointer"
                          >
                            Booking Lesehan Sejuk
                          </button>
                          <button
                            onClick={() => setCurrentPage('menu')}
                            className="group border border-brand-secondary/30 hover:border-brand-accent p-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-brand-secondary/80 hover:text-white cursor-pointer"
                          >
                            Lihat E-Menu Lengkap
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 duration-200" />
                          </button>
                        </div>
                      </div>

                      {/* Right Media Bleeding outside its container */}
                      <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
                        <div className="absolute inset-0 bg-brand-primary/20 rounded-[3rem] -rotate-3 scale-95" />
                        
                        <div 
                          className="relative w-full max-w-md aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-brand-primary"
                          style={{
                            clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)"
                          }}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop&q=80"
                            alt="Panggung hiburan live musik Warung Papatong"
                            className="w-full h-full object-cover select-none scale-102 hover:scale-108 transition-all duration-600"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-brand-dark/20 pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* Additional Process Alur Pemesanan */}
                <ProcessSteps />

                {/* SECTION 5: Quick Contact & Local SEO Map */}
                <LocationContact />

                {/* SECTION 6: Social Proof (Testimonial Slider) */}
                <Testimonials />

                {/* Section FAQs Collapsible Accordions */}
                <FaqAccordion />
              </>
            )}

            {currentPage === 'menu' && (
              <>
                <DynamicSEO 
                  pagePath="/menu" 
                  pageTitle="E-Menu Digital & Galeri Produk" 
                  pageDescription="Temukan hingga 25 menu andalan kami, mulai dari seafood olahan kepiting saus Padang, gurame bakar madu, ayam goreng Priangan hingga bandrek susu hangat." 
                />
                
                {/* Premium Menu Banner */}
                <section className="bg-brand-dark py-16 md:py-20 text-brand-secondary relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(var(--color-brand-primary) 1px, transparent 1px)`,
                      backgroundSize: '24px 24px'
                    }}
                  />
                  <div className="w-full max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="text-xs font-bold text-brand-accent tracking-widest uppercase bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full gap-1.5 inline-flex items-center">
                      <Utensils className="w-3 h-3" />
                      E-MENU DIGITAL & INTERAKTIF
                    </span>
                    <h1 className="font-display font-black text-3xl md:text-5xl text-brand-surface tracking-tighter mt-4">
                      Sajian Istimewa Warung Papatong
                    </h1>
                    <p className="max-w-xl mx-auto text-sm md:text-base text-brand-secondary/80 mt-3">
                      Eksplorasi hingga 25 menu hidangan legendaris terfavorit keluarga. Lakukan pre-order secara instan untuk mempersingkat waktu tunggu meja sesampainya di resto.
                    </p>
                  </div>
                </section>

                <MenuSection
                  basket={basket}
                  onAddToBasket={handleAddToBasket}
                  onRemoveFromBasket={handleRemoveFromBasket}
                  onOpenBooking={handleOpenBooking}
                />
              </>
            )}

            {currentPage === 'venue' && (
              <>
                <DynamicSEO 
                  pagePath="/venue" 
                  pageTitle="Galeri & Suasana Warung Papatong" 
                  pageDescription="Telusuri keasrian area saung lesehan semi-outdoor di atas air, panggung pertunjukan live music akustik harian, serta aktivitas makan bersama rombongan." 
                />
                
                <GallerySection />
              </>
            )}

            {currentPage === 'tentang' && (
              <>
                <DynamicSEO 
                  pagePath="/tentang" 
                  pageTitle="Kisah Kami & Profil owner" 
                  pageDescription="Kenali sejarah berdirinya Warung Papatong sejak 2018 dan kenali tim dapur, head chef, serta banquet managers yang melayani santap rombongan Anda." 
                />
                
                {/* Narrative Stories AboutUs */}
                <AboutUs />

                {/* Section tim atau profil owner */}
                <TeamSection />

                {/* Operational Contacts details again */}
                <LocationContact />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Sticky Footer Component */}
      <Footer />

      {/* Persistent Floating WhatsApp with pulsing effect */}
      <FloatingWA />

      {/* Interactive Booking & Pre-Order Widget Dialog Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <InteractiveBooking
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
            basket={basket}
            onAddToBasket={handleAddToBasket}
            onRemoveFromBasket={handleRemoveFromBasket}
            onClearBasket={handleClearBasket}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
