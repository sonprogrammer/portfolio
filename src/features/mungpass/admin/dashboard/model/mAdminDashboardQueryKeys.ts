export const mAdminDashboardQueryKeys = {
    all: ['mungpass-admin-dashboard'] as const,
    stats: () => [...mAdminDashboardQueryKeys.all, 'stats'] as const
}