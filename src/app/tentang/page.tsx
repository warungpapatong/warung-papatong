// src/app/about/page.tsx
// Orchestrator only — tidak ada UI logic di sini.

import type { Metadata } from 'next'
import AboutStory  from '@/features/about/components/AboutStory'
// import AboutTeam   from '@/features/about/components/AboutTeam'
import AboutCTA    from '@/features/about/components/AboutCTA'

export const metadata: Metadata = {
  title:       'Tentang Kami - Resto Warung Papatong',
  description: 'Kisah, nilai, dan tim di balik Warung Papatong — saung lesehan terapung dengan kuliner Sunda & seafood autentik di Cibinong sejak 2018.',
}

export default function AboutPage() {
  return (
    <>
      <AboutStory  />
      {/* <AboutTeam   /> */}
      <AboutCTA    />
    </>
  )
}