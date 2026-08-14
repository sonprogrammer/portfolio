export const mNotiQueryKeys = {
    all: ['mungpass-notifications'] as const,

    roles: () => [
        ...mNotiQueryKeys.all,
        'roles'
    ] as const
}