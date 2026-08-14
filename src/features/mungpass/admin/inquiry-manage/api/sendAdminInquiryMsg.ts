'use server'

import {
    MInquiryManageMessage,
    MSendAdminInquiryMessagePayload
} from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function sendAdminInquiryMsg({
    roomId,
    message
}: MSendAdminInquiryMessagePayload): Promise<MInquiryManageMessage> {
    const { supabaseAdmin, user } = await requireMungpassAdmin()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
        throw new Error('답변 내용을 입력해주세요.')
    }

    const { data: room, error: roomError } = await supabaseAdmin
        .from('inquiries_room')
        .select('id, status')
        .eq('id', roomId)
        .maybeSingle()

    if (roomError) {
        console.error(roomError)
        throw new Error('문의 정보를 확인하지 못했습니다.')
    }

    if (!room) {
        throw new Error('존재하지 않는 문의입니다.')
    }

    if (room.status === 'closed') {
        throw new Error('종료된 문의에는 답변할 수 없습니다.')
    }

    const { data, error } = await supabaseAdmin
        .from('inquiry_messages')
        .insert({
            room_id: roomId,
            sender_id: user.id,
            sender_role: 'admin',
            message: trimmedMessage
        })
        .select(`
            id,
            room_id,
            sender_id,
            sender_role,
            message,
            created_at
        `)
        .single()

    if (error) {
        console.error(error)
        throw new Error('답변 전송에 실패했습니다.')
    }

    const { error: updateError } = await supabaseAdmin
        .from('inquiries_room')
        .update({
            status: 'answered',
            updated_at: new Date().toISOString()
        })
        .eq('id', roomId)

    if (updateError) {
        console.error(updateError)
        throw new Error('문의 상태 변경에 실패했습니다.')
    }

    return {
        id: data.id,
        roomId: data.room_id,
        senderId: data.sender_id,
        senderRole: data.sender_role,
        message: data.message,
        createdAt: data.created_at
    }
}