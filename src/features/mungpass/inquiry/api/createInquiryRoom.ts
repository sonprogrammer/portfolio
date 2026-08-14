'use server';

import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import { MCreateInquiryRoomPayload, MInquiryRoom } from '../model/types';

export async function createInquiryRoom(
    payload: MCreateInquiryRoomPayload
): Promise<MInquiryRoom> {
    const category = payload.category.trim();
    const title = payload.title.trim();

    if (!category || !title) {
        throw new Error('문의 정보를 입력해주세요.');
    }

    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data, error } = await supabase
        .from('inquiries_room')
        .insert({
            user_id: authData.user.id,
            user_type: payload.userType,
            category,
            title,
            status: 'waiting'
        })
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
        .single();

    if (error || !data) {
        console.error('문의방 생성 실패:', error);
        throw new Error('문의 생성에 실패했습니다.');
    }

    return data;
}