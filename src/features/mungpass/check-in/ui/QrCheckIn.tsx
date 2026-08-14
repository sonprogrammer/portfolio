'use client';

import { useState } from 'react';
import { QrCode } from 'lucide-react';

import { useGetMdog } from '@/features/mungpass/dog/model/useGetMdog';
import { QrCheckInModal } from '@/features/mungpass/check-in/ui/QrCheckInModal';
import { ModalPortal } from '@/shared/ui/modal';


export function QrCheckIn() {
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: dog,
        isPending
    } = useGetMdog();

    return (
        <>
            <div className="mt-4 rounded-3xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 shadow-inner text-orange-400">
                        <QrCode className="h-5 w-5" />
                    </div>

                    <div>
                        <h3 className="font-extrabold text-gray-100 tracking-tight">
                            QR 체크인
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-400">
                            매장의 QR을 스캔해 이용을 시작해보세요.
                        </p>
                    </div>
                </div>

                {!isPending && !dog && (
                    <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5">
                        <p className="text-xs font-semibold text-red-400">
                            ⚠️ QR 체크인을 이용하려면 반려견을 먼저 등록해주세요.
                        </p>
                    </div>
                )}

                <button
                    type="button"
                    disabled={isPending || !dog}
                    onClick={() => setIsOpen(true)}
                    className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none cursor-pointer active:scale-[0.98]"
                >
                    QR 체크인 체험
                </button>
            </div>

            {isOpen && dog && (
                <ModalPortal isOpen={isOpen}>
                    <QrCheckInModal
                        dogId={dog.id}
                        onClose={() => setIsOpen(false)}
                    />
                </ModalPortal>
            )}
        </>
    );
}