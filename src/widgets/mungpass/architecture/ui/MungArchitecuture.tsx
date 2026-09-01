'use client'


import { mungArchitecture } from "@/shared/config/mungpass";
import { ArchitectureCard } from "@/shared/ui/project-section-ui";

export function MungpassArchitecture() {
  return (
    <div className="space-y-3 ">
      {mungArchitecture.map(item => (
        <ArchitectureCard
          key={item.title}
          theme="orange"
          {...item}
        />
      ))}
    </div>
  );
}