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
            <div className="mt-10 flex flex-col items-center justify-center p-10 bg-gray-900/60 backdrop-blur-md rounded-[2.5rem] border border-gray-800 shadow-xl">
                <Loader2 className="w-6 h-6 text-orange-400 animate-spin mb-2" />
                <p className="text-xs text-gray-400 font-semibold">가까운 장소를 찾는 중...</p>
            </div>
        )
    }

    //* 결과 없음
    if (places.length === 0) {
        return (
            <NoResult title="주변에 멍패스 존이 없어요" description={
                <>
                    검색범위를 넓혀보세요
                </>}
            />
        );
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