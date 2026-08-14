'use server'

import { cookies } from 'next/headers'
import { supabaseServer } from '@/shared/db/supabase/server'
import { ApiRes } from '@/shared/mungpass/model/types'
import { MyPetUsageAllInfo, UsageStatus } from '../model/types'

interface GetMyPetUsageParams {
    statuses?: UsageStatus[]
}

export const getMyPetUsage = async ({
    statuses = ['staying'],
}: GetMyPetUsageParams = {}): Promise<ApiRes<MyPetUsageAllInfo[]>> => {
    try {
        const cookieStore = await cookies()
        const supabase = supabaseServer(cookieStore)

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
            return {
                success: false,
                message: '유효하지 않은 사용자입니다.',
            }
        }

        const { data, error } = await supabase
            .from('usage_logs')
            .select(`
    *,
    dog:dogs(*),
    product:shop_products(*),
    shop:shops(name)
  `)
            .eq('user_id', user.id)
            .in('status', statuses)
            .order('started_at', { ascending: false })

        if (error) {
            console.error('나의 강아지 체크인 정보 조회 error', error)

            return {
                success: false,
                message: '체크인 정보 불러오기 실패',
            }
        }

        return {
            success: true,
            data: (data as MyPetUsageAllInfo[]) ?? [],
        }
    } catch (error) {
        console.error('나의 강아지 체크인 정보 가져오기 error', error)

        return {
            success: false,
            message: '체크인 정보 불러오기 실패',
        }
    }
}