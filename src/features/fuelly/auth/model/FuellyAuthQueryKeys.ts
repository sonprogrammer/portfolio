export const FuellyAuthQueryKeys = {
    all: ['fuelly', 'user'] as const,
    session: () => [...FuellyAuthQueryKeys.all, 'session'] as const
}