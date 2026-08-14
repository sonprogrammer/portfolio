export type MAdminUserType = 'member' | 'owner'

export type MAdminShopStatus =
    | 'pending'
    | 'approved'
    | 'rejected'

export type MAdminUserTypeFilter =
    | 'all'
    | MAdminUserType

export type MAdminShopStatusFilter =
    | 'all'
    | MAdminShopStatus

export interface MAdminUser {
    id: string
    userId: string
    name: string
    createdAt: string
    userType: MAdminUserType
    shopId: string | null
    shopName: string | null
    shopStatus: MAdminShopStatus | null
}