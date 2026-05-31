'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

interface ContainerProps {
  children: ReactNode
  className?: string
}

interface ItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'p' | 'h1'
}

export function HeroAnimatedContainer({ children, className }: ContainerProps) {
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

export function HeroAnimatedItem({ children, className, as = 'div' }: ItemProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag variants={itemVariants} className={className}>
      {children}
    </MotionTag>
  )
}

export function HeroRightCol({ children, className }: ContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}