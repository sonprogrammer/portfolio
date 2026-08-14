'use server';

import { cookies } from 'next/headers';
import { supabaseServer } from '@/shared/db/supabase/server';
import { MShopProduct } from '@/features/mungpass/check-in/model/types';

export async function getShopProducts(shopId: string): Promise<MShopProduct[]> {
    if (!shopId) return [];

    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data, error } = await supabase
        .from('shop_products')
        .select(`
            id,
            shop_id,
            name,
            price,
            duration_minutes,
            overtime_unit_mins,
            overtime_unit_price,
            grace_period_mins
        `)
        .eq('shop_id', shopId)
        .eq('is_active', true)
        .eq('is_deleted', false)
        .order('price', { ascending: true });

    if (error) {
        console.error('매장 상품 조회 실패:', error);
        throw new Error('상품을 불러오지 못했습니다.');
    }

    return data ?? [];
}