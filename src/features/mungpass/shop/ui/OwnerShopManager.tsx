'use client';

import {
    CircleCheck,
    Clock,
    XCircleIcon
} from 'lucide-react';

import { MOwnerShop } from '@/features/mungpass/shop/model/owner-types';

const STATUS_LABEL = {
    pending: '대기',
    approved: '승인',
    rejected: '반려'
};

interface OwnerShopManagerProps {
    shop: MOwnerShop
}

export function OwnerShopManager({ shop }: OwnerShopManagerProps) {


    return (
        <div className="rounded-4xl border border-gray-800 bg-gray-900/60 backdrop-blur-md p-6 shadow-xl text-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                        내 매장
                    </p>

                    <h3 className="mt-1 text-sm sm:text-lg font-extrabold text-gray-100 tracking-tight">
                        {shop.name}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-gray-400">
                        {shop.road_address_name || shop.address_name}
                    </p>
                </div>

                <div className={`flex items-center gap-1.5 rounded-full border px-2 py-1 sm:px-3.5 sm:py-1.5 text-xs font-extrabold shadow-sm 
                        ${shop.status === 'approved'
                        ? 'border-emerald-100/50 bg-emerald-50 text-emerald-700'
                        : shop.status === 'rejected'
                            ? 'bg-red-50 border-red-100 text-red-700'
                            : 'border-blue-100 bg-blue-50 text-blue-700'
                    }`}>
                    {shop.status === 'approved' ? (
                        <CircleCheck className="sm:h-3.5 sm:w-3.5 h-3 w-3 shrink-0" />
                    ) : shop.status === 'rejected' ?
                        (<XCircleIcon className="h-3.5 w-3.5 shrink-0" />)
                        :
                        (
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                        )
                    }


                    <span className='text-[8px] sm:text-base'>{STATUS_LABEL[shop.status]}</span>
                </div>
            </div>
        </div>
    );
}