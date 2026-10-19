"use client"

import { vcFeatures } from "@/shared/config/vc"
import { ProjectFeatures } from "@/shared/ui/project-section-ui"



export function VcFeatures() {
  return (
        <ProjectFeatures features={vcFeatures}  theme="red"/>
  )
}