'use server'

import { cookies } from 'next/headers'
import { subDays } from 'date-fns'
import { supabaseServer } from '@/shared/db/supabase/server'
import { MSalesUsage } from '../model/types'


export async function getSalesData(shopId: string): Promise<MSalesUsage[]> {
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

    const fromDate = subDays(new Date(), 35).toISOString()

    const { data: usages, error } = await supabase
        .from('usage_logs')
        .select(`
            id,
            product_id,
            ended_at,
            total_price
        `)
        .eq('shop_id', shopId)
        .eq('status', 'completed')
        .gte('ended_at', fromDate)
        .order('ended_at', { ascending: true })

    if (error) {
        console.error(error)
        throw new Error('매출 데이터를 불러오지 못했습니다.')
    }

    if (!usages?.length) {
        return []
    }

    const productIds = [...new Set(usages.map(item => item.product_id))]

    const { data: products, error: productError } = await supabase
        .from('shop_products')
        .select('id, name')
        .in('id', productIds)

    if (productError) {
        console.error(productError)
        throw new Error('상품 정보를 불러오지 못했습니다.')
    }

    const productMap = new Map(
        (products ?? []).map(product => [product.id, product.name])
    )

    return usages
        .filter(item => item.ended_at)
        .map(item => ({
            id: item.id,
            productId: item.product_id,
            productName: productMap.get(item.product_id) ?? '삭제된 상품',
            endedAt: item.ended_at,
            totalPrice: Number(item.total_price)
        }))
}