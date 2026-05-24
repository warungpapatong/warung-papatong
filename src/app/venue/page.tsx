// src/app/venue/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component murni — hanya orchestrate feature sections.
// Semua state, logic, dan 'use client' ada di GallerySection.
// Navbar + Footer sudah dihandle oleh LayoutShell di layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import GallerySection from '@/features/gallery/components/GallerySection'

export const metadata: Metadata = {
  title:       'Galeri dan Venue - Resto Warung Papatong',
  description: 'Jelajahi suasana saung lesehan, kolam ikan, panggung live music, dan kehangatan Warung Papatong Cibinong secara visual.',
  openGraph: {
    title:       'Galeri dan Venue - Resto Warung Papatong',
    description: 'Saung lesehan di atas air, live music akustik, dan kehangatan kumpul keluarga — semuanya di Warung Papatong Cibinong.',
  },
}

export default function VenuePage() {
  return <GallerySection />
}