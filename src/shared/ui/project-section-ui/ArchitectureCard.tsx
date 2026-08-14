'use client'

import { themeMap } from "@/shared/config/all/themeMap";
import { ArchitectureItem } from "@/shared/model/types";

import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";


export function ArchitectureCard({
  icon: Icon,
  title,
  description,
  points,
  theme = 'blue'
}: ArchitectureItem) {
  const [isOpen, setIsOpen] = useState(false)

  const style = themeMap[theme]
  return (
    <article
      className={`overflow-hidden rounded-[2.5rem] border backdrop-blur-md shadow-xl transition-all duration-300 ${isOpen
          ? `border-zinc-700 bg-zinc-900/80 shadow-2xl`
          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
        }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex w-full items-center justify-between gap-4 p-3 sm:p-5 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 shadow-inner ${isOpen
                ? `${style.border} ${style.glow} ${style.text}`
                : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-300'
              }`}
          >
            <Icon className="size-5" />
          </div>

          <h3
            className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-200 group-hover:text-white'
              }`}
          >
            {title}
          </h3>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/60 text-zinc-400 transition-transform duration-300">
          <ChevronDown
            className={`size-4 transition-transform duration-300 ${isOpen ? `rotate-180 ${style.text}` : ''
              }`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={`border-t border-zinc-800/80 px-6 pb-6 pt-5 sm:px-8 sm:pb-8 bg-zinc-950/30`}>
            <p className="text-sm font-medium leading-7 text-zinc-300">
              {description}
            </p>

            <ul className="mt-5 space-y-3">
              {points.map(point => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed text-zinc-300"
                >
                  <CheckCircle2
                    className={`mt-1 size-4 shrink-0 ${style.text}`}
                  />

                  <span>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}