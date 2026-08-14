import { useFuellyNavStore } from "@/features/fuelly/nav/model"
import { FUELLY_NAV_ITEMS } from "@/shared/config/fuelly/fuelly-nav"
import { useShallow } from "zustand/shallow"




export function FuellyNav() {
    const { activePage, setActivePage } = useFuellyNavStore(useShallow((state) => ({
        activePage: state.activePage,
        setActivePage: state.setActivePage
    })))

    return (
        <nav className="flex rounded-xl border border-gray-700 bg-gray-900 p-1">
            {FUELLY_NAV_ITEMS.map(itme => {
                const isActive = activePage === itme.path

                return (
                    <button
                        key={itme.path}
                        type="button"
                        onClick={() => setActivePage(itme.path)}
                        className={`min-w-24 rounded-lg px-5 py-2 text-sm font-semibold transition ${isActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {itme.label}
                    </button>
                )
            })}
        </nav>
    )
}