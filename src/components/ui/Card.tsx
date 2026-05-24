// src/components/ui/Card.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Atomic Card component — wrapper atas .card classes dari tailwind.config.js
// Selalu gunakan komponen ini, jangan hardcode .card classes di feature components
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Aktifkan .card-hover untuk efek lift + border kuning saat hover */
  hover?:     boolean;
  className?: string;
  children:   ReactNode;
}

export function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('card', hover && 'card-hover', className)}
      {...props}
    >
      {children}
    </div>
  );
}