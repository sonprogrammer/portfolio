"use client"

import { useId, useState } from "react"
import { Dog, ShieldCheck, Store } from "lucide-react"
import { mungpassFeatures } from "@/shared/config/mungpass"

type Role = "user" | "owner" | "admin"

const roles = [
  { value: "user", label: "일반 이용자", icon: Dog },
  { value: "owner", label: "사장님", icon: Store },
  { value: "admin", label: "관리자", icon: ShieldCheck }
] as const

const updateStyles = {
  신규: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  개선: "border-blue-500/20 bg-blue-500/10 text-blue-400"
}

export function MungpassFeatures() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const sectionId = useId()

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {roles.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedRole === value
          return (
            <button
              key={value}
              id={`${sectionId}-${value}`}
              type="button"
              aria-expanded={isSelected}
              aria-controls={`${sectionId}-content`}
              onClick={() => setSelectedRole(previous => previous === value ? null : value)}
              className={`flex min-h-12 items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:gap-2 sm:py-4 sm:text-sm ${isSelected ? "border-orange-500/40 bg-orange-500/10 text-orange-400" : "border-gray-800 bg-gray-900/40 text-gray-400 hover:border-gray-700 hover:text-white"}`}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
      <div
        id={`${sectionId}-content`}
        role="region"
        aria-labelledby={selectedRole ? `${sectionId}-${selectedRole}` : undefined}
        hidden={selectedRole === null}
        className="mt-4 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/20"
      >
        {selectedRole && (
          <ul key={selectedRole} className="feature-enter grid grid-cols-1 items-start gap-3 p-3 sm:grid-cols-2 sm:p-5 lg:grid-cols-3 lg:p-6">
            {mungpassFeatures[selectedRole].map(feature => (
              <li key={feature.id} className="min-w-0 rounded-xl border border-gray-800/60 bg-gray-950/20 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold leading-6 text-gray-100">
                    {feature.title}
                  </h3>
                  {feature.update && (
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${updateStyles[feature.update]}`}>
                      {feature.update}
                    </span>
                  )}
                </div>
                <p className="mt-2 wrap-break-word text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx>{`
        @keyframes feature-enter {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .feature-enter { animation: feature-enter 180ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .feature-enter { animation: none; }
        }
      `}</style>
    </div>
  )
}