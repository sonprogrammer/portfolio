

import { MOwnerShop } from "@/features/mungpass/shop/model/owner-types"
import { OwnerShopManager } from "@/features/mungpass/shop/ui"
import { OwnerDashboard } from "@/widgets/mungpass/pages/owner/dashboard/ui"

export function MownerDashboard({ shop }: { shop: MOwnerShop }) {


    return (
        <div className="space-y-6 p-3">

            <OwnerShopManager shop={shop} />


            <OwnerDashboard shop={shop} />



        </div>

    )
}