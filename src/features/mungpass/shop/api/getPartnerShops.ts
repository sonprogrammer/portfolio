'use server'

import { supabaseServer } from "@/shared/db/supabase/server";
import { ApiRes } from "@/shared/mungpass/model/types";
import { cookies } from "next/headers";



interface PartnerShop {
    id: string;
    kakao_place_id: string;
}

export const getPartnerShops = async (kakaoId: string[]): Promise<ApiRes<PartnerShop[]>> => {
    try {
        const cookieStore = await cookies()
        const supabase = await supabaseServer(cookieStore)

        const { data, error } = await supabase.from('shops').select('id, kakao_place_id')
            .in('kakao_place_id', kakaoId)

        if (error) {
            throw error
        }

        return { success: true, data: data ?? [] }
    } catch (error) {
        console.error('멍패스 제휴매장 찾기 실패 api', error)
        return { success: false, message: '제휴매장 불러오기 실패' }
    }
}