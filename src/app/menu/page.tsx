// src/app/menu/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component murni — hanya orchestrate feature sections.
// Semua state, logic, dan 'use client' ada di MenuSection.
// Navbar + Footer sudah dihandle oleh LayoutShell di layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import MenuSection from '@/features/menu/components/MenuSection'

export const metadata: Metadata = {
  title:       'Menu Kami - Resto Warung Papatong',
  description: 'Lihat daftar lengkap menu Seafood & Sunda autentik Warung Papatong dan pre-order langsung via WhatsApp sebelum tiba.',
  openGraph: {
    title:       'Menu Kami - Resto Warung Papatong',
    description: 'Pre-order menu seafood & sunda segar Warung Papatong — potong antrean dapur, meja langsung siap!',
  },
}

export default function MenuPage() {
  return <MenuSection />
}