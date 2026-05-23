import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, UtensilsCrossed, Sparkles, MapPin, Info } from 'lucide-react';
import { NavItem } from '@/types';
import { BUSINESS_INFO } from '@/data';
import Logo from './Logo';
import { trackWhatsAppConversion } from '@/lib/tracking';

interface NavbarProps {
  onOpenBooking: () => void;
  currentPage: 'beranda' | 'menu' | 'venue' | 'tentang';
  onPageChange: (page: 'beranda' | 'menu' | 'venue' | 'tentang') => void;
}

const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'menu', label: 'E-Menu' },
  { id: 'venue', label: 'Galeri & Suasana' },
  { id: 'tentang', label: 'Tentang Kami' },
] as const;

export default function Navbar({ onOpenBooking, currentPage, onPageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: 'beranda' | 'menu' | 'venue' | 'tentang') => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel border-b border-brand-border/40 py-3 shadow-sm shadow-brand-dark/5 bg-brand-secondary/95 backdrop-blur-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Left */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="group focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1 text-left"
            aria-label="Kembali ke Beranda"
          >
            <Logo size="sm" />
          </button>

          {/* Nav Links Center (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 font-medium text-sm transition-colors duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none cursor-pointer ${
                    isActive ? 'text-brand-primary font-bold' : 'text-brand-text/80 hover:text-brand-dark'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-brand-primary/5 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button Right */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${BUSINESS_INFO.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppConversion(e as any, 'Header Phone Icon')}
              className="text-brand-dark hover:text-brand-accent p-2 rounded-full transition-colors duration-300 hover:bg-brand-primary/10 focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Hubungi via WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={onOpenBooking}
              className="relative overflow-hidden bg-brand-primary hover:bg-brand-dark text-brand-dark hover:text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Reservasi Tempat
              </span>
            </button>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden bg-brand-primary text-brand-dark hover:bg-brand-dark hover:text-white text-xs font-bold px-3 py-2 rounded-full shadow-md cursor-pointer"
            >
              Booking
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-dark hover:bg-brand-primary/10 rounded-xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
              aria-label="Tampilkan menu navigasi"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Screen Overlay (Mobile Menu) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 pt-20 pb-8 px-4 bg-brand-secondary/95 backdrop-blur-lg border-b border-brand-border shadow-2xl z-30 lg:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-display font-medium text-lg border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-brand-primary text-brand-dark border-transparent shadow-md font-bold'
                        : 'text-brand-text hover:bg-brand-primary/10 border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-brand-border/60">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-brand-primary text-brand-dark hover:bg-brand-dark hover:text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Booking & Pre-Order Online
              </button>
              
              <a
                href={`https://wa.me/${BUSINESS_INFO.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => trackWhatsAppConversion(e as any, 'Mobile Menu WhatsApp Button')}
                className="w-full bg-brand-surface hover:bg-brand-primary text-brand-dark border border-brand-primary/40 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Hubungi Admin WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
