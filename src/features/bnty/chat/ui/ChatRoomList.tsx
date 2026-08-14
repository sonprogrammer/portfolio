'use client'

import { useGetChatRooms } from "@/features/bnty/chat/model"
import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { useGetUser } from "@/features/bnty/user/model"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface ChatRoomList {
  onSelect: (chatRoomId: string) => void
}

export function ChatRoomList({ onSelect }: ChatRoomList) {

  const role = useBntyRoleStore(state => state.role)
  const { data: userInfo } = useGetUser(role as 'member' | 'trainer')
  const userRole = userInfo?.role as 'member' | 'trainer'
  const userId = userInfo?.id as string
  const { data: chatRooms } = useGetChatRooms({ userId, role: userRole })
  // console.log('chatroom', chatRooms)


  return (
    <div className="flex flex-col gap-3 p-4 text-neutral-100 rounded-2xl border border-neutral-800 max-w-xl mx-auto shadow-xl">
      <h1 className="text-xl font-bold tracking-tight px-2 mb-1 text-neutral-200">
        채팅방 목록
      </h1>

      {chatRooms && chatRooms.length > 0 ? (
        chatRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onSelect(room.id)}
            className="group relative flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:bg-neutral-800/60 hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <div className="flex gap-4 items-center">
            <div className="relative shrink-0">
              <div className="w-13 h-13 rounded-full bg-linear-to-br from-neutral-700 to-neutral-800 flex items-center justify-center border border-neutral-700 shadow-inner overflow-hidden">
                <span className="text-neutral-300 font-semibold text-lg">
                  {room.partnerName?.[0] || ''}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 min-w-0 pr-16">
              <p className="font-semibold text-neutral-100 text-base truncate group-hover:text-indigo-400 transition-colors">
                {room.partnerName}
              </p>
              {room.lastMessage && (
                <p className="text-sm text-neutral-400 truncate leading-relaxed">
                  {room.lastMessage}
                </p>
              )}
            </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-1.5">
              {room.lastMessageAt && (
                <time className="text-xs text-gray-500 whitespace-nowrap">
                  {format(
                    new Date(room.lastMessageAt),
                    'a h:mm',
                    { locale: ko },
                  )}
                </time>
              )}

              {room.unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1.5 text-xs font-semibold text-white">
                  {room.unreadCount > 99
                    ? '99+'
                    : room.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="py-12 text-center text-neutral-500 text-sm">
          참여 중인 채팅방이 없습니다.
        </div>
      )}
    </div>
  )
}