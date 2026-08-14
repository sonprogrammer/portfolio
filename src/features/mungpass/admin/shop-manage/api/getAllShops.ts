'use server'

import { MAdminShop } from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function getAllShops(): Promise<MAdminShop[]> {
    const { supabaseAdmin } = await requireMungpassAdmin()

    const [shopsResult, usersResult] = await Promise.all([
        supabaseAdmin
            .from('shops')
            .select(`
                id,
                owner_id,
                name,
                address_name,
                road_address_name,
                phone,
                status,
                created_at
            `)
            .order('created_at', { ascending: false }),

        supabaseAdmin
            .from('users')
            .select('id, name')
    ])

    if (shopsResult.error) {
        console.error(shopsResult.error)
        throw new Error('매장 목록을 불러오지 못했습니다.')
    }

    if (usersResult.error) {
        console.error(usersResult.error)
        throw new Error('회원 정보를 불러오지 못했습니다.')
    }

    const shops = shopsResult.data ?? []
    const users = usersResult.data ?? []

    const userMap = new Map(
        users.map(user => [
            user.id,
            user.name
        ])
    )

    return shops.map(shop => ({
        id: shop.id,
        ownerId: shop.owner_id,
        ownerName: userMap.get(shop.owner_id) ?? '알 수 없는 회원',
        name: shop.name,
        addressName: shop.address_name,
        roadAddressName: shop.road_address_name,
        phone: shop.phone,
        status: shop.status,
        createdAt: shop.created_at
    }))
}