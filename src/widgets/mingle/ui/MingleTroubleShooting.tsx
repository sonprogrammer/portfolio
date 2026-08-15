import { mingleTroubleShooting } from "@/shared/config/mingle";
import { TroubleshootingCard } from "@/shared/ui/project-section-ui";


export function MingleTroubleshooting() {
  return (
    <div className="space-y-8 sm:px-5 md:px-20 lg:px-10">
      {mingleTroubleShooting.map((item, index) => (
        <TroubleshootingCard
          key={item.title}
          number={index + 1}
          theme="violet"
          {...item}
        />
      ))}
    </div>
  );
}