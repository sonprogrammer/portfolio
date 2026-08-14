import { ShopManageManager } from '@/features/mungpass/admin/shop-manage/ui'

export function MadminShops() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-extrabold text-gray-100">
                    상점 관리
                </h1>

                <p className="mt-1 text-sm font-semibold text-gray-500">
                    입점 신청 현황을 확인하고 승인 또는 반려할 수 있습니다.
                </p>
            </div>

            <ShopManageManager />
        </div>
    )
}