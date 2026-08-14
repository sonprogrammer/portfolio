export const mAdminUserQueryKeys = {
    all: ['mungpass-admin-users'] as const,

    list: () => [
        ...mAdminUserQueryKeys.all,
        'list'
    ] as const
}