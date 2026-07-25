'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

import type { FAQItem } from '@/types'

interface FaqAccordionProps {
  faqs: FAQItem[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null)

  const toggle = (id: number) => setOpenId(prev => (prev === id ? null : id))

  return (
    <div className="space-y-4">
      {faqs.map(item => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={`border rounded-[1.75rem] overflow-hidden bg-brand-surface transition-all duration-300 ${
              isOpen
                ? 'border-brand-primary shadow-card-md'
                : 'border-brand-border hover:border-brand-primary/40'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full text-left p-6 flex items-center justify-between gap-4 focus-brand"
            >
              <span className="font-display font-black text-xs sm:text-sm md:text-base text-brand-dark pr-4">
                {item.question}
              </span>
              <span
                className={`p-1.5 rounded-full shrink-0 transition-all duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-brand-primary text-brand-dark'
                    : 'bg-brand-surface-2 text-brand-primary-dark'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 pt-4 border-t border-brand-border border-l-4 border-l-brand-primary text-brand-text text-xs sm:text-sm leading-relaxed bg-brand-surface-2 pr-8">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
