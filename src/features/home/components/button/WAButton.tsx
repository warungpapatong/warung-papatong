'use client'

import type { ReactNode } from 'react'
import { MessageSquare } from 'lucide-react'
import { trackWhatsAppConversion } from '@/lib/tracking'

interface WAButtonProps {
  href: string
  label: string
  trackingLabel?: string
  className?: string
  icon?: ReactNode
}

export default function WAButton({
  href,
  label,
  trackingLabel = 'WhatsApp CTA',
  className = 'group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-200/60 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white/80 hover:shadow-xl hover:shadow-green-300/50 active:scale-[0.985] sm:text-base',
  icon,
}: WAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppConversion(trackingLabel)}
      className={className}
    >
      {icon ?? <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />}
      <span>{label}</span>
    </a>
  )
}