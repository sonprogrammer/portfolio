'use client'

import dynamic from 'next/dynamic'

const QRCodeCanvas = dynamic(
  () => import('qrcode.react').then(mod => mod.QRCodeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className='w-48 h-48 bg-gray-300 animate-pulse duration-300' />
    )
  }
)

export function QrCode({trainerId}: {trainerId: string}) {
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='p-2 bg-white border border-gray-100 rounded-2xl'>
        <QRCodeCanvas value={trainerId} />
      </div>

      <div className="flex flex-col text-center text-xs text-gray-200">
        <span>* 실제 서비스에서는 회원의 카메라 스캔으로 동작합니다.</span>
        <span>* Member 탭의 스캔 버튼으로 체험할 수 있습니다.</span>
      </div>

    </div>
  )
}