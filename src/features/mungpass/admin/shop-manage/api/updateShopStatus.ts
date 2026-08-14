'use server'

import { MUpdateShopStatusPayload } from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function updateShopStatus({
    shopId,
    status
}: MUpdateShopStatusPayload) {
    const { supabaseAdmin } = await requireMungpassAdmin()

    const { data: shop, error: shopError } = await supabaseAdmin
        .from('shops')
        .select('id, status')
        .eq('id', shopId)
        .maybeSingle()

    if (shopError) {
        console.error(shopError)
        throw new Error('매장 정보를 확인하지 못했습니다.')
    }

    if (!shop) {
        throw new Error('존재하지 않는 매장입니다.')
    }

    if (shop.status !== 'pending') {
        throw new Error('이미 심사가 완료된 매장입니다.')
    }

    const now = new Date().toISOString()

    const updateData = status === 'approved'
        ? {
            status: 'approved',
            approved_at: now,
            rejected_at: null
        }
        : {
            status: 'rejected',
            approved_at: null,
            rejected_at: now
        }

    const { data, error } = await supabaseAdmin
        .from('shops')
        .update(updateData)
        .eq('id', shopId)
        .eq('status', 'pending')
        .select('id, status')
        .single()

    if (error) {
        console.error(error)
        throw new Error('입점 심사 처리에 실패했습니다.')
    }

    return data
}