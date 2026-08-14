'use client'

import { usePostQrCheckIn } from "@/features/bnty/qr/model/usePostQrCheckIn";

interface QrReaderProps {
    ptCount: number;
    memberId: string;
    trainerId: string
}

export function QrReader({ ptCount, memberId, trainerId }: QrReaderProps) {
    const { mutate: checkin } = usePostQrCheckIn()
    const handleQrScan = () => {
        checkin({ trainerId, memberId })
    }
    return (
        <div className="flex flex-col gap-3">

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <span className="text-sm font-medium text-red-900">잔여 PT 횟수</span>
                <span className="text-lg font-bold text-red-600">{ptCount}회</span>
            </div>

            <button
                type="button"
                className='font-bold text-xl hover:cursor-pointer hover:text-red-900 bg-gray-700 p-4 shadow-lg shadow-gray-900 rounded-lg'
                onClick={handleQrScan}
            >
                QR 스캔 체험
            </button>


            <span className="text-center text-xs text-gray-200">
                *실제 서비스에서는 큐알리더기로 동작합니다
            </span>
        </div>
    )
}