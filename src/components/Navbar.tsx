import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, UtensilsCrossed, Sparkles } from 'lucide-react';
import { NavItem } from '../types';
import { BUSINESS_INFO } from '../data';
import Logo from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "E-Menu", href: "#menu" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Cara Reservasi", href: "#proses" },
  { label: "Ulasan", href: "#ulasan" },
  { label: "Lokasi", href: "#lokasi" }
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#beranda');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Scroll Spy
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.querySelector(item.href));
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach(sec => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel border-b border-brand-border/40 py-3 shadow-sm shadow-brand-dark/5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Left */}
          <a
            href="#beranda"
            onClick={(e) => handleNavClick(e, '#beranda')}
            className="group focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1"
            aria-label="Kembali ke Beranda"
          >
            <Logo size="sm" />
          </a>

          {/* Nav Links Center (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 font-medium text-sm transition-colors duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none ${
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
                </a>
              );
            })}
          </nav>

          {/* Action Button Right */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${BUSINESS_INFO.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark hover:text-brand-accent p-2 rounded-full transition-colors duration-300 hover:bg-brand-primary/5 focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Hubungi via WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={onOpenBooking}
              className="relative overflow-hidden bg-brand-primary hover:bg-brand-dark text-brand-secondary font-bold text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
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
              className="sm:hidden bg-brand-primary text-brand-secondary text-xs font-bold px-3 py-2 rounded-full shadow-md"
            >
              Booking
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-dark hover:bg-brand-primary/5 rounded-xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary"
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
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-3 rounded-xl font-display font-medium text-lg border transition-colors ${
                      isActive
                        ? 'bg-brand-primary text-brand-secondary border-transparent shadow-md'
                        : 'text-brand-text hover:bg-brand-primary/5 border-transparent'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-brand-border/60">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-brand-primary text-brand-secondary font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Booking & Pre-Order Online
              </button>
              
              <a
                href={`https://wa.me/${BUSINESS_INFO.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-surface hover:bg-brand-primary text-brand-dark hover:text-brand-secondary border border-brand-primary/40 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
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
