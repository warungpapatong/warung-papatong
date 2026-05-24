// src/app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Halaman Beranda (/)
// Server Component murni — hanya orchestrate feature sections.
// Tidak ada useState, logic, data fetch, atau JSX detail di sini.
// Navbar, Footer, FloatingWA sudah di-render oleh LayoutShell.
// ─────────────────────────────────────────────────────────────────────────────

import HeroSection         from '@/features/home/components/HeroSection'
import BestSellers         from '@/features/home/components/BestSellers'
import AmbienceTeaser      from '@/features/home/components/AmbienceTeaser'
import LocationSection     from '@/features/home/components/LocationSection'
import TestimonialsSection from '@/features/home/components/TestimonialsSection'
import FaqAccordion        from '@/features/home/components/FaqSecction'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BestSellers />
      <AmbienceTeaser />
      <TestimonialsSection />
      <FaqAccordion />
      <LocationSection />
    </>
  )
}