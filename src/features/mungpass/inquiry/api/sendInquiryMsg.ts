'use server';

import { cookies } from 'next/headers';

import { supabaseServer } from '@/shared/db/supabase/server';
import {
    MInquiryMessage,
    MSendInquiryMessagePayload
} from '../model/types';

export async function sendInquiryMsg(
    payload: MSendInquiryMessagePayload
): Promise<MInquiryMessage> {
    const message = payload.message.trim();

    if (!message) {
        throw new Error('메시지를 입력해주세요.');
    }

    const cookieStore = await cookies();
    const supabase = supabaseServer(cookieStore);

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data: room } = await supabase
        .from('inquiries_room')
        .select('id')
        .eq('id', payload.roomId)
        .eq('user_id', authData.user.id)
        .maybeSingle();

    if (!room) {
        throw new Error('접근할 수 없는 문의입니다.');
    }

    const { data, error } = await supabase
        .from('inquiry_messages')
        .insert({
            room_id: payload.roomId,
            sender_id: authData.user.id,
            sender_role: payload.senderRole,
            message
        })
        .select(`
            id,
            room_id,
            sender_id,
            sender_role,
            message,
            created_at
        `)
        .single();

    if (error || !data) {
        console.error('메시지 전송 실패:', error);
        throw new Error('메시지 전송에 실패했습니다.');
    }

    if (payload.senderRole === 'admin') {
        await supabase
            .from('inquiries_room')
            .update({
                status: 'answered',
                updated_at: new Date().toISOString()
            })
            .eq('id', payload.roomId);
    } else {
        await supabase
            .from('inquiries_room')
            .update({
                status: 'waiting',
                updated_at: new Date().toISOString()
            })
            .eq('id', payload.roomId);
    }

    return data;
}