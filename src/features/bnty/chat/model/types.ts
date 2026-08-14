export interface ChatRoomListItem{
    id: string;
    partnerId: string;
    partnerName: string;
    lastMessage: string | null
    lastMessageAt: string | null
    unreadCount: number
}

export const chatRoomQueryKeys = {
  all: ['bnty-chat-rooms'] as const,

  user: (
    userId: string,
    role: 'member' | 'trainer',
  ) =>
    [...chatRoomQueryKeys.all, role, userId] as const,
};

