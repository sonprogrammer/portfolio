'use server'

import { MOwnerUsageDetail } from './../model/types';
import { supabaseServer } from "@/shared/db/supabase/server"
import { cookies } from "next/headers"

export async function getCurrentUsage(shopId: string): Promise<MOwnerUsageDetail[]>{
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: {user}, error: authError} = await supabase.auth.getUser()

    if(authError || !user){
        throw new Error('login required')
    }

    const { data : shop} = await supabase.from('shops').select('id').eq('id', shopId).eq('owner_id', user.id).maybeSingle()

    if(!shop){
        throw new Error('can not get your shop')
    }

    const { data, error} = await supabase.from('usage_logs').select(`*, dog:dogs(*), product: shop_products(name, overtime_unit_mins, overtime_unit_price, grace_period_mins)`)
                                            .eq('shop_id', shopId)
                                            .eq('status', 'staying')
                                            .order('started_at', {ascending: false})
    if(error){
        throw new Error('can not get current usage')
    }

    return (data ?? []) as MOwnerUsageDetail[]
    
}