'use client'

import { Bound, Coords, KakaoPlace } from "@/entities/mungpass/shops/model/types";
import KakaoMap from "@/features/mungpass/shop/ui/KakaoMap"


interface MapProps {
    center: Coords
    places: KakaoPlace[];
    onMarkerClick: (place: KakaoPlace) => void;
    onBoundChange?: (bound: Bound) => void
}
export function MapContainer({ center, places, onMarkerClick, onBoundChange }: MapProps) {


    return (
        <div className="h-full w-full px-3 pt-3 sm:px-5 sm:pt-4 md:px-10 lg:px-20">
            <div className="h-64 w-full overflow-hidden rounded-[1.75rem] border border-gray-800 bg-gray-900 shadow-2xl sm:h-72 sm:rounded-4xl md:h-80 md:rounded-[2.5rem]">
                <KakaoMap
                    center={center}
                    places={places}
                    onMarkerClick={onMarkerClick}
                    onBoundChange={onBoundChange}
                />
            </div>
        </div>
    )
}