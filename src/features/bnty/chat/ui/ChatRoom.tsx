'use client'

import { BntyUser } from "@/entities/bnty/user/model/userTypes"
import { useChatSocket, useGetChat } from "@/features/bnty/chat/model"
import { ChatMsgForm } from "@/features/bnty/chat/ui/ChatMsgForm"
import { LoadingBar } from "@/shared/ui/loadingbar"
import { format, isSameDay } from "date-fns"
import { ko } from "date-fns/locale"
import { useEffect, useRef } from "react"


interface ChatRoomProps {
    selectedRoomId: string
    role: 'member' | 'trainer'
    user: BntyUser
}


export function ChatRoom({ selectedRoomId, user, role }: ChatRoomProps) {
    const { data: chat, isPending } = useGetChat(selectedRoomId)
    const messageRef = useRef<HTMLDivElement>(null)


    useChatSocket(selectedRoomId, user.id)


    useEffect(() => {
        messageRef.current?.scrollTo({
            top: messageRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }, [chat?.messages.length])


    if (isPending) {
        return (<LoadingBar text="대화 불러오는 중..." />)
    }
    if (!chat) {
        return (
            <div className="flex  items-center justify-center">
                <p className="text-sm text-gray-400">
                    채팅방 정보를 찾을 수 없습니다.
                </p>
            </div>
        );
    }
    const partnerName =
        role === 'trainer'
            ? chat.memberName
            : chat.trainerName
    return (
        <div className="flex flex-col h-150">
            <header className="border-b border-gray-700 px-5 py-4">
                <h2 className="font-bold text-gray-100 flex items-center gap-1">
                    {partnerName}
                    <p className="text-sm text-gray-400">
                        {role === 'trainer'
                            ? '회원'
                            : `트레이너`}
                    </p>
                </h2>


            </header>

            <div className="flex-1 overflow-y-auto p-5" ref={messageRef}>
                {chat.messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-400">
                            아직 주고받은 메시지가 없습니다.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {chat.messages.map((message, index) => {
                            const previousMessage = chat.messages[index - 1]

                            const isNewDate = !previousMessage || !isSameDay(
                                new Date(previousMessage.sentAt),
                                new Date(message.sentAt)
                            );

                            const isMine = message.senderId === user.id;
                            const isUnread = isMine && !message.readBy.some(
                                (readUserId) => readUserId !== user.id,
                            )

                            return (
                                <div key={message.id}>
                                    {isNewDate && (
                                        <div className="my-5 flex items-center gap-3">
                                            <div className="h-px flex-1 bg-gray-700" />

                                            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
                                                {format(
                                                    new Date(message.sentAt),
                                                    'yyyy년 M월 d일 EEEE',
                                                    {
                                                        locale: ko,
                                                    },
                                                )}
                                            </span>

                                            <div className="h-px flex-1 bg-gray-700" />
                                        </div>
                                    )}

                                    <div
                                        className={`flex items-end gap-2 ${isMine
                                            ? 'justify-end'
                                            : 'justify-start'
                                            }`}
                                    >
                                        {isMine && (
                                            <div className="mb-1 flex shrink-0 flex-col items-end">
                                                {isUnread && (
                                                    <span className="text-[11px] font-semibold text-yellow-400">
                                                        1
                                                    </span>
                                                )}

                                                <time className="text-[11px] text-gray-500">
                                                    {format(
                                                        new Date(message.sentAt),
                                                        'a h:mm',
                                                        { locale: ko },
                                                    )}
                                                </time>
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${isMine
                                                ? 'rounded-br-sm bg-indigo-600 text-white'
                                                : 'rounded-bl-sm bg-gray-800 text-gray-100'
                                                }`}
                                        >
                                            <p className="wrap-break-word text-sm leading-5">
                                                {message.message}
                                            </p>
                                        </div>

                                        {!isMine && (
                                            <time className="mb-1 shrink-0 text-[11px] text-gray-500">
                                                {format(
                                                    new Date(message.sentAt),
                                                    'a h:mm',
                                                    {
                                                        locale: ko,
                                                    },
                                                )}
                                            </time>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <ChatMsgForm
                chatRoomId={selectedRoomId}
                senderId={user.id}
                senderRole={role}
            />
        </div>
    )
}