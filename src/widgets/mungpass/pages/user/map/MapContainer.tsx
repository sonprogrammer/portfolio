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
        <div className="px-20 pt-4 w-full h-full">
            <div className="w-full h-80 bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border  border-gray-800">
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