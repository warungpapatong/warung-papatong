// src/features/about/components/AboutTeam.tsx

'use client'

import { motion } from 'motion/react'
import { ChefHat, Award, ShieldCheck, Sparkles } from 'lucide-react'
import { TEAM_DATA } from '@/data'
import type { TeamMember } from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ROLE_ICONS: Record<string, typeof ChefHat> = {
  Owner:   Award,
  Manager: ShieldCheck,
}

function getRoleIcon(role: string) {
  for (const [key, Icon] of Object.entries(ROLE_ICONS)) {
    if (role.includes(key)) return Icon
  }
  return ChefHat
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="badge badge-primary mb-4">
        <Sparkles className="h-3.5 w-3.5" />
        Di Balik Dapur Papatong
      </span>
      <h2 className="mt-2 font-display font-black text-3xl leading-none tracking-tight text-white md:text-5xl">
        Sosok di Balik Cita Rasa Istimewa
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-brand-muted">
        Dari Founder penjaga tradisi Sunda, koki legendaris, hingga pengasuh kenyamanan
        rombongan Anda - kami melayani sepenuh cinta.
      </p>
    </div>
  )
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const RoleIcon = getRoleIcon(member.role)

  return (
    <motion.div
      key={member.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="card card-hover group flex flex-col hover:border-brand-primary/50"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden bg-brand-surface-2">
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-brand-primary px-3 py-1.5 text-[10px] font-bold text-brand-dark shadow-card">
          <RoleIcon className="h-3.5 w-3.5" />
          {member.role}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-5">
        <h3 className="font-display font-extrabold text-xl tracking-tight text-brand-dark">
          {member.name}
        </h3>

        {member.specialty && (
          <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-brand-red">
            Spesialis: {member.specialty}
          </p>
        )}

        <p className="mt-3 flex-grow text-xs leading-relaxed text-brand-muted">
          {member.bio}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-brand-border pt-4 font-mono text-[10px] text-brand-muted">
          <span>WARUNG PAPATONG</span>
          <span className="font-bold text-brand-red">EST. 2018</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AboutTeam() {
  return (
    <section id="profil-tim" className="section relative overflow-hidden bg-brand-dark">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-10 left-1/4 h-72 w-72 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-80 w-80 rounded-full bg-brand-red/5 blur-3xl" />

      <div className="section-inner relative z-10">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TEAM_DATA.map((member: TeamMember, i: number) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}