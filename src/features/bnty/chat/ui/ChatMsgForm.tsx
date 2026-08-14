'use client'

import { useSendMsg } from "@/features/bnty/chat/model"
import { FormEvent, useState } from "react"

interface ChatMsgFormProps {
    chatRoomId: string;
    senderId: string;
    senderRole: 'member' | 'trainer'
}


export function ChatMsgForm({ chatRoomId, senderId, senderRole }: ChatMsgFormProps) {
    const [msg, setMsg] = useState('')
    const { sendMsg, isPending } = useSendMsg()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!msg || isPending) {
            return
        }

        try {
            await sendMsg({ chatRoomId, senderId, senderRole, message: msg })
            setMsg('')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-neutral-900 rounded-full border border-neutral-800 focus-within:border-indigo-500 transition-colors shadow-lg"
        >
            <input
                type="text"
                value={msg}
                onChange={(event) => setMsg(event.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none px-1"
            />

            <button
                type="submit"
                disabled={!msg.trim() || isPending}
                className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
                {isPending ? '전송 중...' : '전송'}
            </button>
        </form>
    )
}