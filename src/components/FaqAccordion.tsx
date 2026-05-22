import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare, ExternalLink } from 'lucide-react';
import { FAQS_DATA, BUSINESS_INFO } from '../data';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section
      id="faq"
      className="py-20 md:py-24 bg-brand-secondary/30 border-t border-b border-brand-border/40 relative"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky Intro Callout) */}
          <div className="lg:col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-xs font-bold text-brand-primary tracking-widest uppercase">
              PERTANYAAN UMUM (FAQ)
            </p>
            
            <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-dark tracking-tight mt-2 leading-tight">
              Punya Ragu Terkait Rencana Rombongan Anda?
            </h2>
            
            <p className="text-brand-text/80 text-sm md:text-base leading-relaxed mt-4">
              Berikut kami rangkum beberapa hal penting yang paling sering ditanyakan oleh koordinator reuni, sekretaris dinas, dan pengelola arisan keluarga besar sebelum berkunjung ke Warung Papatong Cibinong.
            </p>

            <div className="bg-brand-primary p-6 rounded-3xl text-brand-dark mt-8 border border-brand-primary/20 shadow-lg relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl" />
              <h3 className="font-display font-bold text-lg mb-2 text-brand-dark">Jawaban Belum Menjawab?</h3>
              <p className="text-xs text-brand-dark/95 leading-relaxed mb-4">
                Ada kasus istimewa atau permintaan dekorasi ulang tahun dadakan? Hubungi admin resmi kami untuk diskusi santai via chat WhatsApp.
              </p>
              
              <a
                href={`https://wa.me/${BUSINESS_INFO.wa}?text=Halo%20Admin%20Warung%20Papatong%2C%20saya%20ingin%20bertanya%20terkait%20acara%20rombongan%20kami...`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-accent hover:bg-white text-white hover:text-brand-primary font-bold text-xs py-3 px-5 rounded-xl transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Langsung Sekarang
              </a>
            </div>
          </div>

          {/* Right Column (The Collapsible Accordion Grid) */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS_DATA.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl overflow-hidden transition-all duration-350 bg-brand-surface ${
                    isOpen
                      ? 'border-brand-primary shadow-md shadow-brand-primary/5'
                      : 'border-brand-border/60 hover:border-brand-primary/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
                    aria-label="Tampilkan details jawaban"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-medium text-base md:text-lg text-brand-dark pr-4 group-hover:text-brand-primary">
                      {item.question}
                    </span>
                    <span className={`p-1.5 rounded-full transition-transform duration-300 bg-brand-primary/5 text-brand-primary ${
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
                        <div className="px-6 pb-7 md:px-7 md:pb-8 border-t border-brand-border/30 text-brand-text/90 text-sm md:text-base leading-relaxed bg-brand-secondary/15 border-l-4 border-brand-accent pr-10">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
