'use client';

import { useState } from 'react';
import {
    ArrowLeft,
    Clock,
    Loader2,
    MapPin,
    QrCode,
    X
} from 'lucide-react';
import { toast } from 'sonner';

import {
    MCheckInQrPayload,
    MCheckInShop,
    MShopProduct,
} from '@/features/mungpass/check-in/model/types';
import { useCreateCheckIn, useGetCheckInShops, useGetShopProducts } from '@/features/mungpass/check-in/model';

interface QrCheckInModalProps {
    dogId: string;
    onClose: () => void;
}

export function QrCheckInModal({ dogId, onClose }: QrCheckInModalProps) {
    const [selectedShop, setSelectedShop] = useState<MCheckInShop | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<MShopProduct | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const {
        data: shops = [],
        isPending: shopsPending
    } = useGetCheckInShops();

    const {
        data: products = [],
        isPending: productsPending
    } = useGetShopProducts(selectedShop?.id ?? null);

    const {
        mutateAsync: checkIn,
        isPending: checkInPending
    } = useCreateCheckIn();

    const handleBack = () => {
        if (selectedProduct) {
            setSelectedProduct(null);
            return;
        }

        if (selectedShop) {
            setSelectedShop(null);
        }
    };

    const handleCheckIn = async () => {
        if (!selectedShop || !selectedProduct) return;

        setIsScanning(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const qrPayload: MCheckInQrPayload = {
            type: 'mungpass-check-in',
            shopId: selectedShop.id
        };

        const decodedText = JSON.stringify(qrPayload);
        const parsedQr = JSON.parse(decodedText) as MCheckInQrPayload;

        if (parsedQr.type !== 'mungpass-check-in') {
            toast.error('올바르지 않은 QR 코드입니다.');
            setIsScanning(false);
            return;
        }

        const result = await checkIn({
            shopId: parsedQr.shopId,
            productId: selectedProduct.id,
            dogId
        });

        if (!result.success) {
            toast.error(result.message);
            setIsScanning(false);
            return;
        }

        toast.success(`${selectedShop.name} 체크인이 완료되었습니다.`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-[2.5rem] bg-gray-900 border border-gray-800 p-6 shadow-2xl backdrop-blur-xl text-gray-100">

                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        {selectedShop && !isScanning && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="rounded-xl p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        )}

                        <div>
                            <h2 className="text-lg font-extrabold tracking-tight text-gray-100">
                                QR 체크인 체험
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-400">
                                실제 서비스에서는 매장 QR을 스캔해 매장을 식별합니다.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={isScanning || checkInPending}
                        onClick={onClose}
                        className="rounded-xl p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>


                {isScanning ? (
                    <div className="py-10 text-center space-y-6">
                        <div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/60 shadow-inner">
                            <QrCode className="h-20 w-20 text-gray-700" />
                            <div className="absolute left-4 right-4 top-1/2 h-0.5 animate-pulse bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                        </div>

                        <div className="flex items-center justify-center gap-2.5">
                            <Loader2 className="h-4 w-4 animate-spin text-orange-400" />
                            <p className="text-sm font-bold text-gray-300">
                                {selectedShop?.name} QR을 인식하고 있습니다.
                            </p>
                        </div>
                    </div>
                ) : !selectedShop ? (

                    <div className="mt-6 space-y-4">
                        <p className="text-sm font-extrabold text-gray-300">
                            체크인할 매장을 선택해주세요.
                        </p>

                        {shopsPending ? (
                            <Loading />
                        ) : (
                            <div className="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar pr-1">
                                {shops.map((shop) => (
                                    <button
                                        key={shop.id}
                                        type="button"
                                        onClick={() => setSelectedShop(shop)}
                                        className="w-full rounded-2xl border border-gray-800 bg-gray-950/40 p-4 text-left transition-all duration-200 hover:border-orange-500/50 hover:bg-gray-950/80 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-extrabold text-gray-100 group-hover:text-orange-400 transition-colors">
                                                {shop.name}
                                            </p>

                                            {shop.is_demo && (
                                                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-orange-400">
                                                    데모
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                                            <MapPin className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                                            <span className="truncate">{shop.road_address_name || shop.address_name}</span>
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : !selectedProduct ? (
                    <div className="mt-6 space-y-4">
                        <div className="rounded-2xl border border-gray-800 bg-gray-950/50 p-4 shadow-inner">
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                선택한 매장
                            </p>
                            <p className="mt-1 font-extrabold text-gray-200 text-sm">
                                {selectedShop.name}
                            </p>
                        </div>

                        <p className="text-sm font-extrabold text-gray-300">
                            이용할 상품을 선택해주세요.
                        </p>

                        {productsPending ? (
                            <Loading />
                        ) : products.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-gray-800 p-8 text-center text-sm text-gray-500 bg-gray-950/30">
                                등록된 상품이 없습니다.
                            </div>
                        ) : (
                            <div className="space-y-2.5 max-h-65 overflow-y-auto no-scrollbar pr-1">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        type="button"
                                        onClick={() => setSelectedProduct(product)}
                                        className="w-full rounded-2xl border border-gray-800 bg-gray-950/40 p-4 text-left transition-all duration-200 hover:border-orange-500/50 hover:bg-gray-950/80 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-extrabold text-gray-100 group-hover:text-orange-400 transition-colors">
                                                {product.name}
                                            </p>
                                            <p className="font-black text-orange-400">
                                                {product.price.toLocaleString()}원
                                            </p>
                                        </div>

                                        <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                                            <Clock className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                                            <span>{product.duration_minutes}분</span>
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mt-6 space-y-5">
                        <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-5 space-y-4 shadow-inner">
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    매장
                                </p>
                                <p className="mt-1 font-extrabold text-gray-200 text-sm">
                                    {selectedShop.name}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-gray-800/80">
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    상품
                                </p>
                                <div className="mt-1 flex items-center justify-between">
                                    <p className="font-extrabold text-gray-200 text-sm">
                                        {selectedProduct.name}
                                    </p>
                                    <p className="font-black text-orange-400">
                                        {selectedProduct.price.toLocaleString()}원
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleCheckIn}
                            disabled={checkInPending}
                            className="w-full rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none transition-all duration-200 cursor-pointer active:scale-[0.98]"
                        >
                            {checkInPending ? '처리 중...' : 'QR 스캔 체험'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function Loading() {
    return (
        <div className="flex h-28 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
        </div>
    );
}