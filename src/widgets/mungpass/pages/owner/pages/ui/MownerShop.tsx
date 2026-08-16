import { ProductManager } from "@/features/mungpass/shop-products/ui"
import { MOwnerShop } from "@/features/mungpass/shop/model/owner-types"


interface MownerShopProps {
    shop: MOwnerShop
}

export function MownerShop({ shop }: MownerShopProps) {
    return (
        <div className="space-y-6 pt-3">
            <ProductManager shop={shop} />
        </div>
    )
}