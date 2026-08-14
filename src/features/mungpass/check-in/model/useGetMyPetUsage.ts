'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyPetUsage } from '../api/getMyPetUsage'
import { mPetUsageQueryKeys } from './mPetUsageQueryKeys'
import type { UsageStatus } from './types'

interface UseGetMyPetUsageParams {
  statuses?: UsageStatus[]
}

export function useGetMyPetUsage({
  statuses = ['staying'],
}: UseGetMyPetUsageParams = {}) {
  return useQuery({
    queryKey: mPetUsageQueryKeys.list(statuses),
    queryFn: async () => {
      const response = await getMyPetUsage({ statuses })

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data ?? []
    },
  })
}