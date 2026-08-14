'use server';

import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import { MInquiryRoom } from '../model/types';

export async function getInquiryRooms(): Promise<MInquiryRoom[]> {
    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data, error } = await supabase
        .from('inquiries_room')
        .select(`
            id,
            user_id,
            user_type,
            category,
            title,
            status,
            created_at,
            updated_at
        `)
        .eq('user_id', authData.user.id)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('문의 목록 조회 실패:', error);
        throw new Error('문의 목록을 불러오지 못했습니다.');
    }

    return data ?? [];
}