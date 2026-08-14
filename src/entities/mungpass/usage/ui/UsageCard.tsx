'use client'
import { ReactNode } from "react";

interface UsageCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  subText?: string;
}


export function UsageCard({
  icon,
  title,
  description,
  subText,
}: UsageCardProps) {
  return (
    <div
      className="group relative cursor-pointer bg-gray-900/60 backdrop-blur-md rounded-[2.5rem] p-6 border border-gray-800 shadow-xl transition-all duration-300 hover:border-orange-500/40 hover:bg-gray-900/90 hover:shadow-orange-500/5 active:scale-[0.98]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 shadow-inner text-orange-400">
          {icon}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="font-extrabold text-gray-100 tracking-tight group-hover:text-orange-400 transition-colors">
            {title}
          </h3>

          {subText && (
            <p className="text-xs font-semibold text-gray-500">
              {subText}
            </p>
          )}

          {description && (
            <p className="text-sm font-medium text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
