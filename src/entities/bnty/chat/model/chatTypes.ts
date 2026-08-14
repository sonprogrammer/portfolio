export interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: 'member' | 'trainer';
  type: 'text' | 'media';
  message: string;
  data: string;
  fileName: string;
  readBy: string[];
  sentAt: string;
};

export interface ChatRoomDetail{
  id: string;
  trainerId: string;
  trainerName: string;
  memberId: string;
  memberName: string;
  messages: ChatMessage[];
};