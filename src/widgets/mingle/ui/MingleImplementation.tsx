import { mingleImplementation } from "@/shared/config/mingle";
import { ImplementationCard } from "@/shared/ui/project-section-ui";


export function MingleImplementation() {
  return (
    <div className="grid gap-6  sm:px-5 md:px-20 lg:px-10 lg:grid-cols-3">
      {mingleImplementation.map((item, index) => (
        <ImplementationCard
          key={item.title}
          number={index + 1}
          theme="violet"
          {...item}
        />
      ))}
    </div>
  );
}