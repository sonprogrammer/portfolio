import { Search } from 'lucide-react'

import {
    MAdminShopStatusFilter,
    MAdminUserTypeFilter
} from '../model'

interface UserFilterssProps {
    search: string
    userType: MAdminUserTypeFilter
    shopStatus: MAdminShopStatusFilter

    onSearchChange: (value: string) => void
    onUserTypeChange: (value: MAdminUserTypeFilter) => void
    onShopStatusChange: (value: MAdminShopStatusFilter) => void
}

const userTypeOptions: {
    label: string
    value: MAdminUserTypeFilter
}[] = [
    { label: '전체', value: 'all' },
    { label: '일반 회원', value: 'member' },
    { label: '사장', value: 'owner' }
]

const shopStatusOptions: {
    label: string
    value: MAdminShopStatusFilter
}[] = [
    { label: '전체', value: 'all' },
    { label: '심사중', value: 'pending' },
    { label: '반려', value: 'rejected' },
    { label: '입점완료', value: 'approved' }
]

export function UserFilters({
    search,
    userType,
    shopStatus,
    onSearchChange,
    onUserTypeChange,
    onShopStatusChange
}: UserFilterssProps) {
    return (
        <div className="space-y-4 rounded-2xl border border-gray-800 bg-gray-950 p-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

                <input
                    type="text"
                    value={search}
                    onChange={event => onSearchChange(event.target.value)}
                    placeholder="회원 이름 검색"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 py-2 sm:py-3 pl-11 pr-4 text-sm font-semibold text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-orange-500/50"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {userTypeOptions.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onUserTypeChange(option.value)}
                        className={`rounded-md sm:rounded-xl px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold transition ${
                            userType === option.value
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-900 text-gray-500 hover:text-gray-200'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {userType === 'owner' && (
                <div className="border-t border-gray-800 pt-4">
                    <p className="mb-3 text-xs font-bold text-gray-600">
                        입점 상태
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {shopStatusOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => onShopStatusChange(option.value)}
                                className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                                    shopStatus === option.value
                                        ? 'bg-violet-500/15 text-violet-400'
                                        : 'bg-gray-900 text-gray-500 hover:text-gray-200'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}