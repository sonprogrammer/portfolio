'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'
import { MShopProduct } from '@/features/mungpass/shop-products/model'



export async function getShopProducts(shopId: string): Promise<MShopProduct[]> {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.')
    }

    const { data: shop, error: shopError } = await supabase
        .from('shops')
        .select('id, status')
        .eq('id', shopId)
        .eq('owner_id', user.id)
        .maybeSingle()

    if (shopError) {
        throw new Error('매장 정보를 확인하지 못했습니다.')
    }

    if (!shop) {
        throw new Error('접근할 수 없는 매장입니다.')
    }


    const { data, error } = await supabase
        .from('shop_products')
        .select('*')
        .eq('shop_id', shopId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })

    if (error) {
        console.error(error)
        throw new Error('상품을 불러오지 못했습니다.')
    }

    return data ?? []
}