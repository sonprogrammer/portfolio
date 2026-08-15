import { mingleTechnologyGroup } from "@/shared/config/mingle/mingleTechnologyGroup";
import { TechnologyCard } from "@/shared/ui/project-section-ui";



export function MingleTechnology() {
  return (
    <div className="grid gap-6 sm:px-5 md:px-20 lg:px-10 lg:grid-cols-3">
      {mingleTechnologyGroup.map(group => (
        <TechnologyCard
          key={group.title}
          {...group}
        />
      ))}
    </div>
  );
}