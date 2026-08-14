'use server';

import { addMinutes } from 'date-fns';
import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import {
    MCheckInPayload,
    MCheckInResult
} from '@/features/mungpass/check-in/model/types';

export async function createCheckIn(payload: MCheckInPayload): Promise<MCheckInResult> {
    const { shopId, productId, dogId } = payload;

    if (!shopId || !productId || !dogId) {
        return {
            success: false,
            message: '체크인 정보가 올바르지 않습니다.'
        };
    }

    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        return {
            success: false,
            message: '로그인이 필요합니다.'
        };
    }

    const userId = authData.user.id;

    const { data: shop, error: shopError } = await supabase
        .from('shops')
        .select('id, owner_id, is_demo')
        .eq('id', shopId)
        .single();

    if (shopError || !shop) {
        return {
            success: false,
            message: '존재하지 않는 매장입니다.'
        };
    }

    if (!shop.is_demo && shop.owner_id !== userId) {
        return {
            success: false,
            message: '체크인할 수 없는 매장입니다.'
        };
    }

    const { data: product, error: productError } = await supabase
        .from('shop_products')
        .select(`
            id,
            shop_id,
            price,
            duration_minutes
        `)
        .eq('id', productId)
        .eq('shop_id', shopId)
        .eq('is_active', true)
        .eq('is_deleted', false)
        .single();

    if (productError || !product) {
        return {
            success: false,
            message: '사용할 수 없는 상품입니다.'
        };
    }

    const { data: currentUsage } = await supabase
        .from('usage_logs')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'staying')
        .maybeSingle();

    if (currentUsage) {
        return {
            success: false,
            message: '이미 이용 중인 매장이 있습니다.'
        };
    }

    const startedAt = new Date();
    const expectedEndedAt = addMinutes(startedAt, product.duration_minutes);

    const { error: insertError } = await supabase
        .from('usage_logs')
        .insert({
            shop_id: shopId,
            product_id: productId,
            user_id: userId,
            dog_id: dogId,
            started_at: startedAt.toISOString(),
            expected_ended_at: expectedEndedAt.toISOString(),
            status: 'staying',
            extra_charge: 0,
            total_price: product.price
        });

    if (insertError) {
        console.error('체크인 실패:', insertError);

        return {
            success: false,
            message: '체크인에 실패했습니다.'
        };
    }

    return {
        success: true,
        message: '체크인이 완료되었습니다.'
    };
}