import 'server-only'

import { cookies } from 'next/headers'

import { supabaseServer } from './server'
import { supabaseAdmin } from '@/shared/db/supabase/admin'


export async function requireMungpassAdmin() {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const {
        data: { user },
        error
    } = await supabase.auth.getUser()

    if (error || !user) {
        throw new Error('로그인이 필요합니다.')
    }

   

    return {
        user,
        supabaseAdmin: supabaseAdmin()
    }
}