'use server';

import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import { MOwnerDashboardUsage } from '../model/types';

export async function getOwnerDashboardUsage(
    shopId: string
): Promise<MOwnerDashboardUsage> {
    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const {
        data: { user },
        error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data: shop, error: shopError } = await supabase
        .from('shops')
        .select('id')
        .eq('id', shopId)
        .eq('owner_id', user.id)
        .maybeSingle();

    if (shopError) {
        console.error('매장 확인 실패:', shopError);
        throw new Error('매장 정보를 확인하지 못했습니다.');
    }

    if (!shop) {
        throw new Error('접근할 수 없는 매장입니다.');
    }

    const { data: currentLogs, error } = await supabase
        .from('usage_logs')
        .select(`
            *,
            product:shop_products (
                name
            ),
            dog:dogs(*)
        `)
        .eq('shop_id', shopId)
        .eq('status', 'staying')
        .order('started_at', { ascending: false });

    if (error) {
        console.error('이용 현황 조회 실패:', error);
        throw new Error('이용 현황을 불러오지 못했습니다.');
    }

    const logs = currentLogs ?? [];

    const expectedSales = logs.reduce((total, usage) => {
        return total + Number(usage.total_price);
    }, 0);

    return {
        currentCount: logs.length,
        expectedSales,
        currentLogs: logs
    };
}