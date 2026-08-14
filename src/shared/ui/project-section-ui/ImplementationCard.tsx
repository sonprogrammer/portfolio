'use client'
import { themeMap, ThemeType } from "@/shared/config/all/themeMap";
import { CheckCircle2 } from "lucide-react";

type ImplementationCardProps = {
  number: number;
  title: string;
  description: string;
  points: readonly string[];
  theme: ThemeType
};

export function ImplementationCard({
  number,
  title,
  description,
  points,
  theme
}: ImplementationCardProps) {

  const style = themeMap[theme]
  return (
    <article
      className={`group relative overflow-hidden rounded-[2.5rem] border bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700 ${style.border}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-800/80 text-sm font-black shadow-inner ${style.icon}`}
        >
          {String(number).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6">
        <h3
          className={`text-lg font-extrabold tracking-tight transition-colors duration-300 text-white group-hover:${style.text}`}
        >
          {title}
        </h3>

        <p className="mt-3 text-sm font-medium leading-7 text-zinc-300">
          {description}
        </p>
      </div>

      <div className="mt-6 border-t border-zinc-800/80 pt-5">
        <ul className="space-y-3">
          {points.map(point => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed text-zinc-300"
            >
              <CheckCircle2
                className={`mt-1 size-4 shrink-0 ${style.text}`}
              />

              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}