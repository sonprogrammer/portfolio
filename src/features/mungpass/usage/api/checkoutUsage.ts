'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'

import { MCheckoutUsagePayload, MCheckoutUsageResult } from '../model/types'
import { calculateCheckoutPrice } from '@/features/mungpass/usage/lib/calculateCheckoutPrice'

interface CheckoutProduct {
    overtime_unit_mins: number
    overtime_unit_price: number
    grace_period_mins: number
}


export async function checkoutUsage({ shopId, usageId }: MCheckoutUsagePayload): Promise<MCheckoutUsageResult> {
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

    if (shop.status !== 'approved') {
        throw new Error('관리자 승인 후 이용할 수 있습니다.')
    }

    const { data: usage, error: usageError } = await supabase
        .from('usage_logs')
        .select(`
            id,
            expected_ended_at,
            total_price,
            extra_charge,
            product:shop_products!product_id (
                overtime_unit_mins,
                overtime_unit_price,
                grace_period_mins
            )
        `)
        .eq('id', usageId)
        .eq('shop_id', shopId)
        .eq('status', 'staying')
        .maybeSingle()

    if (usageError) {
        console.error(usageError)
        throw new Error('이용 정보를 확인하지 못했습니다.')
    }

    if (!usage || !usage.product) {
        throw new Error('이용 중인 기록을 찾을 수 없습니다.')
    }

    const product = usage.product as unknown as CheckoutProduct

    const endedAt = new Date()
    const basePrice = Number(usage.total_price) - Number(usage.extra_charge ?? 0)
    console.log('usage', usage)

    const checkout = calculateCheckoutPrice({
        expectedEndedAt: usage.expected_ended_at,
        checkoutAt: endedAt,
        basePrice,
        gracePeriodMins: product.grace_period_mins,
        overtimeUnitMins: product.overtime_unit_mins,
        overtimeUnitPrice: product.overtime_unit_price

    })

    const { data: updatedUsage, error } = await supabase
        .from('usage_logs')
        .update({
            status: 'completed',
            ended_at: endedAt.toISOString(),
            extra_charge: checkout.extraCharge,
            total_price: checkout.totalPrice
        })
        .eq('id', usageId)
        .eq('shop_id', shopId)
        .eq('status', 'staying')
        .select('id')
        .maybeSingle()

    if (error) {
        console.error(error)
        throw new Error('체크아웃에 실패했습니다.')
    }

    if (!updatedUsage) {
        throw new Error('이미 체크아웃된 이용 내역입니다.')
    }

    return {
        usageId,
        endedAt: endedAt.toISOString(),
        overtimeMinutes: checkout.overtimeMinutes,
        extraCharge: checkout.extraCharge,
        totalPrice: checkout.totalPrice
    }
}