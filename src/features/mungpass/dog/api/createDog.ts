
'use server'

import { cookies } from "next/headers"
import { MungpassDogActionResult, MDogPayload } from '@/entities/mungpass/dog/model/types';
import { supabaseServer } from "@/shared/db/supabase/server";

export async function createDog(payload: MDogPayload): Promise<MungpassDogActionResult> {
    try {
        const name = payload.name.trim()
        const birthDate = payload.birth_date
        const weight = Number(payload.weight)
        const breed = payload.breed.trim()

        if (!name || !breed || !birthDate) {
            return {
                success: false,
                message: '반려견 정보를 입력해주세요',
                dog: null
            }
        }

        if (
            !Number.isFinite(weight) ||
            weight <= 0
        ) {
            return {
                success: false,
                message: '몸무게를 확인해주세요.',
                dog: null,
            }
        }

        const cookieStore = await cookies()
        const supabase = supabaseServer(cookieStore)

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return {
                success: false,
                message: '로그인이 필요합니다.',
                dog: null,
            }
        }

        const {
            data: dog,
            error,
        } = await supabase
            .from('dogs')
            .insert({
                user_id: user.id,
                name,
                breed,
                birth_date: birthDate,
                weight
            })
            .select('id, name, breed, birth_date, weight')
            .single()

        if (error) {
            console.error('반려견 등록 실패:', error)

            return {
                success: false,
                message: '반려견 등록에 실패했습니다.',
                dog: null,
            }
        }

        return {
            success: true,
            message: '반려견 등록 성공',
            dog,
        }
    } catch (error) {
        console.error('반려견 등록 실패:', error)

        return {
            success: false,
            message: '반려견 등록 중 오류가 발생했습니다.',
            dog: null,
        }
    }
}