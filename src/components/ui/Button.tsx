// src/components/ui/Button.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Atomic Button component — wrapper atas .btn classes dari tailwind.config.js
// Selalu gunakan komponen ini, jangan hardcode .btn classes di feature components
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'dark' | 'outline' | 'wa';
type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  fullWidth?: boolean;
  loading?:   boolean;
  icon?:      ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantMap: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  dark:    'btn-dark',
  outline: 'btn-outline',
  wa:      'btn-wa',
};

const sizeMap: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        variantMap[variant],
        sizeMap[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}

// ─── LINK BUTTON ────────────────────────────────────────────────────────────
// Untuk navigasi — gunakan ini agar semantik tetap <a> bukan <button>

import Link from 'next/link';
import type { ComponentPropsWithoutRef as LinkProps } from 'react';

interface LinkButtonProps {
  href:      string;
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  fullWidth?: boolean;
  external?:  boolean;
  icon?:      ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?:  () => void;
  children:  ReactNode;
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  external = false,
  icon,
  iconPosition = 'left',
  className,
  onClick,
  children,
}: LinkButtonProps) {
  const classes = cn('btn', variantMap[variant], sizeMap[size], fullWidth && 'w-full', className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </Link>
  );
}