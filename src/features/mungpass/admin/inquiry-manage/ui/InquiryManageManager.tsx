'use client'

import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

import {
    MInquiryManageRoom,
    MInquiryManageStatusFilter,
    useGetAdminInquiryRooms
} from '../model'


import { InquiryManageList } from './InquiryManageList'
import { InquiryManageModal } from './InquiryManageModal'
import { InquiryManageFilters } from '@/features/mungpass/admin/inquiry-manage/ui/InquiryManageFilters'
import { ModalPortal } from '@/shared/ui/modal'

export function InquiryManageManager() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<MInquiryManageStatusFilter>('waiting')
    const [selectedRoom, setSelectedRoom] = useState<MInquiryManageRoom | null>(null)

    const {
        data: rooms = [],
        isPending,
        isError
    } = useGetAdminInquiryRooms()

    const filteredRooms = useMemo(() => {
        const keyword = search.trim().toLowerCase()

        return rooms.filter(room => {
            const matchesSearch =
                !keyword ||
                room.userName.toLowerCase().includes(keyword) ||
                room.title.toLowerCase().includes(keyword)

            const matchesStatus =
                status === 'all' ||
                room.status === status

            return matchesSearch && matchesStatus
        })
    }, [rooms, search, status])

    const counts = useMemo(() => {
        return {
            all: rooms.length,

            waiting: rooms.filter(room => {
                return room.status === 'waiting'
            }).length,

            answered: rooms.filter(room => {
                return room.status === 'answered'
            }).length,

            closed: rooms.filter(room => {
                return room.status === 'closed'
            }).length
        }
    }, [rooms])

    if (isPending) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400">
                문의 목록을 불러오지 못했습니다.
            </div>
        )
    }

    return (
        <>
            <div className="space-y-5">
                <InquiryManageFilters
                    search={search}
                    status={status}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                    counts={counts}
                />

                <div className="flex items-center justify-between px-1">
                    <p className="text-sm font-bold text-gray-500">
                        문의 목록
                    </p>

                    <span className="text-xs font-bold text-gray-600">
                        {filteredRooms.length.toLocaleString()}건
                    </span>
                </div>

                <InquiryManageList
                    rooms={filteredRooms}
                    onOpen={setSelectedRoom}
                />
            </div>

            {selectedRoom && (
                <ModalPortal isOpen={true}>

                    <InquiryManageModal
                        key={selectedRoom.id}
                        room={selectedRoom}
                        onClose={() => setSelectedRoom(null)}
                    />
                </ModalPortal>
            )}
        </>
    )
}