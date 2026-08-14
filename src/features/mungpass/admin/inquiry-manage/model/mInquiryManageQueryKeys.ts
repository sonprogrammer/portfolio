export const mInquiryManageQueryKeys = {
    all: ['mungpass-inquiry-manage'] as const,

    rooms: () => [
        ...mInquiryManageQueryKeys.all,
        'rooms'
    ] as const,

    messages: (roomId: string) => [
        ...mInquiryManageQueryKeys.all,
        'messages',
        roomId
    ] as const
}