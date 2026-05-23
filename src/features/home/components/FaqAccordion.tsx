import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FAQS_DATA, BUSINESS_INFO } from '@/data';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section
      id="faq"
      className="py-20 md:py-24 bg-brand-secondary/30 border-t border-b border-brand-border/40 relative font-medium"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-brand-primary tracking-widest uppercase mb-2">
            PERTANYAAN UMUM (FAQ)
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none mb-4">
            Ragu Terkait Rencana Acara Rombongan Anda?
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto rounded-full mb-6" />
          <p className="text-brand-text/80 text-xs sm:text-sm md:text-base leading-relaxed">
            Berikut rangkuman hal-hal krusial yang paling sering ditanyakan oleh koordinator reuni, sekretaris dinas, dan pengelola arisan keluarga besar sebelum melakukan pemesanan tempat di Warung Papatong Cibinong.
          </p>
        </div>

        {/* Center-aligned Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-[1.75rem] overflow-hidden transition-all duration-300 bg-brand-surface ${
                  isOpen
                    ? 'border-brand-primary shadow-md shadow-brand-primary/5'
                    : 'border-brand-border/60 hover:border-brand-primary/30'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
                  aria-label="Tampilkan detil jawaban"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-black text-xs sm:text-sm md:text-base text-brand-dark pr-4">
                    {item.question}
                  </span>
                  <span className={`p-1.5 rounded-full transition-transform duration-300 bg-brand-primary/5 text-brand-primary shrink-0 ${
                    isOpen ? 'rotate-180 bg-brand-primary text-brand-secondary' : 'rotate-0'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 border-t border-brand-border/30 text-brand-text/90 text-xs sm:text-xs md:text-sm leading-relaxed bg-brand-secondary/15 border-l-4 border-brand-accent pr-8 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Centered CTA Callout Box */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-brand-primary p-6 md:p-8 rounded-[2rem] text-brand-dark border border-brand-primary/20 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl" />
            
            <div className="text-center md:text-left space-y-2">
              <h3 className="font-display font-black text-base md:text-lg text-brand-dark">Jawaban Belum Menjawab?</h3>
              <p className="text-xs text-brand-dark/95 leading-relaxed max-w-md">
                Punya request istimewa, jumlah rombongan sangat besar, atau butuh bantuan dekorasi khusus? Hubungi admin resmi kami via WhatsApp.
              </p>
            </div>
            
            <a
              href={`https://wa.me/${BUSINESS_INFO.wa}?text=Halo%20Admin%20Warung%20Papatong%2C%20saya%20ingin%20bertanya%20terkait%20acara%20rombongan%20kami...`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-neutral-900 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Chat Langsung Sekarang
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
