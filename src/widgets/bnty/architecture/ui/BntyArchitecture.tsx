'use client'


import { architectureItems } from '@/shared/config/bnty'
import { ArchitectureCard } from '@/shared/ui/project-section-ui'

export function BntyArchitecture() {
  return (
    <div className="space-y-3">
      {architectureItems.map(item => (
        <ArchitectureCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  )
}