import type { ChatMessage } from './chatTypes';

export type SendMessagePayload = {
  chatRoomId: string;
  senderId: string;
  senderRole: 'member' | 'trainer';
  message: string;
};

export type SendMessageResult =
  | {
      success: true;
      message: ChatMessage;
    }
  | {
      success: false;
      error: string;
    }

export type MarkMessagesReadPayload = {
  chatRoomId: string;
  userId: string;
};

export type MessagesReadPayload = {
  chatRoomId: string;
  userId: string;
  messageIds: string[];
};