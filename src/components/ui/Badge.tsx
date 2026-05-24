// src/components/ui/Badge.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Atomic Badge component — wrapper atas .badge classes dari tailwind.config.js
// Selalu gunakan komponen ini, jangan hardcode .badge classes di feature components
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'red' | 'dark' | 'outline' | 'success';

interface BadgeProps {
  variant?:   BadgeVariant;
  className?: string;
  children:   ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  red:     'badge-red',
  dark:    'badge-dark',
  outline: 'badge-outline',
  success: 'badge-success',
};

export function Badge({ variant = 'primary', className, children }: BadgeProps) {
  return (
    <span className={cn('badge', variantMap[variant], className)}>
      {children}
    </span>
  );
}

// ─── Mapping text badge dari data.ts ke variant ───────────────────────────────
// Gunakan ini di feature components untuk memetakan badge string dari PRODUCTS_DATA
// Contoh: <Badge variant={BADGE_VARIANT_MAP[product.badge ?? '']}>
export const BADGE_VARIANT_MAP: Record<string, BadgeVariant> = {
  'Terlaris':    'primary',
  'Rekomendasi': 'dark',
  'Promo':       'red',
  'Baru':        'success',
};