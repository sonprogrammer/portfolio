'use client'

import { fuellyArchitecture } from "@/shared/config/fuelly";
import { ArchitectureCard } from "@/shared/ui/project-section-ui";

export function FuellyArchitecture() {
  return (
    <div className="space-y-3">
      {fuellyArchitecture.map(item => (
        <ArchitectureCard
          key={item.title}
          theme="emerald"
          {...item}
        />
      ))}
    </div>
  );
}