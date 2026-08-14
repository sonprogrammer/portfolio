export interface MShopProduct {
    id: string
    shop_id: string
    name: string
    price: number
    duration_minutes: number
    overtime_unit_mins: number
    overtime_unit_price: number
    grace_period_mins: number
    is_active: boolean
    is_deleted: boolean
    created_at: string
}

export interface MShopProductPayload {
    name: string
    price: number
    durationMinutes: number
    overtimeUnitMins: number
    overtimeUnitPrice: number
    gracePeriodMins: number
    isActive: boolean
}

export interface MCreateShopProductPayload extends MShopProductPayload {
    shopId: string
}

export interface MUpdateShopProductPayload extends MShopProductPayload {
    shopId: string
    productId: string
}

export interface MDeleteShopProductPayload {
    shopId: string
    productId: string
}