'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'
import { MDeleteShopProductPayload } from '@/features/mungpass/shop-products/model/types'


export async function deleteShopProduct({ shopId, productId }: MDeleteShopProductPayload) {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.')
    }

    const { data: shop } = await supabase
        .from('shops')
        .select('id')
        .eq('id', shopId)
        .eq('owner_id', user.id)
        .maybeSingle()

    if (!shop) {
        throw new Error('접근할 수 없는 매장입니다.')
    }

    const { data, error } = await supabase
        .from('shop_products')
        .update({
            is_deleted: true,
            is_active: false
        })
        .eq('id', productId)
        .eq('shop_id', shopId)
        .eq('is_deleted', false)
        .select('id')
        .maybeSingle()

    if (error) {
        console.error(error)
        throw new Error('상품 삭제에 실패했습니다.')
    }

    if (!data) {
        throw new Error('상품을 찾을 수 없습니다.')
    }

    return {
        success: true
    }
}