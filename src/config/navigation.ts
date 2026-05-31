import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda',        href: '/' },
  { label: 'Menu Kami', href: '/menu' },
  { label: 'Galeri & Suasana', href: '/venue' },
  { label: 'Tentang Kami',   href: '/about' },
] as const;