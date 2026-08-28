'use client'

import { Loader2, QrCode } from "lucide-react";

export function QrScanModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">

            <div className="py-10 text-center space-y-6">


                <div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl border border-gray-700 bg-gray-950/60 shadow-inner">

                    <QrCode className="h-20 w-20 text-gray-700" />

                    <div className="absolute left-4 right-4 top-1/2 h-0.5 animate-pulse bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

                </div>

                <div className="flex items-center justify-center gap-2">

                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />

                    <span className="text-sm font-bold text-gray-300">
                        QR을 인식하고 있습니다.
                    </span>

                </div>
            </div>
        </div>
    )
}
