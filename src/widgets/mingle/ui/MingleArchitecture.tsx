'use client'

import { mingleArchitecture } from "@/shared/config/mingle/mingleArchitecture";
import { ArchitectureCard } from "@/shared/ui/project-section-ui";


export function MingleArchitecture() {
  return (
    <div className="grid items-start gap-8 sm:px-20 lg:grid-cols-2">
      {mingleArchitecture.map(item => (
        <ArchitectureCard
          key={item.title}
          theme="violet"
          {...item}
        />
      ))}
    </div>
  );
}