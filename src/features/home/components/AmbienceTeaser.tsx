import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Sparkles, Navigation } from 'lucide-react';
import { AMBIENCE_TEASER_DATA } from '@/data';

interface AmbienceTeaserProps {
  onNavigateToGallery: () => void;
}

export default function AmbienceTeaser({ onNavigateToGallery }: AmbienceTeaserProps) {
  const images = AMBIENCE_TEASER_DATA;

  return (
    <section id="ambience-teaser" className="py-24 bg-brand-surface border-t border-brand-border/20 relative overflow-hidden">
      
      {/* Decorative Blur Background circles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split screen Layout: Left Text / Right Images layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-accent" />
              SUASANA & LINGKUNGAN
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-dark tracking-tighter leading-tight">
              Oase Kesejukan Alami di Tengah GOR Pemda
            </h2>

            <p className="text-brand-text/95 text-sm md:text-base leading-relaxed">
              Warung Papatong dirancang khusus memanjakan seluruh pancaindra keluarga Anda. Nikmati perpaduan asri antara saung bilik bambu tradisional, lanskap taman asri, kolam ikan koi segar, hingga semilir angin sejuk yang menyegarkan dahaga kehidupan urban.
            </p>

            <div className="pt-4">
              <button
                onClick={onNavigateToGallery}
                className="group inline-flex items-center gap-3 bg-brand-primary hover:bg-brand-accent text-brand-dark font-extrabold text-sm py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Tampilkan Galeri Foto Resto
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
              </button>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative h-96 overflow-hidden rounded-[2.5rem] border border-brand-border/40 hover:border-brand-primary/30 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-6 bg-brand-secondary"
              >
                {/* Background image zoom on hover */}
                <img
                  src={img.url}
                  alt={img.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 select-none"
                  loading="lazy"
                />
                
                {/* Vertical Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/90 via-brand-secondary/40 to-transparent transition-opacity duration-300 group-hover:via-brand-secondary/50" />

                {/* Info Text */}
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#10B981] uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    WARUNG PAPATONG
                  </span>
                  <h3 className="font-display font-black text-lg text-brand-dark leading-tight">
                    {img.caption}
                  </h3>
                  <p className="text-[11px] text-brand-text/80 leading-snug transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {img.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
