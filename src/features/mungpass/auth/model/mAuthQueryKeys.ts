export const mAuthQueryKeys = {
    all: ['mungpass', 'user'] as const,
    session: () => [...mAuthQueryKeys.all, 'session'] as const
}