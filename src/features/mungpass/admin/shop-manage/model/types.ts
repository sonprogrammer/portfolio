export type MShopManageStatus =
    | 'pending'
    | 'approved'
    | 'rejected'

export type MShopManageStatusFilter =
    | 'all'
    | MShopManageStatus

export interface MAdminShop {
    id: string
    ownerId: string
    ownerName: string
    name: string
    addressName: string
    roadAddressName: string
    phone: string
    status: MShopManageStatus
    createdAt: string
}

export interface MUpdateShopStatusPayload {
    shopId: string
    status: 'approved' | 'rejected'
}