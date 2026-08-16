'use client'

import { useMungpassNavStore } from "@/features/mungpass/nav/model"
import { MadminDashboard } from "@/widgets/mungpass/pages/admin/pages/ui/MadminDashboard"
import { MadminInquiries } from "@/widgets/mungpass/pages/admin/pages/ui/MadminInquiries"
import { MadminShops } from "@/widgets/mungpass/pages/admin/pages/ui/MadminShops"
import { MadminUsers } from "@/widgets/mungpass/pages/admin/pages/ui/MadminUsers"


export function MadminPages() {
  const activePage = useMungpassNavStore(state => state.activePage)

  const page = activePage ?? 'dashboard'

  return (
    <div className="">
      {page ==='dashboard' && <MadminDashboard/>}
      {page ==='shops' && <MadminShops />}
      {page ==='users' && <MadminUsers/>}
      {page ==='inquiries' && <MadminInquiries />}
    </div>
  )
}