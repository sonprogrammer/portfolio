'use client';

import {
    FormEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState
} from 'react';
import {
    format,
    isSameDay
} from 'date-fns';
import { ko } from 'date-fns/locale';
import {
    Loader2,
    Send,
    ShieldCheck,
    User
} from 'lucide-react';
import { toast } from 'sonner';

import {
    MInquiryRole,
    useGetInquiryMsg,
    useInquiryRealtime,
    useSendInquiryMessage
} from '../model';

interface InquiryChatProps {
    roomId: string;
    senderRole: MInquiryRole;
}

export function InquiryChat({
    roomId,
    senderRole
}: InquiryChatProps) {
    const [message, setMessage] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        data: messages = [],
        isPending
    } = useGetInquiryMsg(roomId);

    const {
        mutateAsync: sendMessage,
        isPending: isSending
    } = useSendInquiryMessage();

    useInquiryRealtime(roomId);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const text = message.trim();

        if (!text) return;

        try {
            await sendMessage({
                roomId,
                senderRole,
                message: text
            });

            setMessage('');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : '메시지 전송에 실패했습니다.'
            );
        }
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.nativeEvent.isComposing) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    };

    if (isPending) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col bg-gray-950/20 text-gray-100">

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-gray-950/40 p-5 no-scrollbar">
                {messages.map((item, index) => {
                    const prevMessage = messages[index - 1];

                    const isFirstOfDay =
                        !prevMessage ||
                        !isSameDay(
                            new Date(prevMessage.created_at),
                            new Date(item.created_at)
                        );

                    const isMe = item.sender_role === senderRole;

                    return (
                        <div key={item.id}>
                            {isFirstOfDay && (
                                <div className="my-4 flex justify-center">
                                    <span className="rounded-full border border-gray-800 bg-gray-900/80 px-3.5 py-1 text-[10px] font-semibold text-gray-400 backdrop-blur-md shadow-sm">
                                        {format(
                                            new Date(item.created_at),
                                            'yyyy년 M월 d일 EEEE',
                                            { locale: ko }
                                        )}
                                    </span>
                                </div>
                            )}

                            <div
                                className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}
                            >
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border shadow-md ${isMe
                                            ? 'border-orange-500/30 bg-orange-500/20 text-orange-400'
                                            : 'border-blue-500/30 bg-blue-500/20 text-blue-400'
                                        }`}
                                >
                                    {isMe ? (
                                        <User className="h-4 w-4" />
                                    ) : (
                                        <ShieldCheck className="h-4 w-4" />
                                    )}
                                </div>

                                <div
                                    className={`flex max-w-[75%] flex-col
                                        ${isMe
                                            ? 'items-end'
                                            : 'items-start'
                                        }
                                        `}
                                >
                                    <span className="mb-1 text-[10px] font-extrabold text-gray-400 px-1">
                                        {isMe
                                            ? '나'
                                            : '멍패스 지원팀'}
                                    </span>

                                    <div className="flex items-end gap-1.5">
                                        <div
                                            className={`rounded-3xl px-2 py-1 text-sm shadow-md ${isMe
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
                                                new Date(item.created_at),
                                                'HH:mm'
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex gap-2.5 border-t border-gray-800 bg-gray-900/80 backdrop-blur-xl p-4"
            >
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSending}
                    placeholder="메시지를 입력하세요..."
                    className="h-12 flex-1 rounded-2xl border border-gray-800 bg-gray-950 px-4 text-sm font-medium text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                />

                <button
                    type="submit"
                    disabled={!message.trim() || isSending}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none cursor-pointer active:scale-[0.98]"
                >
                    {isSending ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </button>
            </form>
        </div>
    );
}