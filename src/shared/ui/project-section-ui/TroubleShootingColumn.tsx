'use client'

import { LucideIcon } from "lucide-react";

type TroubleshootingColumnProps = {
  icon: LucideIcon;
  label: string;
  description: string;
  variant: 'red' | 'blue' | 'emerald';
};

const styles = {
    red: {
      border: "border-red-500/20",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
    blue: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
    },
    emerald: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
    },
  };

export function TroubleshootingColumn({
  icon: Icon,
  label,
  description,
  variant,
}: TroubleshootingColumnProps) {



  const style = styles[variant];

  return (
    <div className="flex flex-col p-6 sm:p-8 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border ${style.border} ${style.bg} ${style.text} shadow-inner`}>
          <Icon className="size-4" />
        </div>

        <span className={`text-xs font-black tracking-[0.14em] ${style.text}`}>
          {label}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium leading-7 text-zinc-300">
        {description}
      </p>
    </div>
  );
}