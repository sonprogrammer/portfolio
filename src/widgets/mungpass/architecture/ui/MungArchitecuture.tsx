'use client'


import { mungArchitecture } from "@/shared/config/mungpass";
import { ArchitectureCard } from "@/shared/ui/project-section-ui";

export function MungpassArchitecture() {
  return (
    <div className="grid items-start gap-8 sm:px-20 lg:grid-cols-2">
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