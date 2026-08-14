'use server';

import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import {
    MCreateShopPayload,
    MCreateShopResult
} from '../model/owner-types';

const DEMO_LATITUDE = 37.5665;
const DEMO_LONGITUDE = 126.978;

export async function createShop(
    payload: MCreateShopPayload
): Promise<MCreateShopResult> {
    const name = payload.name.trim();
    const addressName = payload.addressName.trim();
    const roadAddressName = payload.roadAddressName.trim();
    const phone = payload.phone.trim();

    if (!name || !addressName) {
        return {
            success: false,
            message: '매장명과 주소를 입력해주세요.',
            shop: null
        };
    }

    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const {
        data: { user },
        error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return {
            success: false,
            message: '로그인이 필요합니다.',
            shop: null
        };
    }

    const { data: existingShop, error: existingError } = await supabase
        .from('shops')
        .select('id')
        .eq('owner_id', user.id)
        .maybeSingle();

    if (existingError) {
        return {
            success: false,
            message: '매장 정보를 확인하지 못했습니다.',
            shop: null
        };
    }

    if (existingShop) {
        return {
            success: false,
            message: '이미 등록된 매장이 있습니다.',
            shop: null
        };
    }

    const { data: shop, error } = await supabase
        .from('shops')
        .insert({
            owner_id: user.id,
            name,
            address_name: addressName,
            road_address_name: roadAddressName || null,
            phone: phone || null,
            latitude: DEMO_LATITUDE,
            longitude: DEMO_LONGITUDE,
            status: 'pending',
            is_demo: false
        })
        .select('*')
        .single();

    if (error || !shop) {
        console.error('매장 생성 실패:', error);

        return {
            success: false,
            message: '매장 등록에 실패했습니다.',
            shop: null
        };
    }

    return {
        success: true,
        message: '매장이 등록되었습니다.',
        shop
    };
}