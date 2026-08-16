'use client'

import { KakaoPlace } from "@/entities/mungpass/shops/model/types"
import { MapPin, Phone, PhoneMissed } from "lucide-react"

interface PlaceCardProps {
    place: KakaoPlace
    onClick: () => void
}

export function PlaceCard({
    place,
    onClick,
}: PlaceCardProps) {
    return (
        <div
            onClick={() => onClick()}
            className="group relative w-full min-w-0 cursor-pointer rounded-4xl border border-gray-800 bg-gray-900/60 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-orange-500/40 hover:bg-gray-900/90 hover:shadow-orange-500/5 active:scale-[0.98] sm:p-5 md:rounded-[2.5rem] md:p-6"
        >
            <div className="flex min-w-0 items-start gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="truncate text-base font-extrabold tracking-tight text-gray-100 transition-colors group-hover:text-orange-400 sm:text-lg">
                        {place.place_name}
                    </h3>

                    <div className="flex min-w-0 flex-col gap-1 text-xs text-gray-400 sm:flex-row sm:items-center sm:gap-2">
                        <div className="flex min-w-0 items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-500" />

                            <span className="truncate">
                                {place.address_name}
                            </span>
                        </div>

                        <span className="hidden text-gray-600 sm:inline">
                            |
                        </span>

                        {place.phone ? (
                            <span className="flex shrink-0 items-center gap-1">
                                <Phone className="h-3.5 w-3.5 shrink-0 text-gray-500" />

                                <span>{place.phone}</span>
                            </span>
                        ) : (
                            <span className="flex shrink-0 items-center gap-1">
                                <PhoneMissed className="h-3.5 w-3.5 shrink-0 text-gray-500" />

                                <span>-</span>
                            </span>
                        )}
                    </div>

                    {place.distance && (
                        <div className="pt-1">
                            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-400 sm:px-2.5 sm:text-[11px]">
                                {Number(place.distance) < 1000
                                    ? `${place.distance}m`
                                    : `${(Number(place.distance) / 1000).toFixed(1)}km`}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}