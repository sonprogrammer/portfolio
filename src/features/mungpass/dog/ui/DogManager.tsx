'use client'

import { useState } from 'react'
import { useGetMdog } from '../model/useGetMdog'
import { DogCard } from '@/features/mungpass/dog/ui/DogCard'
import { DogPostModal } from '@/features/mungpass/dog/ui/DogPostModal'
import { DogUpdateModal } from '@/features/mungpass/dog/ui/DogUpdateModal'

export function DogManager() {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

    const { data: dog, isPending, error } = useGetMdog()

    if (isPending) {
        return (
            <div className="w-full min-w-0 rounded-2xl border border-gray-800 bg-gray-900/50 p-4 text-xs text-gray-400 sm:p-6 sm:text-sm">
                반려견 정보를 불러오는 중...
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full min-w-0 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400 sm:p-6 sm:text-sm">
                {error.message}
            </div>
        )
    }

    return (
        <div className="w-full min-w-0">
            <DogCard
                dog={dog}
                onRegister={() => setIsPostModalOpen(true)}
                onEdit={() => setIsUpdateModalOpen(true)}
            />

            <DogPostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
            />

            {dog && (
                <DogUpdateModal
                    dog={dog}
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}
        </div>
    )
}