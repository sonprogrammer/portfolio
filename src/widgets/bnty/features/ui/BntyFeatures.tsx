"use client"

import { bntyFeatures } from "@/shared/config/bnty"
import { ProjectFeatures } from "@/shared/ui/project-section-ui"




export function BntyFeatures() {
  return (
        <ProjectFeatures  features={bntyFeatures} theme="blue"/>
  )
}