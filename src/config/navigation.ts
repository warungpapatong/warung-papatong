// src/config/navigation.ts
// ─────────────────────────────────────────────────────────────────────────────
// Daftar item navigasi.
// ⚠️  PERHATIAN: Route yang ada di sini terhubung ke Google Ads aktif.
//     Jangan ubah href tanpa update Google Ads campaign terlebih dahulu.
// ─────────────────────────────────────────────────────────────────────────────

import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda',        href: '/' },
  { label: 'Menu Kami', href: '/menu' },
  { label: 'Galeri & Suasana', href: '/venue' },
  { label: 'Tentang Kami',   href: '/about' },
] as const;