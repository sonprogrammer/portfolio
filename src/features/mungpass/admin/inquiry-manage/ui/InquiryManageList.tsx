import { MessageSquare } from 'lucide-react'

import { MInquiryManageRoom } from '../model'

import { InquiryManageCard } from './InquiryManageCard'

interface InquiryManageListProps {
    rooms: MInquiryManageRoom[]
    onOpen: (room: MInquiryManageRoom) => void
}

export function InquiryManageList({
    rooms,
    onOpen
}: InquiryManageListProps) {
    if (rooms.length === 0) {
        return (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-950">
                <MessageSquare className="h-7 w-7 text-gray-700" />

                <p className="mt-3 text-sm font-bold text-gray-500">
                    조건에 맞는 문의가 없습니다.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {rooms.map(room => (
                <InquiryManageCard
                    key={room.id}
                    room={room}
                    onOpen={onOpen}
                />
            ))}
        </div>
    )
}