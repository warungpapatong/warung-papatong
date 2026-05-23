import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, Heart, Coffee, Leaf, Music, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '@/data';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const slideLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tentang"
      ref={ref}
      className="py-20 md:py-24 bg-brand-secondary/30 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Beautiful Asymmetric Image Bleeding Outside Container */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
            
            {/* Organic decorative background card */}
            <div className="absolute inset-0 bg-brand-primary rounded-[2rem] rotate-3 transform scale-95 translate-x-2 translate-y-2 -z-10 shadow-lg" />
            
            {/* The main picture with negative margin and polygon clip as bleed element */}
            <div 
              className="relative overflow-hidden rounded-[2rem] shadow-2xl border-4 border-brand-surface"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=900&fit=crop&q=85"
                alt="Area Saung Lesehan Kayu Alam Sunda Warung Papatong"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-750"
              />
              
              {/* Overlap tag bleeding off edge */}
              <div className="absolute top-6 right-6 bg-brand-accent text-white font-bold text-xs py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '4s' }}>
                <Sparkles className="w-3" />
                Sejuk & Rindang
              </div>
            </div>
          </div>

          {/* Right: Narrative Story Block */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.p
              variants={slideLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-xs font-bold text-brand-primary tracking-widest uppercase mb-2"
            >
              WARISAN RASA SUNDA & SEAFOOD
            </motion.p>
            
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-display font-bold text-3xl md:text-5xl text-brand-dark tracking-tight leading-none mb-6"
            >
              Kisah Kehangatan di bawah Saung Papatong, Cibinong
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 text-brand-text/90 leading-relaxed text-base md:text-lg mb-8 max-w-2xl"
            >
              <p>
                Didirikan dengan kecintaan mendalam pada pusaka kuliner Parahyangan, <span className="font-bold text-brand-dark">Warung Papatong</span> mengawinkan kelembutan timbel tradisional dengan gairah kuliner seafood segar yang diolah secara langsung pasca-tangkapan kolam. 
              </p>
              <p>
                Nama <span className="italic font-display font-medium text-brand-primary">Papatong</span> (artinya capung dalam Bahasa Sunda) dipilih sebagai cerminan harmoni dengan alam terbuka. Di sini, pengunjung tidak hanya bersantap makanan, melainkan mengikat silaturahmi di atas saung terapung yang gemercik airnya menenangkan jiwa, ditemani syahdunya petikan musik akustik secara live.
              </p>
            </motion.div>

            {/* 3 Interactive Feature Rows (Lucide Icon + title + 1-desc) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8 border-t border-brand-border/60 pt-8">
              <div className="flex flex-col gap-2">
                <div className="text-brand-accent">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-brand-dark">100% Seafood Hidup</h4>
                <p className="text-xs text-brand-text/80 leading-relaxed">Kepiting, udang, dan gurame dipelihara di akuarium hidup sebelum dimasak langsung.</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-brand-primary">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-brand-dark">Bumbu Ulekan Asli</h4>
                <p className="text-xs text-brand-text/80 leading-relaxed">Rempah bumbu kuning & sambal diciprat ulekan cobek langsung tanpa blender mesin.</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-brand-accent">
                  <Music className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-brand-dark">Kapasitas 200+ Kursi</h4>
                <p className="text-xs text-brand-text/80 leading-relaxed font-sans">Sangat melegakan untuk gathering kantor & parkiran bus rombongan aman terkendali.</p>
              </div>
            </div>

            {/* Founder Quote in elegant serif */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="border-l-4 border-brand-accent pl-4 py-1 italic font-display text-brand-dark/95 text-base md:text-lg bg-brand-accent/5 rounded-r-xl pr-6 max-w-xl"
            >
              &ldquo;Bagi kami, kebahagiaan paling murni adalah ketika melihat sebuah keluarga besar duduk mengitari saung lesehan, tertawa lepas sembari berebut kepiting saus Padang di bawah naungan angin sewayup Papatong.&rdquo;
              <span className="block not-italic font-sans font-bold text-xs text-brand-accent tracking-wider uppercase mt-2">
                — Keluarga Besar Pengelola Warung Papatong
              </span>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
