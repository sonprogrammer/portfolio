'use client'


import { LocateFixed, RefreshCw } from "lucide-react";
import { memo, useMemo } from "react";
import dynamic from "next/dynamic";

import { useGetPartnerShops } from "@/features/mungpass/shop/model/useGetPartnerShops";
import { Bound, Coords, KakaoPlace } from "@/entities/mungpass/shops/model/types";
import { MapLoading } from "@/widgets/mungpass/pages/user/map/MapLoading";


interface MapSectionProps {
  center: Coords;
  places: KakaoPlace[];
  onMarkerClick: (place: KakaoPlace) => void;
  showRefreshBtn: boolean;
  onBoundChange: (bound: Bound) => void;
  onRefresh: () => void;
  onMyLocation: () => void;
  keyword: string;
}

const MapContainer = dynamic(() => import('./MapContainer').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => (<MapLoading message="지도 로딩중" />)
})

function MapSection({ center, places, showRefreshBtn, onMarkerClick, onBoundChange, onRefresh, onMyLocation }: MapSectionProps) {

  const { data: partners } = useGetPartnerShops(places)

  const refinedPlaces = useMemo(() => {
    const partnerIdSet = new Set(partners?.map(p => p.kakao_place_id))
    return places.map(place => ({
      ...place,
      isPartner: partnerIdSet.has(place.id)
    }))
  }, [partners, places])
  return (
    <div className="relative w-full min-w-0">
      <MapContainer
        center={center}
        places={refinedPlaces}
        onMarkerClick={onMarkerClick}
        onBoundChange={onBoundChange}
      />

      {showRefreshBtn && (
        <>
          <button
            onClick={onMyLocation}
            className="absolute right-5 top-5 z-10 flex cursor-pointer items-center justify-center rounded-lg bg-orange-400 p-2 md:right-10 md:top-10"
            aria-label="현재위치로 이동"
          >
            <LocateFixed className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            onClick={onRefresh}
            className="absolute left-1/2 top-5 z-40 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-orange-500 bg-white/90  py-2 font-black text-orange-600 shadow-xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95sm:gap-2 px-2 sm:px-4 text-[8px] sm:text-xs md:top-10"
            aria-label="현 지도 지역내 검색"
          >
            <RefreshCw className="h-3 w-3" />
            이 지역 내 재검색
          </button>
        </>
      )}
    </div>
  )
}

export default memo(MapSection)