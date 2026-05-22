import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, MessageSquareCode, Clock, MapPin, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Hero({ onOpenBooking }: HeroProps) {
  const { scrollY } = useScroll();
  // Parallax transform for Hero Background Image
  const imageY = useTransform(scrollY, [0, 800], [0, 120]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleLearnMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineText = "Lezatnya Seafood Segar Berpadu Wanginya Nasi Timbel Sunda Autentik";

  return (
    <section
      id="beranda"
      className="relative min-h-screen pt-24 lg:pt-28 pb-16 overflow-hidden flex items-center bg-brand-secondary selection:bg-brand-primary selection:text-brand-secondary"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(31, 78, 61, 0.04) 0%, transparent 45%),
          radial-gradient(circle at 90% 80%, rgba(230, 108, 55, 0.04) 0%, transparent 45%),
          var(--color-brand-secondary)
        `
      }}
    >
      {/* Absolute Decorative Ghost Text */}
      <span className="absolute top-10 right-0 text-[10rem] md:text-[18rem] font-black opacity-[0.02] select-none pointer-events-none leading-none font-display text-brand-primary">
        PAPATONG
      </span>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Block - 55% Stacked Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Pill Eyebrow Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-bold tracking-wider uppercase mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-spin" style={{ animationDuration: '3s' }} />
              <span>✦ Kuliner Sunda & Seafood No. 1 Cibinong</span>
            </motion.div>

            {/* Word-by-Word Title Reveal */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-[1.05] mb-5">
              {headlineText.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.2em] relative"
                  style={{
                    color: i >= 7 && i <= 8 ? 'var(--color-brand-accent)' : undefined
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle description */}
            <motion.p
              variants={itemVariants}
              className="text-brand-text/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Ucapkan selamat tinggal pada mengantre lama & kuota kehabisan makan malam! 
              <span className="font-bold text-brand-dark"> Warung Papatong </span> 
              hadir dengan sistem booking lesehan teratur dan pre-order digital instan untuk rombongan makan Anda.
            </motion.p>

            {/* Dual CTAs Triggers */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button
                onClick={onOpenBooking}
                className="group relative bg-brand-accent hover:bg-brand-primary text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-brand-accent/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Booking Tempat Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={handleLearnMore}
                className="group bg-brand-surface hover:bg-brand-primary/5 text-brand-primary border-2 border-brand-primary/30 hover:border-brand-primary font-bold text-base px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquareCode className="w-5 h-5 text-brand-primary" />
                Lihat Daftar E-Menu
              </button>
            </motion.div>

            {/* Structured Trust Signal Row (3 Items with SVG Icons) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 border-t border-brand-border/60 pt-8 w-full max-w-lg"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 text-brand-accent">
                  <Star className="w-4 h-4 fill-brand-accent" />
                  <span className="font-display font-black text-xl text-brand-dark">4.8</span>
                </div>
                <span className="text-xs text-brand-text/70 mt-1">4K+ Ulasan Maps</span>
              </div>

              <div className="flex flex-col items-start border-l border-brand-border/60 pl-4">
                <div className="flex items-center gap-1 text-brand-primary">
                  <Clock className="w-4 h-4" />
                  <span className="font-display font-black text-xl text-brand-dark">Setiap Hari</span>
                </div>
                <span className="text-xs text-brand-text/70 mt-1">11:00 - 22:00 WIB</span>
              </div>

              <div className="flex flex-col items-start border-l border-brand-border/60 pl-4">
                <div className="flex items-center gap-1 text-brand-primary">
                  <MapPin className="w-4 h-4" />
                  <span className="font-display font-black text-xl text-brand-dark">Cibinong</span>
                </div>
                <span className="text-xs text-brand-text/70 mt-1">Exit Toll Sentul</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Block - 45% Parallax Image Container */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Background design accents */}
            <div className="absolute inset-0 bg-brand-primary/10 rounded-[3rem] rotate-3 transform scale-95 -z-10" />
            <div className="absolute inset-0 bg-brand-accent/5 rounded-[3rem] -rotate-3 transform -z-10" />
            
            {/* Hero Main Image */}
            <div 
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-dark/20 border-4 border-brand-surface"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)"
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&h=1100&fit=crop&q=85"
                alt="Seafood Saus Padang Istimewa Warung Papatong"
                loading="eager"
                fetchPriority="high"
                style={{ y: imageY }}
                className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay atop image */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlapping Info Tag inside image */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl shadow-lg border border-white/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">Spesial Hari Ini</p>
                    <h3 className="font-display font-bold text-lg text-brand-dark mt-0.5">Kepiting Saus Padang Jumbo</h3>
                  </div>
                  <div className="bg-brand-primary text-brand-secondary text-xs font-bold px-3 py-1.5 rounded-full">
                    Rp 135k
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Stock Status Board Card */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
              className="absolute -top-6 right-2 sm:-right-6 glass-panel-dark p-4 rounded-2xl shadow-xl border border-brand-primary/30 flex items-center gap-3 backdrop-blur-md max-w-[210px]"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-[10px] font-bold text-brand-secondary/70 uppercase tracking-widest leading-none">Dapur Aktif</p>
                <p className="font-sans text-xs font-bold text-brand-secondary mt-1">Semua Menu Seafood Lengkap Terjaga</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Thin elegant diagonal separator at the bottom transitioning to Google stats review section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,80 L1440,0 L1440,80 Z" fill="var(--color-brand-surface)" />
        </svg>
      </div>
    </section>
  );
}
