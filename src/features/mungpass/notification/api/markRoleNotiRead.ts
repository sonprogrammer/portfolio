'use server'

import { cookies } from 'next/headers'

import { supabaseServer } from '@/shared/db/supabase/server'
import { supabaseAdmin } from '@/shared/db/supabase/admin'

type ReadableRole = 'member' | 'owner'

export async function markRoleNotisRead(
    role: ReadableRole
) {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const {
        data: { user },
        error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.')
    }

    const admin = supabaseAdmin()

    const { error } = await admin
        .from('notifications')
        .update({
            read_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('role', role)
        .is('read_at', null)

    if (error) {
        console.error(error)
        throw new Error('알림 읽음 처리에 실패했습니다.')
    }
}