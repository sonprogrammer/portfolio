import { Search } from 'lucide-react'

import {
    MInquiryManageStatusFilter
} from '../model'

interface InquiryManageFiltersProps {
    search: string
    status: MInquiryManageStatusFilter
    onSearchChange: (value: string) => void
    onStatusChange: (value: MInquiryManageStatusFilter) => void
    counts: {
        all: number
        waiting: number
        answered: number
        closed: number
    }
}

const statusOptions: {
    value: MInquiryManageStatusFilter
    label: string
}[] = [
    {
        value: 'all',
        label: '전체'
    },
    {
        value: 'waiting',
        label: '답변대기'
    },
    {
        value: 'answered',
        label: '답변완료'
    },
    {
        value: 'closed',
        label: '종료'
    }
]

export function InquiryManageFilters({
    search,
    status,
    onSearchChange,
    onStatusChange,
    counts
}: InquiryManageFiltersProps) {
    return (
        <div className="space-y-4 rounded-2xl border border-gray-800 bg-gray-950 p-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                <input
                    type="text"
                    value={search}
                    onChange={event => onSearchChange(event.target.value)}
                    placeholder="회원 이름 또는 문의 제목 검색"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 py-2 sm:py-3 pl-11 pr-4 text-sm font-semibold text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-orange-500/50"
                />
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {statusOptions.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onStatusChange(option.value)}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                            status === option.value
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-900 text-gray-500 hover:text-gray-200'
                        }`}
                    >
                        {option.label}

                        <span className="ml-2 text-xs opacity-70">
                            {counts[option.value]}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}