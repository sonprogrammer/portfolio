'use client'

import { generateAiInsight } from '@/features/mungpass/sales/api/generateAiInsight'
import { mSalesQueryKeys } from '@/features/mungpass/sales/model/mSalesQueryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'



export function useGetGenrateAiInsight() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: generateAiInsight,
        onSuccess: data => {
            if (!data.savedInsight) {
                return
            }

            queryClient.setQueryData(
                mSalesQueryKeys.insight(data.savedInsight.shop_id),
                data.savedInsight
            )
        },
        onError: error => {
            if (error.message.includes('503')) {
                toast.error('AI 서버가 혼잡합니다. 잠시 후 다시 시도해주세요.')
                return
            }

            toast.error(error.message)
        }
    })
}