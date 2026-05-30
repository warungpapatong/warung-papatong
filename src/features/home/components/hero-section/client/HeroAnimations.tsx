// src/features/home/components/HeroAnimations.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ CLIENT COMPONENT — hanya untuk motion/animation wrapper
// ✅ Menerima children dari Server Component (pattern: "client shell, server leaf")
// ✅ Seminimal mungkin: HANYA Framer Motion variants & initial/animate
//
// CATATAN PENTING:
//   Dengan pattern ini, children (konten teks, links, dll) tetap di-render
//   sebagai server HTML. Motion hanya menambahkan animasi di atas HTML yang
//   sudah ada — Google bot tetap crawl konten penuh tanpa JS.
// ─────────────────────────────────────────────────────────────────────────────

'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

// ─── Animation Config ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

// ─── Animated Container (stagger parent) ─────────────────────────────────────

interface HeroContainerProps {
  children: ReactNode
  className?: string
}

export function HeroAnimatedContainer({ children, className }: HeroContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Item (stagger child) ────────────────────────────────────────────

interface HeroItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'p' | 'h1'
}

export function HeroAnimatedItem({ children, className, as = 'div' }: HeroItemProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag variants={itemVariants} className={className}>
      {children}
    </MotionTag>
  )
}

// ─── Right Column Entrance (fade-up, no stagger) ─────────────────────────────

interface HeroRightColProps {
  children: ReactNode
  className?: string
}

const EASE_CONST = [0.22, 1, 0.36, 1] as const

export function HeroRightCol({ children, className }: HeroRightColProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_CONST }}
      className={className}
    >
      {children}
    </motion.div>
  )
}