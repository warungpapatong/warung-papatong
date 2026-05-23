import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HelpCircle, Calendar, Utensils, MessageSquare, Sparkles } from 'lucide-react';
import { STEPS_DATA } from '@/data';

const STEP_ICONS = [Calendar, Utensils, MessageSquare, Sparkles];

export default function ProcessSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="proses"
      ref={ref}
      className="py-20 md:py-24 bg-brand-surface relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-xs font-bold text-brand-primary tracking-widest uppercase mb-2">
            ALUR MAKAN TENGAH PRAKTIS
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-dark tracking-tight">
            Bagaimana Cara Memotong Antrean & Booking Lesehan?
          </h2>
          <p className="text-brand-text/80 text-base md:text-lg mt-4 leading-relaxed">
            Hanya butuh 4 langkah mudah demi menjamin kenyamanan santap keluarga besar Anda. Kami memastikan meja telah tertata bersih dan hidangan hangat tersaji dalam 10 menit saat Anda tiba!
          </p>
        </div>

        {/* Alternating vertical list of steps on desktop */}
        <div className="relative space-y-12 md:space-y-24 max-w-5xl mx-auto">
          {/* Vertical Center Indicator line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-brand-primary/10 -translate-x-1/2 hidden md:block" />

          {STEPS_DATA.map((step, index) => {
            const IconComponent = STEP_ICONS[index] || HelpCircle;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                className={`relative flex flex-col md:flex-row items-stretch ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center marker ring */}
                <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-10 h-10 bg-brand-primary border-4 border-brand-surface rounded-full flex items-center justify-center text-brand-secondary text-xs font-black z-20 shadow-md">
                  {step.id}
                </div>

                {/* Left empty panel on desktop / placeholder for alignment */}
                <div className="w-full md:w-1/2 hidden md:block" />

                {/* Content Panel (alternating layout) */}
                <div className="w-full md:w-1/2 pl-12 md:pl-12 md:pr-12">
                  <div className="relative bg-brand-secondary/40 p-8 rounded-3xl border border-brand-border/50 hover:border-brand-primary/20 transition-all duration-300 shadow-xs hover:shadow-md overflow-hidden group">
                    
                    {/* Oversized backdrop number */}
                    <span className="absolute -bottom-8 -right-4 text-[9rem] font-display font-black text-brand-primary/5 select-none pointer-events-none leading-none group-hover:scale-105 duration-500 transition-transform">
                      0{step.id}
                    </span>

                    {/* Step Icon */}
                    <div className="bg-brand-primary p-3 rounded-2xl text-brand-secondary w-fit mb-6 shadow-md shadow-brand-primary/10">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-bold text-xl md:text-2xl text-brand-dark mb-3">
                      {step.title}
                    </h3>

                    <p className="text-brand-text/80 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
