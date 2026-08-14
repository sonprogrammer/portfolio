'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'
import { MOwnerUsageDetail } from '../model/types'

export async function getCompletedUsages(shopId: string): Promise<MOwnerUsageDetail[]> {
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
        .from('usage_logs')
        .select(`
            *,
            dog:dogs(*),
            product:shop_products (
                name,
                overtime_unit_mins,
                overtime_unit_price,
                grace_period_mins
            )
        `)
        .eq('shop_id', shopId)
        .eq('status', 'completed')
        .order('ended_at', { ascending: false })

    if (error) {
        throw new Error('이용 내역을 불러오지 못했습니다.')
    }

    return (data ?? []) as MOwnerUsageDetail[]
}