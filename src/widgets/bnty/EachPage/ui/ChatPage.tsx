'use client'

import { ChatRoom } from "@/features/bnty/chat/ui"
import { ChatRoomList } from "@/features/bnty/chat/ui/ChatRoomList"
import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { useGetUser } from "@/features/bnty/user/model"
import { LoadingBar } from "@/shared/ui/loadingbar"
import { useState } from "react"



export function ChatPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const role = useBntyRoleStore(state => state.role)

  const { data: user } = useGetUser(role as 'member' | 'trainer')

  if (!user || !role) { 
    return (
      <LoadingBar text="사용자 정보를 불러오는 중..." />
    );
  }

  return (
    <section className="grid grid-cols-[400px_1fr] overflow-hidden rounded-xl border border-gray-700">
      <aside className="border-r border-gray-700">
        <ChatRoomList
          onSelect={setSelectedRoomId}
        />
      </aside>

      <main>
        {selectedRoomId ? (
          <ChatRoom selectedRoomId={selectedRoomId} user={user} role={role} />
        ) : (
          <div className="flex h-full  flex-col items-center justify-center text-center">

            <h2 className="text-lg font-bold text-gray-100">
              채팅방을 선택해 주세요
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              왼쪽 목록에서 대화할 상대를 선택해 주세요.
            </p>
          </div>
        )}
      </main>
    </section>
  )
}