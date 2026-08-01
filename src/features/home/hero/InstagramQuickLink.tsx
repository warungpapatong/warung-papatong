'use client'

import { Instagram } from 'lucide-react'
import { trackSocialClick } from '@/lib/config'

interface InstagramQuickLinkProps {
  href: string
  label: string
}

export default function InstagramQuickLink({ href, label }: InstagramQuickLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackSocialClick('Instagram', 'Hero Quick Link')}
      className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-primary/30 hover:text-brand-dark"
    >
      <Instagram className="h-4 w-4" />
      {label}
    </a>
  )
}
