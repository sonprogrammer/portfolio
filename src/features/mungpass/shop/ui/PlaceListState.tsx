'use client'

import { Loader2 } from "lucide-react";

import { memo } from "react";
import { NoResult } from "@/shared/mungpass/ui/NoResult";
import { KakaoPlace } from "@/entities/mungpass/shops/model/types";
import { PlaceList } from "@/features/mungpass/shop/ui/PlaceList";

interface ShopListStateProps {
    isPending: boolean
    places: KakaoPlace[]
    onPlaceClick: () => void
}

function PlaceListStateInner({ isPending, places, onPlaceClick }: ShopListStateProps) {
    //* 로딩
    if (isPending) {
        return (
            <div className="mt-6 flex w-full min-w-0 flex-col items-center justify-center rounded-xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl backdrop-blur-md sm:mt-8 sm:rounded-4xl sm:p-8 md:mt-10 md:rounded-[2.5rem] md:p-10">
                <Loader2 className="mb-2 h-5 w-5 animate-spin text-orange-400 sm:h-6 sm:w-6" />

                <p className="text-center text-xs font-semibold text-gray-400">
                    가까운 장소를 찾는 중...
                </p>
            </div>
        )
    }

    //* 결과 없음
    if (places.length === 0) {
        return (
            <NoResult title="주변에 멍패스 존이 없어요" description={<>검색범위를 넓혀보세요</>}/>
        )
    }

    //* 결과 반환
    return (
        <PlaceList
            places={places}
            placeClick={onPlaceClick}
        />
    )
}

export const PlaceListState = memo(PlaceListStateInner)