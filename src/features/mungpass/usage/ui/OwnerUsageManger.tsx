'use client'

import { useState } from 'react'

import { CompletedUsageList } from './CompletedUsageList'
import { CurrentUsageList } from './CurrentUsageList'

interface OwnerUsageManagerProps {
    shopId: string
    shopStatus: 'pending' | 'approved' | 'rejected'
}

export function OwnerUsageManager({ shopId, shopStatus }: OwnerUsageManagerProps) {
    const [activeTab, setActiveTab] = useState<'current' | 'completed'>('current')

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-extrabold text-gray-100">
                    이용 현황
                </h2>

                <p className="mt-1 text-sm font-semibold text-gray-400">
                    현재 이용 중인 반려견과 완료된 이용 내역을 관리합니다.
                </p>
            </div>

            <div className="flex w-fit rounded-xl border border-gray-800 bg-gray-900 p-1">
                <button
                    type="button"
                    onClick={() => setActiveTab('current')}
                    className={`rounded-lg cursor-pointer px-4 py-2 text-sm font-bold transition ${activeTab === 'current' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    현재 이용 중
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('completed')}
                    className={`rounded-lg cursor-pointer px-4 py-2 text-sm font-bold transition ${activeTab === 'completed' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    체크아웃 완료
                </button>
            </div>

            {activeTab === 'current' && <CurrentUsageList shopId={shopId} shopStatus={shopStatus} />}
            {activeTab === 'completed' && <CompletedUsageList shopId={shopId} />}
        </div>
    )
}