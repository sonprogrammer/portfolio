'use client'

import { vcArchitecture } from '@/shared/config/vc'
import { ArchitectureCard } from '@/shared/ui/project-section-ui'

export function VcArchitecture() {
  return (
    <div className="space-y-3">
      {vcArchitecture.map(item => (
        <ArchitectureCard
          key={item.title}
          theme='red'
          {...item}
        />
      ))}
    </div>
  )
}