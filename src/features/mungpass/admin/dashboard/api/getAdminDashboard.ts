'use server'


import { startOfDay } from 'date-fns'
import { MAdminDashboardStats } from '../model/types'
import { requireMungpassAdmin } from '@/shared/db/supabase/requireMAdmin'

export async function getAdminDashboard(): Promise<MAdminDashboardStats> {
    const { supabaseAdmin } = await requireMungpassAdmin()

   

    const today = startOfDay(new Date())

    const [usersResult, shopsResult] = await Promise.all([
        supabaseAdmin
            .from('users')
            .select('id, created_at'),

        supabaseAdmin
            .from('shops')
            .select(`
                id,
                owner_id,
                status,
                created_at,
                approved_at,
                rejected_at
            `)
    ])

    if (usersResult.error) {
        console.error(usersResult.error)
        throw new Error('회원 정보를 불러오지 못했습니다.')
    }

    if (shopsResult.error) {
        console.error(shopsResult.error)
        throw new Error('매장 정보를 불러오지 못했습니다.')
    }

    const users = usersResult.data ?? []
    const shops = shopsResult.data ?? []

    const memberCount = users.length


    const ownerIds = new Set(
        shops.map(shop => shop.owner_id)
    )

    const ownerCount = ownerIds.size

    const totalUsers = memberCount + ownerCount

    const yesterdayMemberCount = users.filter(user => {
        return new Date(user.created_at) < today
    }).length

    const yesterdayOwnerIds = new Set(
        shops
            .filter(shop => {
                return new Date(shop.created_at) < today
            })
            .map(shop => shop.owner_id)
    )

    const yesterdayTotalUsers =
        yesterdayMemberCount +
        yesterdayOwnerIds.size

    const approvedShops = shops.filter(shop => {
        return shop.status === 'approved'
    }).length

    const yesterdayApprovedShops = shops.filter(shop => {
        if (!shop.approved_at) {
            return false
        }

        return new Date(shop.approved_at) < today
    }).length

    const pendingShops = shops.filter(shop => {
        return shop.status === 'pending'
    }).length

    const yesterdayPendingShops = shops.filter(shop => {
        const createdAt = new Date(shop.created_at)

        if (createdAt >= today) {
            return false
        }

        if (shop.status === 'pending') {
            return true
        }

        if (
            shop.status === 'approved' &&
            shop.approved_at &&
            new Date(shop.approved_at) >= today
        ) {
            return true
        }

        if (
            shop.status === 'rejected' &&
            shop.rejected_at &&
            new Date(shop.rejected_at) >= today
        ) {
            return true
        }

        return false
    }).length

    return {
        users: {
            total: totalUsers -1, //데모 가게 있어서 하나 뺌
            change: totalUsers - yesterdayTotalUsers
        },

        approvedShops: {
            total: approvedShops,
            change: approvedShops - yesterdayApprovedShops
        },

        pendingShops: {
            total: pendingShops,
            change: pendingShops - yesterdayPendingShops
        }
    }
}