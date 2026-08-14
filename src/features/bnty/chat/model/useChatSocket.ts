'use clint'


import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import type { ChatRoomDetail, ChatMessage } from '@/entities/bnty/chat/model/chatTypes'
import { chatQueryKeys } from "@/features/bnty/chat/model/useGetChat"

import { chatRoomQueryKeys } from "@/features/bnty/chat/model"
import { useSocket } from "@/shared/providers/SocketProvider"

type MessagesReadPayload = {
  chatRoomId: string;
  userId: string;
  messageIds: string[];
};

export function useChatSocket(
  chatRoomId: string,
  userId: string
) {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit('join-chat-room', chatRoomId);
    socket.emit('mark-messages-read', {
      chatRoomId,
      userId
    })

    const handleNewMessage = (
      newMessage: ChatMessage,
    ) => {
      queryClient.setQueryData<ChatRoomDetail>(
        chatQueryKeys.detail(chatRoomId),
        (previousChat) => {
          if (!previousChat) {
            return previousChat;
          }

          const exists = previousChat.messages.some(
            (message) =>
              message.id === newMessage.id,
          );

          if (exists) {
            return previousChat;
          }

          return {
            ...previousChat,
            messages: [
              ...previousChat.messages,
              newMessage,
            ],
          };
        },
      );

      if (newMessage.senderId !== userId) {
        socket.emit('mark-messages-read', { chatRoomId, userId })
      }
    }

    const handleMessagesRead = ({
      chatRoomId: targetRoomId,
      userId: readUserId,
      messageIds,
    }: MessagesReadPayload) => {
      if (targetRoomId !== chatRoomId) {
        return;
      }

      queryClient.setQueryData<ChatRoomDetail>(
        chatQueryKeys.detail(chatRoomId),
        (previousChat) => {
          if (!previousChat) {
            return previousChat;
          }

          return {
            ...previousChat,
            messages: previousChat.messages.map(
              (message) => {
                if (
                  !messageIds.includes(message.id) ||
                  message.readBy.includes(readUserId)
                ) {
                  return message;
                }

                return {
                  ...message,
                  readBy: [
                    ...message.readBy,
                    readUserId,
                  ],
                };
              },
            ),
          };
        },
      );
      queryClient.invalidateQueries({
        queryKey: chatRoomQueryKeys.all,
      })
    };

    socket.on('new-message', handleNewMessage);
    socket.on('messages-read', handleMessagesRead)

    return () => {
      socket.emit('leave-chat-room', chatRoomId);
      socket.off(
        'new-message',
        handleNewMessage,
      );
      socket.off('messages-read', handleMessagesRead)
    };
  }, [chatRoomId, queryClient, socket, userId]);
}