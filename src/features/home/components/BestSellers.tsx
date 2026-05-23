import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS_DATA, formatPrice } from '@/data';
import { ArrowRight, Star, Flame, Clock, RefreshCw } from 'lucide-react';

interface BestSellersProps {
  onNavigateToMenu: () => void;
}

export default function BestSellers({ onNavigateToMenu }: BestSellersProps) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [minutesRemaining, setMinutesRemaining] = useState(60 - new Date().getMinutes());

  // Dynamically update states every minute to keep rotation and countdown alive
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setMinutesRemaining(60 - now.getMinutes());
    }, 1000 * 30); // check status every 30 seconds

    return () => clearInterval(timer);
  }, []);

  // Generate 3 unique, staggered, diverse dishes corresponding to the active hour
  const getDynamicDishes = () => {
    const totalProducts = PRODUCTS_DATA.length;
    if (totalProducts === 0) return [];

    // Base offset rotates by the current hour to ensure a fully sequential rotation cycle
    const baseOffset = currentHour % totalProducts;

    const dishes = [];
    // We select 3 dishes. Stagger offsets by different intervals to ensure high category variety
    // (e.g. Seafood, Veggies, Packages, Drinks) rather than 3 adjacent menu items.
    const staggerOffsets = [0, 5, 11];

    staggerOffsets.forEach((stagger) => {
      const targetIndex = (baseOffset + stagger) % totalProducts;
      const selectedDish = PRODUCTS_DATA[targetIndex];
      // Prevent absolute duplicate ids if the array is extremely short (fallback protection)
      if (!dishes.some(d => d.id === selectedDish.id)) {
        dishes.push(selectedDish);
      }
    });

    // In case staggered logic returned less than 3 due to array size, fill with sequentially adjacent items
    let fallbackIndex = 0;
    while (dishes.length < Math.min(3, totalProducts)) {
      const selectedDish = PRODUCTS_DATA[(baseOffset + fallbackIndex) % totalProducts];
      if (!dishes.some(d => d.id === selectedDish.id)) {
        dishes.push(selectedDish);
      }
      fallbackIndex++;
    }

    return dishes;
  };

  const dynamicDishes = getDynamicDishes();

  // Informative start and end timing
  const startHourFormatted = currentHour.toString().padStart(2, '0');
  const endHourFormatted = ((currentHour + 1) % 24).toString().padStart(2, '0');

  return (
    <section id="best-sellers" className="py-24 bg-brand-secondary border-t border-brand-border/20 relative overflow-hidden">
      {/* Dynamic Background subtle blur effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-brand-primary tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-brand-accent animate-bounce" />
              MENU PRIMADONA TERLARIS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-dark tracking-tighter leading-none">
              Menu Terpopuler Rekomendasi Hari Ini
            </h2>
            <p className="text-sm md:text-base text-brand-text/80 leading-relaxed">
              Daftar resep rahasia paling dicari penikmat kuliner di Jabodetabek. Diramu menggunakan resep autentik dapur legendaris Warung Papatong sejak 2018.
            </p>
          </div>

          <button
            onClick={onNavigateToMenu}
            className="mt-6 md:mt-0 group flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors py-3.5 px-6 rounded-full border border-brand-primary/30 hover:border-brand-accent bg-brand-surface cursor-pointer shadow-sm hover:shadow-md"
          >
            Sajian E-Menu Selengkapnya
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-200" />
          </button>
        </div>

        {/* Framer-Motion Animated 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {dynamicDishes.map((dish, idx) => (
              <motion.div
                key={`${dish.id}-${currentHour}`}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                layout
                className="group bg-brand-surface rounded-[2rem] overflow-hidden border border-brand-border/30 hover:border-brand-primary/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between w-full h-[470px] sm:h-[490px] md:h-[520px] lg:h-[490px] xl:h-[470px]"
              >
                {/* Card Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Left Badge */}
                  {dish.badge && (
                    <span className="absolute top-4 left-4 bg-brand-accent text-[#FFF] hover:text-brand-dark hover:bg-white text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {dish.badge}
                    </span>
                  )}

                  {/* Price tag absolute bottom right */}
                  <span className="absolute bottom-4 right-4 bg-brand-secondary/90 backdrop-blur-md text-brand-accent font-mono font-black text-xs px-3.5 py-1.5 rounded-xl border border-brand-border/40">
                    {formatPrice(dish.price)}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold">
                      {dish.categoryLabel}
                    </span>
                    <h3 className="font-display font-black text-lg md:text-xl text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-text/70 line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/20 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-brand-text/40">
                      Bahan Segar Pilihan
                    </span>
                    <button
                      onClick={onNavigateToMenu}
                      className="text-xs font-mono font-extrabold text-brand-primary group-hover:text-brand-accent flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Detail & Pesan
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.8 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
