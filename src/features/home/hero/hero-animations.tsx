import type { ReactNode } from 'react'

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
    <div className={className}>
      {children}
    </div>
  )
}

export function HeroAnimatedItem({ children, className, as = 'div' }: ItemProps) {
  const Tag = as
  return (
    <Tag className={`animate-fade-up ${className ?? ''}`}>
      {children}
    </Tag>
  )
}

export function HeroRightCol({ children, className }: ContainerProps) {
  return (
    <div className={`animate-fade-up [animation-delay:0.2s] ${className ?? ''}`}>
      {children}
    </div>
  )
}
