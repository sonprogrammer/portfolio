'use client'

import { useState } from "react";
import { TroubleshootingColumn } from "@/shared/ui/project-section-ui";
import {
  CheckCircle2,
  CircleAlert,
  Gauge,
  Search,
  Wrench,
  ChevronDown,
} from "lucide-react";
import { themeMap, ThemeType } from "@/shared/config/all/themeMap";
import { TroubleshootingItem } from "@/shared/model/types";

type TroubleshootingCardProps = TroubleshootingItem & {
  number: number;
  theme: ThemeType
};

export function TroubleshootingCard({
  number,
  title,
  problem,
  reason,
  solution,
  results,
  theme = 'blue'
}: TroubleshootingCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const style = themeMap[theme];
  return (
    <article className={`overflow-hidden rounded-[2.5rem] border ${style.border} bg-zinc-900/60 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8 cursor-pointer group"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-black uppercase tracking-[0.16em] ${style.text}`}>
              TROUBLESHOOTING {String(number).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
            {title}
          </h3>
        </div>

        <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border ${style.border} bg-zinc-950/60 ${style.text} transition-transform duration-300`}>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-zinc-800/80 bg-zinc-950/20">
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
              <TroubleshootingColumn
                icon={CircleAlert}
                label="PROBLEM"
                description={problem}
                theme="red"
              />

              <TroubleshootingColumn
                icon={Search}
                label="REASON"
                description={reason}
                theme="blue"
              />

              <TroubleshootingColumn
                icon={Wrench}
                label="SOLUTION"
                description={solution}
                theme="emerald"
              />
            </div>
          </div>

          <div className={`border-t ${style.border} ${style.bg} px-6 py-6 sm:px-8`}>
            <div className="flex items-center gap-2.5">
              <div className={`flex size-8 items-center justify-center rounded-xl border ${style.border} ${style.glow} ${style.text} shadow-inner`}>
                <Gauge className="size-4" />
              </div>

              <span className="text-sm font-extrabold text-white tracking-tight">
                개선 결과
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {results.map((result: string) => (
                <div
                  key={result}
                  className="flex items-start gap-2.5 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3.5 backdrop-blur-md transition-all duration-200 hover:border-zinc-700"
                >
                  <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${style.text}`} />

                  <span className="text-xs sm:text-sm font-medium leading-6 text-zinc-300">
                    {result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}