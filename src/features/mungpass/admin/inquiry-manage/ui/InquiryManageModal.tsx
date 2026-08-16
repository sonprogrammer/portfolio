'use client'

import { useEffect, KeyboardEvent, useRef, useState, FormEvent } from 'react'
import { format, isSameDay } from 'date-fns'
import {
    Loader2,
    Send,
    ShieldCheck,
    User,
    X
} from 'lucide-react'
import { toast } from 'sonner'

import {
    MInquiryManageRoom,
    useAdminInquiryRealtime,
    useGetAdminInquiryMsg,
    useSendAdminInquiryMsg
} from '../model'
import { ko } from 'date-fns/locale'

interface InquiryManageModalProps {
    room: MInquiryManageRoom
    onClose: () => void
}

export function InquiryManageModal({
    room,
    onClose
}: InquiryManageModalProps) {
    const [message, setMessage] = useState('')
    const messesageEndRef = useRef<HTMLDivElement>(null)

    const {
        data: messages = [],
        isPending,
        isError
    } = useGetAdminInquiryMsg(room.id)

    useAdminInquiryRealtime(room.id)

    useEffect(() => {
        messesageEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])

    const sendMutation = useSendAdminInquiryMsg()
    const isSending = sendMutation.isPending

    const handleSend = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.trim()) {
            toast.info('답변 내용을 입력해주세요.')
            return
        }

        sendMutation.mutate({
            roomId: room.id,
            message
        }, {
            onSuccess: () => {
                setMessage('')
            },

            onError: error => {
                toast.error(error.message)
            }
        })
    }

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.nativeEvent.isComposing) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-5000 flex items-center justify-center bg-black/70 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-gray-800 bg-gray-950 shadow-2xl">
                <div className="flex shrink-0 items-start justify-between border-b border-gray-800 p-5">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-orange-400">
                                {room.category}
                            </span>

                            <span className="text-xs font-semibold text-gray-600">
                                {room.userName}
                            </span>
                        </div>

                        <h2 className="mt-1 truncate text-lg font-extrabold text-gray-100">
                            {room.title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-900 hover:text-gray-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none p-5">
                    {isPending ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                        </div>
                    ) : isError ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm font-semibold text-red-400">
                                문의 내용을 불러오지 못했습니다.
                            </p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm font-semibold text-gray-600">
                                문의 메시지가 없습니다.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((item, index) => {
                                const prevMessage = messages[index - 1];

                                const isFirstOfDay =
                                    !prevMessage ||
                                    !isSameDay(
                                        new Date(prevMessage.createdAt),
                                        new Date(item.createdAt)
                                    );
                                const isAdmin = item.senderRole === 'admin'

                                return (
                                    <div key={item.id}>
                                        {isFirstOfDay && (
                                            <div className="my-4 flex justify-center">
                                                <span className="rounded-full border border-gray-800 bg-gray-900/80 px-3.5 py-1 text-[10px] font-semibold text-gray-400 backdrop-blur-md shadow-sm">
                                                    {format(
                                                        new Date(item.createdAt),
                                                        'yyyy년 M월 d일 EEEE',
                                                        { locale: ko }
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        <div
                                            className={`flex gap-2.5 ${isAdmin ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border shadow-md ${!isAdmin
                                                    ? 'border-orange-500/30 bg-orange-500/20 text-orange-400'
                                                    : 'border-blue-500/30 bg-blue-500/20 text-blue-400'
                                                    }`}
                                            >
                                                {!isAdmin ? (
                                                    <User className="h-4 w-4" />
                                                ) : (
                                                    <ShieldCheck className="h-4 w-4" />
                                                )}
                                            </div>

                                            <div
                                                className={`flex max-w-[75%] flex-col ${isAdmin
                                                    ? 'items-end'
                                                    : 'items-start'
                                                    }`}
                                            >
                                                <span className="mb-1 text-[10px] font-extrabold text-gray-400 px-1">
                                                    {isAdmin
                                                        ? '멍패스 지원팀'
                                                        : item.senderInfo?.name}
                                                </span>

                                                <div className="flex items-end gap-1.5">
                                                    <div
                                                        className={`rounded-3xl px-2 py-1 text-sm shadow-md ${!isAdmin
                                                            ? ' bg-orange-500 text-white shadow-orange-500/10'
                                                            : ' border border-gray-800 bg-emerald-500 text-gray-100 backdrop-blur-md'
                                                            }`}
                                                    >
                                                        <p className="whitespace-pre-wrap wrap-break-word leading-relaxed font-medium">
                                                            {item.message}
                                                        </p>
                                                    </div>

                                                    <span className="shrink-0 text-[9px] font-semibold text-gray-500">
                                                        {format(
                                                            new Date(item.createdAt),
                                                            'HH:mm'
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messesageEndRef} />
                        </div>
                    )}
                </div>

                {room.status === 'closed' ? (
                    <div className="shrink-0 border-t border-gray-800 p-5">
                        <div className="rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-gray-500">
                            종료된 문의입니다.
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSend}
                        className="flex gap-2.5 border-t border-gray-800 bg-gray-900/80 backdrop-blur-xl p-4"
                    >
                        <input
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isSending}
                            placeholder="답변 내용을 입력해주세요."
                            className="h-12 flex-1 resize-none rounded-2xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-orange-500/50"
                        />

                        <button
                            type="submit"
                            disabled={sendMutation.isPending || !message.trim()}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {sendMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}