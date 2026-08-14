'use client';

import { CoinSearchModalContent } from '@/features/vc/coin-search/ui/CoinSearchModalContent';
import { ModalPortal } from '@/shared/ui/modal';
import { X } from 'lucide-react';

type CoinSearchModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function CoinSearchModal({
    isOpen,
    onClose,
}: CoinSearchModalProps) {
    if (!isOpen) return null

    return (
        <ModalPortal isOpen={isOpen}>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4  backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="w-full h-[70vh] flex flex-col max-w-lg overflow-hidden  rounded-3xl border border-white/10 bg-[#111318] shadow-2xl shadow-black/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                코인 검색
                            </h2>
                            <p className="mt-1 text-sm text-white/40">
                                원하는 코인을 검색해보세요.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex size-9 items-center justify-center rounded-xl text-white/40 transition hover:bg-white/10 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <CoinSearchModalContent onClose={onClose} />
                </div>
            </div>
        </ModalPortal>
    );
}