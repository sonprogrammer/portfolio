'use server'

import { cookies } from 'next/headers'
import { format } from 'date-fns'

import { supabaseServer } from '@/shared/db/supabase/server'

import { MSalesInsight } from '../model/types'

export async function getTodaySalesInsight(shopId: string): Promise<MSalesInsight | null> {
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

    const today = format(new Date(), 'yyyy-MM-dd')

    const { data, error } = await supabase
        .from('shop_ai_insight')
        .select(`
            id,
            shop_id,
            analysis_date,
            insight,
            created_at
        `)
        .eq('shop_id', shopId)
        .eq('analysis_date', today)
        .limit(1)

    if (error) {
        console.error(error)
        throw new Error('AI 분석 결과를 불러오지 못했습니다.')
    }

    return data?.[0] ?? null
}