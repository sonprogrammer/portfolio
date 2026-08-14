'use server'

import { MAdminUser } from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function getAllUsers(): Promise<MAdminUser[]> {
    const { supabaseAdmin } = await requireMungpassAdmin()

    const [usersResult, shopsResult] = await Promise.all([
        supabaseAdmin
            .from('users')
            .select('id, name, created_at')
            .order('created_at', { ascending: false }),

        supabaseAdmin
            .from('shops')
            .select('id, owner_id, name, status, created_at')
    ])

    if (usersResult.error) {
        console.error(usersResult.error)
        throw new Error('회원 목록을 불러오지 못했습니다.')
    }

    if (shopsResult.error) {
        console.error(shopsResult.error)
        throw new Error('매장 정보를 불러오지 못했습니다.')
    }

    const users = usersResult.data ?? []
    const shops = shopsResult.data ?? []

    const shopMap = new Map(
        shops.map(shop => [
            shop.owner_id,
            shop
        ])
    )

    return users.flatMap(user => {
        const shop = shopMap.get(user.id)

        const member: MAdminUser = {
            id: `${user.id}-member`,
            userId: user.id,
            name: user.name,
            createdAt: user.created_at,
            userType: 'member',
            shopId: null,
            shopName: null,
            shopStatus: null
        }

        if (!shop) {
            return [member]
        }

        const owner: MAdminUser = {
            id: `${user.id}-owner`,
            userId: user.id,
            name: user.name,
            createdAt: shop.created_at,
            userType: 'owner',
            shopId: shop.id,
            shopName: shop.name,
            shopStatus: shop.status
        }

        return [
            member,
            owner
        ]
    })
}