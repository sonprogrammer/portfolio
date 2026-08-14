export const fuellyMealQueryKeys = {
    all: ['fuelly', 'meal'] as const,
    today: () => [...fuellyMealQueryKeys.all, 'today'] as const
}