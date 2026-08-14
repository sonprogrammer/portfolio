'use server'

import { MCheckInShop } from './../model/types';
import { supabaseServer } from "@/shared/db/supabase/server"
import { cookies } from "next/headers"

export async function getCheckInShops(): Promise<MCheckInShop[]> {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: authData, error: authError } = await supabase.auth.getUser()

    if (authError || !authData.user) {
        throw new Error('login reuiqered')
    }

    const { data, error } = await supabase.from('shops').select('id, name, address_name, road_address_name, is_demo')
        .or(`is_demo.eq.true,owner_id.eq.${authData.user.id}`)
        .order('is_demo', { ascending: false })
        .order('created_at', { ascending: false })

    if(error){
        throw new Error('체크인 가능한 매장을 불러오지 못했습니다.')
    }
    return data ?? []
}