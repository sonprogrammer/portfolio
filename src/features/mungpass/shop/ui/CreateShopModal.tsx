'use client';

import { FormEvent, useState } from 'react';
import { Loader2, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

import { useCreateShop } from '../model';
import { useGenerateAiShop } from '@/features/mungpass/shop/model/useGenerateAiShop';
import { ModalPortal } from '@/shared/ui/modal';

interface CreateShopModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateShopModal({
    isOpen,
    onClose
}: CreateShopModalProps) {
    const [name, setName] = useState('');
    const [addressName, setAddressName] = useState('');
    const [roadAddressName, setRoadAddressName] = useState('');
    const [phone, setPhone] = useState('');

    const { mutateAsync: create, isPending } = useCreateShop();

    const { mutate: aiGenerateShop, isPending: isGenerating } = useGenerateAiShop()

    if (!isOpen) return null;

    const handleGenerateAiShop = () => {
        aiGenerateShop(undefined, {
            onSuccess: (shop) => {
                setName(shop.name);
                setAddressName(shop.addressName);
                setRoadAddressName(shop.roadAddressName);
                setPhone(shop.phone);

                toast.success('AI가 매장 정보를 생성했습니다.');
            },
            onError: (error) => {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'AI 매장 생성에 실패했습니다.'
                );
            }
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !addressName.trim()) {
            toast.warning('매장명과 주소를 입력해주세요.');
            return;
        }

        const result = await create({
            name,
            addressName,
            roadAddressName,
            phone
        });

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setName('');
        setAddressName('');
        setRoadAddressName('');
        setPhone('');

        onClose();
    };

    return (
        <ModalPortal isOpen={isOpen}>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md h-[70vh]  rounded-[2.5rem] border border-gray-800 overflow-y-auto bg-gray-900 shadow-2xl backdrop-blur-xl p-6 text-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-extrabold text-gray-100 tracking-tight">
                                매장 등록
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                포트폴리오 체험용 매장을 빠르게 등록해보세요.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200 cursor-pointer disabled:opacity-50"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                                매장명
                            </label>

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="예: 멍패스 애견카페"
                                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3.5 text-sm font-medium text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                                주소
                            </label>

                            <input
                                value={addressName}
                                onChange={(e) => setAddressName(e.target.value)}
                                placeholder="예: 서울특별시 강남구 역삼동"
                                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3.5 text-sm font-medium text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                                도로명 주소
                            </label>

                            <input
                                value={roadAddressName}
                                onChange={(e) => setRoadAddressName(e.target.value)}
                                placeholder="예: 서울특별시 강남구 테헤란로 123"
                                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3.5 text-sm font-medium text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                                전화번호
                            </label>

                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="예: 02-1234-5678"
                                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3.5 text-sm font-medium text-gray-100 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-500 shadow-inner"
                            />
                        </div>

                        <div className='flex gap-2 items-center'>
                            <button
                                type="button"
                                onClick={handleGenerateAiShop}
                                disabled={isGenerating || isPending}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border cursor-pointer border-purple-200 bg-purple-50 px-4 py-3 text-sm font-bold text-purple-600 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        AI가 매장 정보 생성 중...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        AI로 빠르게 채우기
                                    </>
                                )}
                            </button>
                            <button

                                type="submit"
                                disabled={isPending}
                                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-orange-500 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none cursor-pointer active:scale-[0.98]"
                            >
                                {isPending ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    '매장 등록하기'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    );
}