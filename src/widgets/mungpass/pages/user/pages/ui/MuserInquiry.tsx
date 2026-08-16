'use client';

import { useState } from 'react';
import {
    MessageCircle,
    MessageSquareText
} from 'lucide-react';

import { InquiryModal } from '@/features/mungpass/inquiry/ui';

export function MuserInquiry() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='pt-2'>
                <h2 className="text-xl font-extrabold text-gray-100 tracking-tight">
                    관리자 문의 
                </h2>

                <div className="mt-5 rounded-[2.5rem] border border-gray-800 bg-gray-900/60 p-6 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 shadow-inner text-orange-400">
                            <MessageCircle className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-extrabold text-gray-100 tracking-tight">
                                1:1 문의
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                                문의 내역을 확인하거나 새로운 문의를 남길 수 있습니다.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 cursor-pointer active:scale-[0.98]"
                    >
                        <MessageSquareText className="h-4 w-4" />
                        문의 열기
                    </button>
                </div>
            </div>

            <InquiryModal
                isOpen={isOpen}
                senderRole="member"
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}