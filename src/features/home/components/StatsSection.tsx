import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Heart, MessageSquare, Compass, ExternalLink } from 'lucide-react';
import { STATS_DATA, BUSINESS_INFO } from '@/data';

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // States for animated counters
  const [ratingVal, setRatingVal] = useState(0);
  const [reviewsVal, setReviewsVal] = useState(0);
  const [capacityVal, setCapacityVal] = useState(0);
  const [satisfactionVal, setSatisfactionVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate Rating (0 to 4.8)
      let rCount = 0;
      const rTimer = setInterval(() => {
        rCount += 0.2;
        if (rCount >= 4.8) {
          setRatingVal(4.8);
          clearInterval(rTimer);
        } else {
          setRatingVal(parseFloat(rCount.toFixed(1)));
        }
      }, 50);

      // Animate Reviews (0 to 4076)
      let revCount = 0;
      const revStep = Math.ceil(4000 / 30);
      const revTimer = setInterval(() => {
        revCount += revStep;
        if (revCount >= 4076) {
          setReviewsVal(4076);
          clearInterval(revTimer);
        } else {
          setReviewsVal(revCount);
        }
      }, 40);

      // Animate Capacity (0 to 50)
      let capCount = 0;
      const capTimer = setInterval(() => {
        capCount += 2;
        if (capCount >= 50) {
          setCapacityVal(50);
          clearInterval(capTimer);
        } else {
          setCapacityVal(capCount);
        }
      }, 50);

      // Animate Satisfaction (0 to 98)
      let satCount = 0;
      const satTimer = setInterval(() => {
        satCount += 4;
        if (satCount >= 98) {
          setSatisfactionVal(98);
          clearInterval(satTimer);
        } else {
          setSatisfactionVal(satCount);
        }
      }, 40);

      return () => {
        clearInterval(rTimer);
        clearInterval(revTimer);
        clearInterval(capTimer);
        clearInterval(satTimer);
      };
    }
  }, [isInView]);

  const valueMap = [
    { val: ratingVal.toFixed(1), suffix: "/5 ✔", icon: Compass, label: "Rating Google Maps", desc: "Konsisten tinggi berdasarkan 4.076+ pengakuan rasa nyata." },
    { val: reviewsVal.toLocaleString('id-ID'), suffix: "+", icon: MessageSquare, label: "Ulasan Bintang 5", desc: "Diulas antusias oleh warga Bogor, Jakarta, & food vlogger." },
    { val: capacityVal, suffix: "+ Lesehan", icon: Award, label: "Fasilitas Meja Luas", desc: "Cocok untuk kumpul bapak-bapak, arisan ibu-ibu, reuni akbar." },
    { val: satisfactionVal, suffix: "%", icon: Heart, label: "Pelayanan Sip", desc: "Prameswari pramusaji sigap menjamin hidangan terhidang segar." }
  ];

  return (
    <section
      id="brand-proof"
      ref={containerRef}
      className="py-16 md:py-20 bg-brand-surface border-b border-brand-border/40 relative"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold text-brand-accent tracking-widest uppercase">
              REPUTASI KULINER TERUJI
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mt-2 tracking-tight">
              Bukan Sekadar Klaim Rasa, Dipercaya oleh Ribuan Keluarga Jabodetabek
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href={BUSINESS_INFO.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-accent border-b-2 border-brand-primary hover:border-brand-accent pb-1 transition-all duration-300"
            >
              Lihat Profil Google Maps Asli kami
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Counter Row Cards with left accent border and slightly varied heights for visual rhythm as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {valueMap.map((item, index) => {
            const Icon = item.icon;
            // Slightly offset margins to create high-concept asymmetric rhythm
            const rhythmStyles = [
              "lg:-translate-y-2",
              "lg:translate-y-4",
              "lg:translate-y-0",
              "lg:translate-y-2"
            ][index];

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className={`bg-brand-secondary/40 border-l-4 border-brand-primary rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${rhythmStyles}`}
              >
                <div>
                  <div className="bg-brand-primary/10 p-3 rounded-lg text-brand-primary w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-4xl text-brand-dark tracking-tight">
                      {item.val}
                    </span>
                    <span className="font-display font-semibold text-lg text-brand-accent">
                      {item.suffix}
                    </span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-sm text-brand-dark mt-2">
                    {item.label}
                  </h3>
                </div>
                
                <p className="text-xs text-brand-text/80 mt-4 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
