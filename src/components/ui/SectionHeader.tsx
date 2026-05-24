// src/components/ui/SectionHeader.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Atomic SectionHeader component — wrapper atas .section-label / .section-title /
// .section-subtitle classes dari tailwind.config.js
// Gunakan ini di semua section agar heading style konsisten lintas halaman
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  /** Label kecil di atas judul — uppercase, kuning, dengan garis dekoratif */
  label?:     string;
  /** Judul utama section — wajib diisi */
  title:      string;
  /** Teks deskripsi opsional di bawah judul */
  subtitle?:  string;
  /** Tengahkan semua teks (untuk section centered seperti Testimonials) */
  centered?:  boolean;
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