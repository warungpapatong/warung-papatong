import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO, buildWALink } from '@/data';
import { trackWhatsAppConversion } from '@/lib/tracking';

export default function FloatingWA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // Toggle visibility when scrolled past 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Show tooltip after a slight delay once button is mounted
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2500);

      // Hide tooltip after 6s automatically to prevent screen clutter
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 8500);

      return () => {
        clearTimeout(tooltipTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setShowTooltip(false);
    }
  }, [isVisible]);

  const waMessage = "Halo Admin Warung Papatong Cibinong, saya ingin reservasi tempat duduk & pre-order menu makanan untuk acara makan tengah rombongan keluarga besar kami.";
  const waURL = buildWALink(BUSINESS_INFO.wa, waMessage);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
        >
          {/* Tooltip on Left */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.9 }}
                className="bg-brand-dark border border-brand-primary/20 text-brand-secondary text-xs font-bold py-2.5 px-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Ada Lesehan Kosong? Chat Saja!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Interactive Ring button */}
          <div className="relative group">
            {/* Pulsing expand wave ring 1 */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-ring-1 -z-10" />
            {/* Pulsing expand wave ring 2 */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-ring-2 -z-10" />

            <a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat dengan Admin Warung Papatong via WhatsApp"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => trackWhatsAppConversion(e as any, 'Floating WhatsApp button bottom-right')}
              className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-transform duration-300 transform hover:scale-115 active:scale-95"
            >
              {/* WhatsApp Premium Inline SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 md:w-8 md:h-8"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.38 2.038 13.9 1.012 11.275 1.01c-5.438 0-9.863 4.372-9.867 9.802-.001 1.73.473 3.42 1.37 4.937L1.644 20.73l5.003-1.576zM17.478 14.3c-.3-.149-1.77-.872-2.04-.972-.269-.099-.465-.148-.659.15-.195.297-.752.942-.918 1.14-.166.197-.331.223-.63.074-.3-.149-1.265-.465-2.41-1.487-.893-.797-1.493-1.784-1.672-2.08-.179-.297-.019-.458.13-.606.134-.133.3-.347.449-.52.149-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.659-1.583-.902-2.17-.237-.568-.478-.49-.659-.499-.17-.008-.365-.01-.56-.01-.196 0-.515.074-.784.371-.269.297-1.03.1-.1s-1.03 1.012-1.03 2.47c0 1.458 1.06 2.87 1.209 3.07.149.198 2.086 3.195 5.054 4.482.706.306 1.258.489 1.687.625.71.226 1.355.194 1.865.118.57-.085 1.77-.723 2.019-1.42.25-.697.25-1.295.175-1.42-.075-.125-.269-.199-.57-.348z" />
              </svg>
            </a>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
