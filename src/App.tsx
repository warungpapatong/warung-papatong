/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, TreeDeciduous, Star, ChevronRight, Compass } from 'lucide-react';
import { Product } from './types';

// Importing Custom Modular components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import AboutUs from './components/AboutUs';
import MenuSection from './components/MenuSection';
import InteractiveBooking from './components/InteractiveBooking';
import Testimonials from './components/Testimonials';
import ProcessSteps from './components/ProcessSteps';
import FaqAccordion from './components/FaqAccordion';
import LocationContact from './components/LocationContact';
import FloatingWA from './components/FloatingWA';
import Footer from './components/Footer';

export default function App() {
  // Global basket state: mapping product IDs to quantity count
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
    // Accessibility improvement - block body scroll
    document.body.style.overflow = 'hidden';
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
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Container */}
      <main>
        {/* Section 1: Hero Block */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Section 2: Reputasi / Stats Block */}
        <StatsSection />

        {/* Section 3: Tentang Kami Stories Narrative */}
        <AboutUs />

        {/* Section 4: Tabbed Menu Grid Block (Magazine Style) */}
        <MenuSection
          basket={basket}
          onAddToBasket={handleAddToBasket}
          onRemoveFromBasket={handleRemoveFromBasket}
          onOpenBooking={handleOpenBooking}
        />

        {/* ADVANCED VISUAL FEATURE: Full-Bleed Cinematic Showcase 
            This section breaks the grid entirely. It uses a deeply saturated Dark Forest background, 
            unexpected overlapping typography, and atmospheric garden illustrations. */}
        <section className="relative py-24 md:py-32 bg-brand-dark text-brand-secondary overflow-hidden">
          {/* Subtle glowing mesh overlays */}
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
                    className="bg-brand-accent hover:bg-brand-surface hover:text-brand-dark text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-brand-accent/20"
                  >
                    Booking Meja Dekat Panggung
                  </button>
                  <a
                    href="#faq"
                    className="group border border-brand-secondary/30 hover:border-brand-accent p-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-brand-secondary/80 hover:text-white"
                  >
                    Tanya Prosedur Live Acara
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 duration-200" />
                  </a>
                </div>
              </div>

              {/* Right Media Bleeding outside its container - 5 columns */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
                {/* Visual mesh backing */}
                <div className="absolute inset-0 bg-brand-primary/20 rounded-[3rem] -rotate-3 scale-95" />
                
                <div 
                  className="relative w-full max-w-md aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-brand-primary"
                  style={{
                    clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" // Parallelogram asymmetrical composition as requested 
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop&q=80"
                    alt="Panggung hiburan live musik Warung Papatong"
                    className="w-full h-full object-cover select-none scale-102 hover:scale-108 transition-all duration-600"
                    loading="lazy"
                  />
                  {/* Subtle translucent dark mask */}
                  <div className="absolute inset-0 bg-brand-dark/20 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 5: Numbered Process Alur Pemesanan */}
        <ProcessSteps />

        {/* Section 6: Testimoni Mosaic Grid */}
        <Testimonials />

        {/* Section 7: FAQs FAQ Collapsible Accordions */}
        <FaqAccordion />

        {/* Section 8: Google Maps Map & Operasional Kontak Details */}
        <LocationContact />
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
