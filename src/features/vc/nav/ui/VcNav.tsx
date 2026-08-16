'use client'

import { VC_NAV_ITEMS } from "@/shared/config/vc/vc-nav"
import { useVcNavStore } from "@/features/vc/nav/model"
import { useShallow } from "zustand/shallow"

export function VcNav() {
  const { activePage, setActivePage } = useVcNavStore(useShallow(
    (state) => ({
      activePage: state.activePage,
      setActivePage: state.setActivePage
    })
  ))

  return (
    <nav className="flex w-full overflow-x-auto rounded-xl border border-gray-700 bg-gray-900 p-1 sm:w-auto">
      {VC_NAV_ITEMS.map(item => {
        const isActive = activePage === item.path;

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => setActivePage(item.path)}
            className={`min-w-0 flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition sm:min-w-24 sm:flex-none sm:px-5 sm:text-sm ${isActive
                ? "bg-red-500/80 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  )
}