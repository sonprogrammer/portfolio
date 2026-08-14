'use client';

import { FormEvent, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
    MInquiryRole,
    useCreateInquiryRoom
} from '../model';

interface InquiryCreateFormProps {
    senderRole: MInquiryRole;
    onSuccess: () => void;
}

const CATEGORY_OPTIONS = [
    '이용 문의',
    '매장 문의',
    '결제 문의',
    '시스템 오류',
    '기타 문의'
];

export function InquiryCreateForm({
    senderRole,
    onSuccess
}: InquiryCreateFormProps) {
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const {
        mutateAsync: createInquiry,
        isPending
    } = useCreateInquiryRoom();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !message.trim()) {
            toast.warning('문의 제목과 내용을 입력해주세요.');
            return;
        }

        try {
            await createInquiry({
                userType: senderRole,
                category,
                title,
                message
            });

            toast.success('문의가 등록되었습니다.');
            onSuccess();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : '문의 등록에 실패했습니다.'
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 overflow-y-auto p-6 no-scrollbar bg-gray-950/20 text-gray-100"
        >
            <div>
                <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                    문의 유형
                </label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-gray-800 bg-gray-900/80 px-4 py-3.5 text-sm font-semibold text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-inner cursor-pointer"
                >
                    {CATEGORY_OPTIONS.map((option) => (
                        <option
                            key={option}
                            value={option}
                            className="bg-gray-900 text-gray-100 py-2"
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                    제목
                </label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="문의 제목을 입력해주세요."
                    className="w-full rounded-2xl border border-gray-800 bg-gray-900/80 px-4 py-3.5 text-sm font-semibold text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                />
            </div>

            <div>
                <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                    문의 내용
                </label>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="문의 내용을 입력해주세요."
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-gray-800 bg-gray-900/80 px-4 py-3.5 text-sm font-semibold text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none cursor-pointer active:scale-[0.98]"
            >
                {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                    '문의 등록'
                )}
            </button>
        </form>
    );
}