export interface MAdminDashboard {
    total: number
    change: number
}

export interface MAdminDashboardStats {
    users: MAdminDashboard
    approvedShops: MAdminDashboard
    pendingShops: MAdminDashboard
}