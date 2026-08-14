import { format } from 'date-fns'
import {
    Clock3,
    MessageCircle,
    UserRound
} from 'lucide-react'

import { MInquiryManageRoom } from '../model'

interface InquiryManageCardProps {
    room: MInquiryManageRoom
    onOpen: (room: MInquiryManageRoom) => void
}

const statusMap = {
    waiting: {
        label: '답변대기',
        className: 'bg-yellow-500/10 text-yellow-400'
    },

    answered: {
        label: '답변완료',
        className: 'bg-emerald-500/10 text-emerald-400'
    },

    closed: {
        label: '종료',
        className: 'bg-gray-800 text-gray-500'
    }
} as const

const userTypeMap = {
    member: '일반 회원',
    owner: '사장',
    admin: '관리자'
} as const

export function InquiryManageCard({
    room,
    onOpen
}: InquiryManageCardProps) {
    const status = statusMap[room.status]

    return (
        <button
            type="button"
            onClick={() => onOpen(room)}
            className="w-full rounded-2xl border border-gray-800 bg-gray-950 p-5 text-left transition hover:border-gray-700 hover:bg-gray-900/50"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status.className}`}>
                            {status.label}
                        </span>

                        <span className="text-xs font-bold text-gray-600">
                            {room.category}
                        </span>
                    </div>

                    <h3 className="mt-3 truncate font-extrabold text-gray-100">
                        {room.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                            <UserRound className="h-3.5 w-3.5" />

                            <span>
                                {room.userName}
                            </span>

                            <span className="text-gray-700">
                                ·
                            </span>

                            <span>
                                {userTypeMap[room.userType]}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                            <Clock3 className="h-3.5 w-3.5" />

                            <span>
                                {format(
                                    new Date(room.updatedAt),
                                    'yyyy.MM.dd HH:mm'
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </button>
    )
}