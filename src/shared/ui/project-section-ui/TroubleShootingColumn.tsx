import { themeMap, ThemeType } from "@/shared/config/all/themeMap";
import { LucideIcon } from "lucide-react";

type TroubleshootingColumnProps = {
  icon: LucideIcon;
  label: string;
  description: string;
  theme: ThemeType;
};

export function TroubleshootingColumn({
  icon: Icon,
  label,
  description,
  theme,
}: TroubleshootingColumnProps) {
  const style = themeMap[theme] || themeMap.blue;

  return (
    <div className={`flex flex-col p-6 sm:p-8 ${style.bg} transition-colors`}>
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border ${style.border} ${style.icon} shadow-inner`}
        >
          <Icon className="size-4" />
        </div>

        <span
          className={`text-xs font-black tracking-[0.14em] ${style.label}`}
        >
          {label}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium leading-7 text-zinc-300">
        {description}
      </p>
    </div>
  );
}