import { UsageStatus } from './types'

export const mPetUsageQueryKeys = {
  all: ['mungpass-pet-usage'] as const,
  list: (statuses: UsageStatus[]) => [...mPetUsageQueryKeys.all, 'list', statuses] as const,

}