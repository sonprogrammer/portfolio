'use client'

import { useState } from 'react'
import { Inbox, Loader2, Search } from 'lucide-react'

import { useGetCompletedUsages } from '../model'
import { CompletedUsageCard } from './CompletedUsageCard'

interface CompletedUsageListProps {
    shopId: string
}

export function CompletedUsageList({ shopId }: CompletedUsageListProps) {
    const [search, setSearch] = useState('')

    const { data: items = [], isPending, isError } = useGetCompletedUsages(shopId)

    const keyword = search.trim().toLowerCase()

    const filteredItems = keyword
        ? items.filter(item => {
            const dogName = item.dog.name.toLowerCase()
            const productName = item.product.name.toLowerCase()

            return dogName.includes(keyword) || productName.includes(keyword)
        })
        : items

    if (isPending) {
        return (
            <div className="flex h-52 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400">
                이용 내역을 불러오지 못했습니다.
            </div>
        )
    }


    return (
        <div className="space-y-5">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="강아지 이름 또는 상품명 검색"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 py-3 pl-11 pr-4 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-orange-500"
                />
            </div>

            {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/60 py-16">
                    <Inbox className="h-7 w-7 text-gray-500" />

                    <p className="mt-3 text-sm font-extrabold text-gray-200">
                        {search.trim() ? '검색 결과가 없습니다.' : '완료된 이용 내역이 없습니다.'}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {filteredItems.map(item => (
                        <CompletedUsageCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}