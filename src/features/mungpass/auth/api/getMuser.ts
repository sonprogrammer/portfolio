'use server'

import { cookies } from 'next/headers'

import { MungpassUserRes } from '@/entities/mungpass/user/model/types'
import { supabaseServer } from '@/shared/db/supabase/server'

export async function getMuser(): Promise<MungpassUserRes> {
    try {
        const cookieStore = await cookies()
        const supabase = supabaseServer(cookieStore)

        const {
            data: {
                user: authUser,
            },
        } =
            await supabase.auth.getUser()

        if (!authUser) {
            return {
                success: true,
                message:
                    '로그인된 유저가 없습니다.',
                user: null,
            }
        }

        const {
            data: user,
            error,
        } = await supabase
            .from('users')
            .select('id, name')
            .eq('id', authUser.id)
            .maybeSingle()

        if (error) {
            console.error(
                '멍패스 유저 조회 실패:',
                error,
            )

            return {
                success: false,
                message:
                    '유저 조회에 실패했습니다.',
                user: null,
            }
        }

        if (!user) {
            return {
                success: true,
                message:
                    '등록된 멍패스 유저가 없습니다.',
                user: null,
            }
        }

        return {
            success: true,
            message:
                '유저 조회 성공',
            user,
        }
    } catch (error) {
        console.error(
            '멍패스 유저 조회 실패:',
            error,
        )

        return {
            success: false,
            message:
                '유저 조회 중 오류가 발생했습니다.',
            user: null,
        }
    }
}