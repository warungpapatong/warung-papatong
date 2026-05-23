import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive breakpoints matching mobile-first -> tablet -> laptop -> desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(4); // Desktop XL shows 4 cards
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(3); // Laptop LG shows 3 cards
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2); // Tablet MD shows 2 cards
      } else {
        setItemsPerView(1); // Mobile SM/XS shows 1 card
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalReviews = TESTIMONIALS_DATA.length;
  // Maximum index so we do not translate past the end
  const maxIndex = Math.max(0, totalReviews - itemsPerView);

  // Keep index in valid bounds when screen size or itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  // Auto sliding timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0; // Wrap back to first item
        }
        return prev + 1;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section
      id="ulasan"
      className="py-20 md:py-24 bg-brand-secondary/40 relative overflow-hidden font-medium border-t border-b border-brand-border/20"
    >
      {/* Decorative Oversized Ghost Text */}
      <span className="absolute top-4 left-6 text-[8rem] md:text-[14rem] font-black opacity-[0.03] select-none pointer-events-none font-display text-brand-dark leading-none">
        GOOGLE
      </span>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2">
            SUARA KONSUMEN AUTENTIK
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none mb-4">
            Ulasan Kejujuran dari 4.080+ Keluarga di Google Maps
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto rounded-full mb-6" />
          <p className="text-brand-text/80 text-xs sm:text-sm md:text-base leading-relaxed">
            Kepuasan rasa makan keluarga adalah kehormatan bagi kami. Simak penuturan asli dari pelanggan setia setelah berkunjung dan bersantap hangat di saung lesehan Warung Papatong Cibinong.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-8 group px-1 sm:px-8">
          
          {/* Card Viewport Slider */}
          <div className="overflow-hidden py-4 rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{
                // Perfectly accounts for the item width and gap-6 (24px) across all viewports to avoid offset cutting on mobile/tablet
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (24 / itemsPerView)}px))`,
              }}
            >
              {TESTIMONIALS_DATA.map((review) => (
                <div
                  key={review.id}
                  className="shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerView}% - ${(24 * (itemsPerView - 1)) / itemsPerView}px)`,
                  }}
                >
                  {/* Testimonial Card - Perfectly Standardized Sizes across responsive ranges */}
                  <div className="bg-brand-surface border border-brand-border/40 hover:border-brand-primary/30 rounded-[2rem] p-6 shadow-md hover:shadow-xl transition-all duration-300 h-[340px] sm:h-[300px] md:h-[290px] lg:h-[280px] xl:h-[290px] flex flex-col justify-between relative overflow-hidden group/card text-left">
                    <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-24 h-24 bg-brand-primary/5 rounded-full pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />
                    
                    <div>
                      {/* Rating & Large Stylized Quote */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-0.5 text-brand-accent">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-brand-primary/10" />
                      </div>
                      
                      {/* Review text with rigid styling */}
                      <p className="text-xs sm:text-xs md:text-sm leading-relaxed text-brand-text/90 italic line-clamp-5 font-sans">
                        &ldquo;{review.review}&rdquo;
                      </p>
                    </div>

                    {/* Profile line footer details */}
                    <div className="border-t border-brand-border/40 pt-4 flex items-center gap-3 mt-auto">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        loading="lazy"
                        className="w-10 h-10 rounded-full object-cover border border-brand-border shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="font-display font-black text-xs sm:text-xs md:text-sm text-brand-dark truncate leading-none mb-1">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                          <span className="text-[9px] sm:text-[10px] text-brand-text/60 truncate max-w-[90px] sm:max-w-none">
                            {review.city}
                          </span>
                          {review.product && (
                            <>
                              <span className="text-brand-text/30 text-[9px]">|</span>
                              <span className="text-[9px] sm:text-[9px] font-bold text-brand-accent uppercase font-mono tracking-wider truncate max-w-[100px] sm:max-w-none">
                                {review.product}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-brand-surface hover:bg-brand-primary hover:text-white text-brand-dark rounded-full flex items-center justify-center border border-brand-border/70 hover:border-brand-primary shadow-lg transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Ulasan Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-brand-surface hover:bg-brand-primary hover:text-white text-brand-dark rounded-full flex items-center justify-center border border-brand-border/70 hover:border-brand-primary shadow-lg transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Ulasan Selanjutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Indicators / Slide selector */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-border hover:bg-brand-text/40'
              }`}
              aria-label={`Lihat Slide Ke-${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
