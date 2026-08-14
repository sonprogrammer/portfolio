export const mInquiryQueryKeys = {
    all: ['mungpass-inquiry'] as const,

    rooms: () => [
        ...mInquiryQueryKeys.all,
        'rooms'
    ] as const,

    messages: (roomId: string | null) => [
        ...mInquiryQueryKeys.all,
        'messages',
        roomId
    ] as const
};