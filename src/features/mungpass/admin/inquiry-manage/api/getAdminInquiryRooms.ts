'use server'

import { MInquiryManageRoom } from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function getAdminInquiryRooms(): Promise<MInquiryManageRoom[]> {
    const { supabaseAdmin } = await requireMungpassAdmin()

    const [roomsResult, usersResult] = await Promise.all([
        supabaseAdmin
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
            .order('updated_at', { ascending: false }),

        supabaseAdmin
            .from('users')
            .select('id, name')
    ])

    if (roomsResult.error) {
        console.error(roomsResult.error)
        throw new Error('문의 목록을 불러오지 못했습니다.')
    }

    if (usersResult.error) {
        console.error(usersResult.error)
        throw new Error('회원 정보를 불러오지 못했습니다.')
    }

    const rooms = roomsResult.data ?? []
    const users = usersResult.data ?? []

    const userMap = new Map(
        users.map(user => [
            user.id,
            user.name
        ])
    )

    return rooms.map(room => ({
        id: room.id,
        userId: room.user_id,
        userName: userMap.get(room.user_id) ?? '알 수 없는 회원',
        userType: room.user_type,
        category: room.category,
        title: room.title,
        status: room.status,
        createdAt: room.created_at,
        updatedAt: room.updated_at
    }))
}