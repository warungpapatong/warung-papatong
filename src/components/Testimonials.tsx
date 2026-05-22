import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const firstTestimonial = TESTIMONIALS_DATA[0];
  const supportingTestimonials = TESTIMONIALS_DATA.slice(1);

  return (
    <section
      id="ulasan"
      ref={ref}
      className="py-20 md:py-24 bg-brand-secondary/40 relative overflow-hidden"
    >
      {/* Decorative Oversized Ghost Section Text */}
      <span className="absolute top-4 left-6 text-[10rem] md:text-[14rem] font-black opacity-[0.03] select-none pointer-events-none font-display text-brand-dark leading-none">
        GOOGLE
      </span>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Grid */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2">
            SUARA KONSUMEN AUTENTIK
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-dark tracking-tight">
            Ulasan Kejujuran dari 4.076+ Keluarga di Google Maps
          </h2>
          <p className="text-brand-text/80 text-base md:text-lg mt-4 leading-relaxed">
            Kepuasan rasa makan tengah keluarga adalah misi utama kami. Simak apa yang dikatakan pelanggan setia kami setelah mengunjungi saung lesehan dan menikmati menu Seafood Warung Papatong Cibinong.
          </p>
        </div>

        {/* Asymmetric Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (Wide) - 7 Columns of Spacing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 bg-brand-primary p-8 md:p-10 rounded-[2.5rem] text-brand-secondary flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              {/* Rating Star Row */}
              <div className="flex items-center gap-1 text-brand-accent mb-6">
                {[...Array(firstTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5.5 h-5.5 fill-brand-accent text-brand-accent" />
                ))}
              </div>

              {/* Big Quote Block in display styling */}
              <Quote className="w-12 h-12 text-brand-accent opacity-30 mb-4" />
              <p className="font-display italic text-lg md:text-2xl leading-relaxed text-brand-secondary/95 mb-8">
                &ldquo;{firstTestimonial.review}&rdquo;
              </p>
            </div>

            {/* Profile Row */}
            <div className="flex items-center gap-4 border-t border-brand-secondary/15 pt-6">
              <img
                src={firstTestimonial.avatar}
                alt={firstTestimonial.name}
                loading="lazy"
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-accent"
              />
              <div>
                <h4 className="font-display font-bold text-base md:text-lg text-brand-surface leading-none">
                  {firstTestimonial.name}
                </h4>
                <p className="text-xs text-brand-secondary/70 mt-1">
                  Pengunjung dari {firstTestimonial.city}
                </p>
                {firstTestimonial.product && (
                  <span className="inline-block bg-brand-accent/20 text-brand-accent text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mt-2.5">
                    Menu Terpilih: {firstTestimonial.product}
                  </span>
                )}
              </div>
            </div>

          </motion.div>

          {/* Right Column (Stacked Short Cards) - 5 Columns of Spacing with varied background colors */}
          <div className="lg:col-span-1 lg:col-span-5 flex flex-col gap-6 justify-between">
            {supportingTestimonials.map((review, index) => {
              // Alternating color backgrounds for spatial composition rhythm
              const bgClass = index === 0 
                ? 'bg-brand-surface border border-brand-border/60 text-brand-text shadow-md' 
                : 'bg-brand-secondary/50 border border-brand-primary/15 text-brand-dark';

              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.15, ease: "easeOut" }}
                  className={`p-6 md:p-8 rounded-[2rem] flex flex-col justify-between h-1/2 ${bgClass}`}
                >
                  <div>
                    {/* Rating star */}
                    <div className="flex items-center gap-0.5 text-brand-accent mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-brand-accent text-brand-accent" />
                      ))}
                    </div>
                    
                    <p className="text-sm md:text-base leading-relaxed text-brand-dark/90 italic mb-6 line-clamp-4">
                      &ldquo;{review.review}&rdquo;
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 border-t border-brand-border/40 pt-4 mt-auto">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-brand-dark leading-none">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-brand-text/60 mt-0.5">
                        Warga {review.city}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
