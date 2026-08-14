'use client';

import { format } from 'date-fns';
import {
    ChevronRight,
    Loader2,
    MessageCircle,
    MessageSquarePlus
} from 'lucide-react';

import {
    MInquiryRoom,
    useGetInquiryRooms
} from '../model';

interface InquiryListProps {
    onWrite: () => void;
    onOpenRoom: (room: MInquiryRoom) => void;
}

const STATUS_LABEL = {
    waiting: '답변 대기',
    answered: '답변 완료',
    closed: '문의 종료'
};

export function InquiryList({
    onWrite,
    onOpenRoom
}: InquiryListProps) {
    const {
        data: rooms = [],
        isPending
    } = useGetInquiryRooms();

    return (
        <div className="flex h-full flex-col bg-gray-950/20">
            <div className="flex justify-end p-5 pb-3">
                <button
                    type="button"
                    onClick={onWrite}
                    className="flex items-center gap-1.5 rounded-2xl bg-orange-500 px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 cursor-pointer active:scale-[0.98]"
                >
                    <MessageSquarePlus className="h-4 w-4" />
                    새 문의하기
                </button>
            </div>


            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 no-scrollbar">
                {isPending ? (
                    <div className="flex h-full items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-orange-400" />
                    </div>
                ) : rooms.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center p-6 bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-800">
                        <div className="w-12 h-12 bg-gray-800/80 border border-gray-700 rounded-2xl flex items-center justify-center shadow-md mb-3 text-orange-400">
                            <MessageCircle className="h-5 w-5" />
                        </div>

                        <p className="text-sm font-extrabold text-gray-200">
                            남긴 문의가 없습니다
                        </p>

                        <p className="mt-1 text-[11px] text-gray-400">
                            궁금한 내용이 있다면 새 문의를 남겨보세요.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {rooms.map((room) => (
                            <button
                                key={room.id}
                                type="button"
                                onClick={() => onOpenRoom(room)}
                                className="flex w-full items-center justify-between rounded-2xl border border-gray-800 bg-gray-900/60 p-4 text-left backdrop-blur-md transition-all duration-200 hover:border-orange-500/40 hover:bg-gray-900 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer group"
                            >
                                <div className="min-w-0 pr-2">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-extrabold text-orange-400">
                                            {room.category}
                                        </span>

                                        <span className="text-[10px] font-semibold text-gray-500">
                                            {STATUS_LABEL[room.status]}
                                        </span>
                                    </div>

                                    <p className="mt-1.5 truncate text-sm font-extrabold text-gray-100 group-hover:text-orange-400 transition-colors">
                                        {room.title}
                                    </p>

                                    <p className="mt-1 text-[11px] font-semibold text-gray-500">
                                        {format(new Date(room.updated_at), 'yyyy.MM.dd HH:mm')}
                                    </p>
                                </div>

                                <ChevronRight className="h-4 w-4 shrink-0 text-gray-600 group-hover:text-orange-400 transition-colors" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}