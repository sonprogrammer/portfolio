export const mDogQueryKeys = { 
    all: ['mungpass', 'dog'] as const,
    session: () => [...mDogQueryKeys.all, 'session'] as const
}