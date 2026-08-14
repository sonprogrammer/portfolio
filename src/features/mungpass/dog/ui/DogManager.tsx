'use client'

import { useState } from 'react'
import { useGetMdog } from '../model/useGetMdog'
import { DogCard } from '@/features/mungpass/dog/ui/DogCard'
import { DogPostModal } from '@/features/mungpass/dog/ui/DogPostModal'
import { DogUpdateModal } from '@/features/mungpass/dog/ui/DogUpdateModal'

export function DogManager() {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

    const {
        data: dog,
        isPending,
        error,
    } = useGetMdog()

    if (isPending) {
        return (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 text-sm text-gray-400">
                반려견 정보를 불러오는 중...
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
                {error.message}
            </div>
        )
    }

   
    return (
        <>
            <DogCard
                dog={dog}
                onRegister={() =>setIsPostModalOpen(true)}
                onEdit={() =>setIsUpdateModalOpen(true)}
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
        </>
    )
}