'use server'

import { MOwnerShop } from "@/features/mungpass/shop/model/owner-types"
import { supabaseServer } from "@/shared/db/supabase/server"
import { cookies } from "next/headers"

export async function getMyShop(): Promise<MOwnerShop | null>  {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.');
    }

    const { data: shopInfo, error } = await supabase.from('shops').select('*').eq('owner_id', user.id).maybeSingle()

    if (error) {
        throw new Error('매장 정보를 불러오지 못했습니다.')
    }

    return shopInfo ?? null
}