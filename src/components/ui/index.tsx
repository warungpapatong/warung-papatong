// src/components/ui/index.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Atomic UI components barrel export
// Import semua UI primitives dari '@/components/ui'
// ─────────────────────────────────────────────────────────────────────────────

// ─── BADGE ───────────────────────────────────────────────────────────────────

import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'red' | 'dark' | 'outline' | 'success';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const badgeVariantMap: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  red:     'badge-red',
  dark:    'badge-dark',
  outline: 'badge-outline',
  success: 'badge-success',
};

export function Badge({ variant = 'primary', className, children }: BadgeProps) {
  return (
    <span className={cn('badge', badgeVariantMap[variant], className)}>
      {children}
    </span>
  );
}

// ─── Mapping text badge dari data ke variant ──────────────────────────────────
// Konvensi: badge label di data.ts → variant Badge component
export const BADGE_VARIANT_MAP: Record<string, BadgeVariant> = {
  'Terlaris':    'primary',
  'Rekomendasi': 'dark',
  'Promo':       'red',
  'Baru':        'success',
};


// ─── CARD ─────────────────────────────────────────────────────────────────────

interface CardProps {
  hover?:     boolean;
  className?: string;
  children:   ReactNode;
}

export function Card({ hover = false, className, children }: CardProps) {
  return (
    <div className={cn('card', hover && 'card-hover', className)}>
      {children}
    </div>
  );
}


// ─── SECTION HEADER ──────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label?:    string;
  title:     string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {label && (
        <p className="section-label">
          <span className="w-4 h-px bg-brand-primary-dark inline-block" />
          {label}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}


// ─── DIVIDER ─────────────────────────────────────────────────────────────────

interface DividerProps {
  label?:    string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn('border-brand-border', className)} />;
  }
  return (
    <div className={cn('divider', className)}>
      <span className="text-sm text-brand-muted font-medium">{label}</span>
    </div>
  );
}


// ─── SKELETON ────────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton rounded-lg', className)} />
  );
}