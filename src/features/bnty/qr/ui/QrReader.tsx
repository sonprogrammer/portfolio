'use client'

import { usePostQrCheckIn } from "@/features/bnty/qr/model/usePostQrCheckIn";
import { useState } from "react";
import { ModalPortal } from "@/shared/ui/modal";
import { QrScanModal } from "@/features/bnty/qr/ui/QrScanModal";
interface QrReaderProps {
    ptCount: number;
    memberId: string;
    trainerId: string
}

export function QrReader({ ptCount, memberId, trainerId }: QrReaderProps) {
    const [isScanning, setIsScanning] = useState(false)
    const { mutate: checkin } = usePostQrCheckIn()

    const handleQrScan = async () => {
        try {

            setIsScanning(true)

            await new Promise(res => setTimeout(res, 1000))
            checkin({ trainerId, memberId })
        } finally {
            setIsScanning(false)
        }
    }
    return (
        <div className="flex flex-col gap-3">

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <span className="text-sm font-medium text-red-900">잔여 PT 횟수</span>
                <span className="text-lg font-bold text-red-600">{ptCount}회</span>
            </div>

            {isScanning ? (
                <ModalPortal isOpen={true}>
                    <QrScanModal/>
                </ModalPortal>

            ) : (
                <button
                    type="button"
                    className="rounded-lg bg-gray-700 p-4 text-xl font-bold shadow-lg shadow-gray-900 hover:cursor-pointer hover:text-red-900"
                    onClick={handleQrScan}
                >
                    QR 스캔 체험
                </button>
            )}


            <span className="text-center text-xs text-gray-200">
                *실제 서비스에서는 큐알리더기로 동작합니다
            </span>
        </div>
    )
}