"use client"


import { fuellyFeatures } from "@/shared/config/fuelly"
import { ProjectFeatures } from "@/shared/ui/project-section-ui"

export function FuellyFeatures() {
  return (
      <ProjectFeatures  features={fuellyFeatures} theme="emerald" />
  )
}