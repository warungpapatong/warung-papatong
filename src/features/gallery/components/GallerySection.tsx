import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X, Heart, MessageCircle, Instagram, Sparkles, Compass } from 'lucide-react';
import { GALLERY_DATA, INSTAGRAM_FEEDS_DATA } from '@/data';
import { GalleryItem } from '@/types';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'semua' | 'suasana' | 'aktivitas'>('semua');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Filter logic based on tab selection
  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeTab === 'semua') return true;
    if (activeTab === 'suasana') return item.category === 'tempat';
    if (activeTab === 'aktivitas') return item.category === 'makanan' || item.category === 'live-music';
    return true;
  });

  return (
    <div className="bg-brand-secondary text-brand-dark min-h-screen py-10">
      
      {/* SECTION 1: Inner Page Banner */}
      <section className="relative bg-brand-surface text-brand-secondary py-16 md:py-24 overflow-hidden border-b border-brand-border/20">
        <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            VISUAL PORTFOLIO
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl text-brand-dark tracking-tighter mt-4 leading-none">
            Galeri & Suasana Warung Papatong
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-brand-text/80 mt-4 leading-relaxed">
            Menyelami kenyamanan saung lesehan kami di atas air kolam sejuk, kemeriahan panggung musik akustik, serta kelezatan sajian Sunda legendaris secara visual sebelum Anda berkunjung.
          </p>
        </div>
      </section>

      {/* SECTION 2: Category Filter Tabs & Masonry Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: 'semua', label: 'Semua Koleksi' },
            { id: 'suasana', label: 'Suasana Resto & Lesehan' },
            { id: 'aktivitas', label: 'Aktivitas & Hidangan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-6 py-3 text-xs md:text-sm font-bold rounded-full transition-all duration-300 transform cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-brand-dark border-transparent shadow-lg shadow-brand-primary/10 scale-102'
                  : 'bg-brand-surface text-brand-text/90 border-brand-border/30 hover:bg-brand-primary/5 hover:text-brand-dark hover:border-brand-primary/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry/Grid Photos */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Custom span based on index/type to emulate masonry look beautifully
              let colSpan = 'col-span-1';
              if (item.size === 'large' && index % 3 === 0) colSpan = 'sm:col-span-2 lg:col-span-2 row-span-1';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-[2rem] bg-brand-surface border border-brand-border/30 hover:border-brand-primary/30 shadow-md hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-300 aspect-[4/3] ${colSpan}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  
                  {/* Subtle Elegant Hover Overlay with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/90 via-brand-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase font-black flex items-center gap-1 mb-1.5">
                      <Sparkles className="w-3 h-3 text-brand-accent h-3 w-3" />
                      {item.category.replace('-', ' ')}
                    </span>
                    <p className="text-brand-dark font-display font-bold text-sm md:text-base leading-snug">
                      {item.alt}
                    </p>
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="mt-4 flex items-center gap-1.5 self-start text-[10px] font-mono bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold px-3 py-1.5 rounded-lg transition-transform hover:scale-103 duration-200 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Perbesar
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECTION 3: Social Stream Placeholder (Instagram Aesthetic Mock Showcase) */}
      <section className="bg-brand-surface border-t border-brand-border/20 py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 text-brand-accent" />
              KONEKSI SOSIAL MEDIA
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tighter mt-4 leading-none">
              Ikuti Kami di @restowarungpapatong
            </h2>
            <p className="text-sm md:text-base text-brand-text/80 mt-4 leading-relaxed">
              Dapatkan info promo spesial katering, diskon rombongan dinas pemburu kuliner Sunda, hingga jadwal pertunjukan bintang tamu di live music kami harian.
            </p>
          </div>

          {/* Styled instagram grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {INSTAGRAM_FEEDS_DATA.map((feed) => (
              <a
                key={feed.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-secondary border border-brand-border/40 block"
              >
                <img
                  src={feed.img}
                  alt={`Mock Instagram feed ${feed.id}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Instagram Hover Icons */}
                <div className="absolute inset-0 bg-brand-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-brand-dark">
                  <div className="flex items-center gap-1">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <span className="font-mono font-bold text-sm text-brand-dark">{feed.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5 text-brand-accent fill-brand-accent" />
                    <span className="font-mono font-bold text-sm text-brand-dark">{feed.comments}</span>
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
              className="inline-flex items-center gap-2 bg-brand-primary text-brand-dark hover:bg-brand-accent font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-103 duration-300"
            >
              <Instagram className="w-4 h-4" />
              Gabung Komunitas Instagram
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-secondary/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative max-w-4xl w-full bg-brand-surface rounded-[2rem] overflow-hidden border border-brand-border/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-brand-secondary/60 hover:bg-brand-primary text-brand-dark p-2.5 rounded-full transition-colors z-10 cursor-pointer"
                aria-label="Tutup Galeri"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:flex">
                <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:max-h-[70vh] bg-neutral-950 flex items-center">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-brand-surface border-t md:border-t-0 md:border-l border-brand-border/40">
                  <div>
                    <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase font-black bg-brand-accent/10 border border-brand-accent/20 px-2.5 py-1 rounded-lg inline-block mb-4">
                      {selectedImage.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-display font-black text-2xl text-brand-dark leading-tight tracking-tight">
                      Detail Galeri Foto
                    </h3>
                    <p className="text-sm text-brand-text/90 mt-4 leading-relaxed">
                      {selectedImage.alt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-brand-border/20 mt-6 flex justify-between items-center">
                    <div className="text-[10px] font-mono text-brand-text/50">
                      EST. 2018 | WARUNG PAPATONG
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="text-xs font-mono font-bold text-brand-primary hover:text-brand-accent cursor-pointer"
                    >
                      Kembali ke Koleksi
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
