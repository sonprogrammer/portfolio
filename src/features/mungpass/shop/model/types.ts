import { Bound, Coords, KakaoPlace, PartnerKakaoPlace } from "@/entities/mungpass/shops/model/types";

export interface MMapcenter {
    lat: number
    lng: number
}

export type MShopRadius =
    | 2000
    | 5000
    | 10000

export interface MapProps{
    center: Coords
    places: KakaoPlace[];
    onMarkerClick: (place: KakaoPlace) => void;
}

export interface KakaoMapProps {
    center: Coords
    places: PartnerKakaoPlace[]
    onMarkerClick: (place: KakaoPlace) => void;
    onBoundChange?: (bound: Bound) => void
}

export interface FetchShopsRes{
    center: {
        lat: number,
        lon: number
    },
    places: KakaoPlace[]
    isFallbackLocation: boolean
}