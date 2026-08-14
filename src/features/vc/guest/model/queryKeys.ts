export const vcGuestQueryKeys = {
    all: ['vc', 'guest'] as const,
    session: () => [...vcGuestQueryKeys.all, 'session'] as const
}