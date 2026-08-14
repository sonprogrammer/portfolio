'use client'

import { useGetMyPetUsage } from '@/features/mungpass/check-in/model'
import { LiveUsageWidget } from '@/widgets/mungpass/pages/user/dog/ui'

export function GlobalLiveUsage() {


  const {
    data: activeDogs = [],
  } = useGetMyPetUsage({
    statuses: ['staying'],
  })

  if (activeDogs.length === 0) {
    return null
  }

  const checkingDogCount = activeDogs.length - 1

  return (
      <div className="fixed bottom-0 right-0 z-100  pointer-events-none">
        <LiveUsageWidget
          activeDogs={activeDogs}
          dogCount={checkingDogCount}
        />
      </div>
  )
}