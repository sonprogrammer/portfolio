'use server'

import { MungpassUser } from '@/entities/mungpass/user/model/types'
import { MInquiryManageMessage } from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function getAdminInquiryMsg(
    roomId: string
): Promise<MInquiryManageMessage[]> {
    const { supabaseAdmin } = await requireMungpassAdmin()

    const { data, error } = await supabaseAdmin
        .from('inquiry_messages')
        .select(`
            id,
            room_id,
            user:users(id, name),
            sender_role,
            message,
            created_at
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })


    if (error) {
        console.error(error)
        throw new Error('문의 내용을 불러오지 못했습니다.')
    }

    return (data ?? []).map(message => {
        const sender = message.user as unknown as MungpassUser
        
        if (!message.user) {
        throw new Error('문의 작성자 정보를 찾을 수 없습니다.')
    }
        return{

            id: message.id,
            roomId: message.room_id,
            senderId: sender.id,
            senderInfo: sender,
            senderRole: message.sender_role,
            message: message.message,
            createdAt: message.created_at
        }
    })
}