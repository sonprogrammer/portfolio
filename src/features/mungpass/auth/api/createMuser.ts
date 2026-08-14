'use server'

import { cookies } from 'next/headers'

import { MungpassUserRes } from '@/entities/mungpass/user/model/types'
import { supabaseServer } from '@/shared/db/supabase/server'

export async function createMuser(
    name: string,
): Promise<MungpassUserRes> {
    try {
        const trimmedName = name.trim()

        if (!trimmedName) {
            return {
                success: false,
                message: '닉네임을 입력해주세요.',
                user: null,
            }
        }

        const cookieStore = await cookies()
        const supabase = supabaseServer(cookieStore)

        const {
            data: {
                user: authUser,
            },
        } =
            await supabase.auth.getUser()

        let authUserId = authUser?.id


        if (!authUserId) {
            const {
                data,
                error,
            } =
                await supabase.auth.signInAnonymously()

            if (error || !data.user) {
                console.error(
                    'Supabase 익명 로그인 실패:',
                    error,
                )

                return {
                    success: false,
                    message:
                        '로그인에 실패했습니다.',
                    user: null,
                }
            }

            authUserId =
                data.user.id
        }

        const {
            data: existUser,
            error: existUserError,
        } = await supabase
            .from('users')
            .select('id, name')
            .eq('id', authUserId)
            .maybeSingle()

        if (existUserError) {
            console.error(
                '멍패스 유저 조회 실패:',
                existUserError,
            )

            return {
                success: false,
                message:
                    '유저 조회에 실패했습니다.',
                user: null,
            }
        }

        if (existUser) {
            return {
                success: true,
                message:
                    '이미 로그인되어 있습니다.',
                user: existUser,
            }
        }

        const {
            data: user,
            error: createError,
        } = await supabase
            .from('users')
            .insert({
                id: authUserId,
                name: trimmedName,
            })
            .select('id, name')
            .single()

        if (createError) {
            console.error(
                '멍패스 유저 생성 실패:',
                createError,
            )

            return {
                success: false,
                message:
                    '유저 생성에 실패했습니다.',
                user: null,
            }
        }

        return {
            success: true,
            message:
                '멍패스 계정 생성 및 로그인 성공',
            user,
        }
    } catch (error) {
        console.error(
            '멍패스 계정 생성 실패:',
            error,
        )

        return {
            success: false,
            message:
                '계정 생성 중 오류가 발생했습니다.',
            user: null,
        }
    }
}