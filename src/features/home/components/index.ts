// src/features/home/components/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Barrel export untuk semua section di halaman beranda.
//
// HANYA export Server Components (yang dipakai langsung di page.tsx).
// Client Components (HeroAnimations, AmbienceCard, dll) adalah
// implementation detail — tidak perlu diekspos ke luar folder ini.
//
// Usage di page.tsx:
//   import { HeroSection, BestSellers, ... } from '@/features/home/components'
// ─────────────────────────────────────────────────────────────────────────────

export { default as HeroSection         } from './hero-section/HeroSection'
export { default as BestSellers         } from './bestsellers-section/BestSellers'
export { default as AmbienceTeaser      } from './ambience-section/AmbienceTeaser'
export { default as TestimonialsSection } from './testimonials-section/TestimonialsSection'
export { default as FaqSection          } from './faq-section/FaqSection'
export { default as LocationSection     } from './location-section/LocationSection'