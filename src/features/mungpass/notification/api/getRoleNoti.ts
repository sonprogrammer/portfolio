'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'

import { MRoleNotifications } from '../model/types'

export async function getRoleNoti(): Promise<MRoleNotifications> {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const {
        data: { user },
        error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.')
    }

    const [
        memberResult,
        ownerResult,
        adminResult
    ] = await Promise.all([
        supabase
            .from('notifications')
            .select('id', {
                count: 'exact',
                head: true
            })
            .eq('user_id', user.id)
            .eq('role', 'member')
            .is('read_at', null),

        supabase
            .from('notifications')
            .select('type')
            .eq('user_id', user.id)
            .eq('role', 'owner')
            .is('read_at', null),

        supabase
            .from('notifications')
            .select('id', {
                count: 'exact',
                head: true
            })
            .eq('role', 'admin')
            .is('resolved_at', null)
    ])

    if (memberResult.error) {
        console.error(memberResult.error)
        throw new Error('일반 사용자 알림을 불러오지 못했습니다.')
    }

    if (ownerResult.error) {
        console.error(ownerResult.error)
        throw new Error('사장 알림을 불러오지 못했습니다.')
    }

    if (adminResult.error) {
        console.error(adminResult.error)
        throw new Error('관리자 알림을 불러오지 못했습니다.')
    }

    const ownerNotifications = ownerResult.data ?? []

    const hasRejectedNotification = ownerNotifications.some(
        notification =>
            notification.type === 'shop_rejected'
    )

    return {
        member: {
            count: memberResult.count ?? 0,
            color: 'orange'
        },

        owner: {
            count: ownerNotifications.length,
            color: hasRejectedNotification
                ? 'red'
                : 'blue'
        },

        admin: {
            count: adminResult.count ?? 0,
            color: 'orange'
        }
    }
}