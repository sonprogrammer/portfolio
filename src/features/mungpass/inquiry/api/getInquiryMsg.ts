'use server';

import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import { MInquiryMessage } from '../model/types';

export async function getInquiryMsg(
    roomId: string
): Promise<MInquiryMessage[]> {
    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data: room } = await supabase
        .from('inquiries_room')
        .select('id')
        .eq('id', roomId)
        .eq('user_id', authData.user.id)
        .maybeSingle();

    if (!room) {
        throw new Error('접근할 수 없는 문의입니다.');
    }

    const { data, error } = await supabase
        .from('inquiry_messages')
        .select(`
            id,
            room_id,
            sender_id,
            sender_role,
            message,
            created_at
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('문의 메시지 조회 실패:', error);
        throw new Error('메시지를 불러오지 못했습니다.');
    }

    return data ?? [];
}