'use client'

import { useMungpassNavStore } from "@/features/mungpass/nav/model"
import { useGetMyShop } from "@/features/mungpass/shop/model"
import { NoShopCard } from "@/features/mungpass/shop/ui"
import { MownerChart } from "@/widgets/mungpass/pages/owner/pages/ui/MownerChart"
import { MownerDashboard } from "@/widgets/mungpass/pages/owner/pages/ui/MownerDashboard"
import { MownerShop } from "@/widgets/mungpass/pages/owner/pages/ui/MownerShop"
import { MownerUsage } from "@/widgets/mungpass/pages/owner/pages/ui/MownerUsage"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useShallow } from "zustand/shallow"

export function MownerPages() {
  const { activePage } = useMungpassNavStore(useShallow(state => ({
    activePage: state.activePage,
  })))
  const [modalOpen, setModalOpen] = useState(false)

  const { data: shop, isPending: shopPending } = useGetMyShop()

  if (shopPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!shop) {
    return (
      <NoShopCard isOpen={modalOpen} setIsOpen={setModalOpen} />
    );
  }

  const page = activePage ?? 'dashboard'

  return (
    <div className="">
      {page === 'dashboard' && <MownerDashboard shop={shop}/>}
      {page === 'usage' && <MownerUsage shop={shop}/>}
      {page === 'sales' && <MownerChart shop={shop} />}
      {page === 'shop' && <MownerShop shop={shop} />}
      <div>

      </div>
    </div>
  )
}