'use server'

import { MungpassDogActionResult } from '@/entities/mungpass/dog/model/types';
import { supabaseServer } from '@/shared/db/supabase/server';
import { cookies } from "next/headers"

export async function getMdog(): Promise<MungpassDogActionResult> {
    try {
        const cookieStore = await cookies()

        const supabase = supabaseServer(cookieStore)

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return {
                success: false,
                message: 'login required',
                dog: null
            }
        }

        const { data: dog, error } = await supabase.from('dogs').select('id, name, breed, birth_date, weight').eq('user_id', user.id).maybeSingle()

        if (error) {
            return {
                success: false,
                message: 'failed to get dog',
                dog: null
            }
        }

        return {
            success: true,
            message: 'success',
            dog: dog
        }
    } catch (error) {
        console.error('반려견 조회 실패:', error)

        return {
            success: false,
            message: '반려견 조회 중 오류가 발생했습니다.',
            dog: null,
        }
    }
}
