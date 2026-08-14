export const fuellyFoodQueryKeys = {
    all: ['fuelly', 'foods'] as const,
    list: () => [...fuellyFoodQueryKeys.all, 'list'] as const
}