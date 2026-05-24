// src/lib/cn.ts
// ─────────────────────────────────────────────────────────────────────────────
// Utility: className merger yang type-safe
// Mengkombinasikan clsx (conditional classes) + tailwind-merge (dedup Tailwind)
//
// Penggunaan:
//   cn('px-4 py-2', condition && 'bg-brand-primary', 'px-6')
//   → 'py-2 bg-brand-primary px-6'  (px-4 di-override px-6 via tailwind-merge)
// ─────────────────────────────────────────────────────────────────────────────

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}