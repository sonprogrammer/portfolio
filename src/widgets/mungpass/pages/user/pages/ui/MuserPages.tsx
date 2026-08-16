'use client'

import { useMungpassNavStore } from "@/features/mungpass/nav/model";
import { GlobalLiveUsage } from "@/widgets/mungpass/pages/user/dog/ui";
import { MuserHome } from "@/widgets/mungpass/pages/user/pages/ui/MuserHome";
import { MuserInquiry } from "@/widgets/mungpass/pages/user/pages/ui/MuserInquiry";
import { MuserShops } from "@/widgets/mungpass/pages/user/pages/ui/MuserShops";
import { MuserUsages } from "@/widgets/mungpass/pages/user/pages/ui/MuserUsages";
import { useShallow } from "zustand/shallow";

export function MuserPages() {
  const {activePage} = useMungpassNavStore(useShallow( state => ({
    activePage: state.activePage,
  })))

  const page = activePage ?? 'home'

  return (
    <div className="">

      {page === 'home' && <MuserHome />}
      {page === 'shops' && <MuserShops />}
      {page === 'usage' && <MuserUsages />}
      {page === 'inquiry' && <MuserInquiry />}
      <div className="relative">

        <GlobalLiveUsage />
      </div>
    </div>
  )
}