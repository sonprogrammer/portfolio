'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'
import { MCreateShopProductPayload, MShopProduct } from '@/features/mungpass/shop-products/model/types'


export async function createShopProduct(payload: MCreateShopProductPayload): Promise<MShopProduct> {
    const { shopId, name, price, durationMinutes, overtimeUnitMins, overtimeUnitPrice, gracePeriodMins, isActive } = payload

    if (!name.trim()) {
        throw new Error('상품명을 입력해주세요.')
    }

    if (price < 0 || durationMinutes <= 0 || overtimeUnitMins <= 0 || overtimeUnitPrice < 0 || gracePeriodMins < 0) {
        throw new Error('상품 정보를 올바르게 입력해주세요.')
    }

    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.')
    }

    const { data: shop } = await supabase
        .from('shops')
        .select('id, status')
        .eq('id', shopId)
        .eq('owner_id', user.id)
        .maybeSingle()

    if (!shop) {
        throw new Error('접근할 수 없는 매장입니다.')
    }

    // if (shop.status !== 'approved') {
    //     throw new Error('관리자 승인 후 이용할 수 있습니다.')
    // }

    const { data, error } = await supabase
        .from('shop_products')
        .insert({
            shop_id: shopId,
            name: name.trim(),
            price,
            duration_minutes: durationMinutes,
            overtime_unit_mins: overtimeUnitMins,
            overtime_unit_price: overtimeUnitPrice,
            grace_period_mins: gracePeriodMins,
            is_active: isActive,
            is_deleted: false
        })
        .select('*')
        .single()

    if (error) {
        console.error(error)
        throw new Error('상품 등록에 실패했습니다.')
    }

    return data
}