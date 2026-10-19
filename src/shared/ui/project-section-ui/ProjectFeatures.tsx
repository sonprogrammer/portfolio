"use client"

import { themeMap, type ThemeType } from "@/shared/config/all/themeMap"
import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"


export interface ProjectFeature {
  id: string
  title: string
  description: string
  update?: "신규" | "개선"
  role?: string
  items?: string[]
}

const updateStyles = {
  신규: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  개선: "border-blue-500/20 bg-blue-500/10 text-blue-400"
}

export function ProjectFeatures({ features, theme }: { features: ProjectFeature[]; theme: ThemeType }) {
  const [isOpen, setIsOpen] = useState(false)
  const sectionId = useId()
  const styles = themeMap[theme]

  return (
    <div>
      <button
        id={`${sectionId}-trigger`}
        type="button"
        aria-label={isOpen ? "서비스 기능 목록 접기" : "서비스 기능 목록 펼치기"}
        aria-expanded={isOpen}
        aria-controls={`${sectionId}-content`}
        onClick={() => setIsOpen(previous => !previous)}
        className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:px-6 sm:py-5 ${isOpen ? "border-gray-700 bg-gray-900/60" : "border-gray-800 bg-linear-to-r from-gray-900/70 to-gray-900/20 hover:border-gray-700"}`}
      >
        <span>
          <span className="flex items-center gap-2.5">
            <span className="text-base font-semibold tracking-tight text-gray-100">
              서비스 기능 살펴보기
            </span>
            <span className="text-xs tabular-nums text-gray-500">
              {features.length}
            </span>
          </span>
          <span className="mt-1.5 block text-xs leading-5 text-gray-400">
            서비스에서 이용할 수 있는 기능을 확인하세요.
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? `${styles.border} ${styles.icon}` : "border-gray-700/70 bg-white/3 text-gray-400 group-hover:border-gray-600 group-hover:text-white"}`}
        >
          <ChevronDown className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>
      <div
        id={`${sectionId}-content`}
        role="region"
        aria-labelledby={`${sectionId}-trigger`}
        hidden={!isOpen}
      >
        <ul className="grid grid-cols-1 gap-x-6 gap-y-5 px-1 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ id, title, description, update, items }) => (
            <li key={id} className="min-w-0 border-t border-gray-800 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold leading-6 text-gray-100">
                  {title}
                </h3>
                {update && (
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${updateStyles[update]}`}>
                    {update}
                  </span>
                )}
              </div>
              <p className="mt-2 wrap-break-word text-sm leading-6 text-gray-400">
                {description}
              </p>
              {Boolean(items?.length) && (
                <ul className="mt-3 space-y-1.5">
                  {items?.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-5 text-gray-500">
                      <span aria-hidden="true" className={`mt-2 size-1 shrink-0 rounded-full ${styles.text} bg-current`} />
                      <span className="wrap-break-word">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}