'use client'

import { KakaoPlace } from "@/entities/mungpass/shops/model/types"
import { MapPin, Phone, PhoneMissed } from "lucide-react"

interface PlaceCardProps {
    place: KakaoPlace
    onClick: () => void
}


export function PlaceCard({ place, onClick }: PlaceCardProps) {
    return (
        <div
            onClick={() => onClick()}
            className="group relative cursor-pointer bg-gray-900/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-gray-800 shadow-xl transition-all duration-300 hover:border-orange-500/40 hover:bg-gray-900/90 hover:shadow-orange-500/5 active:scale-[0.98]"
        >
            <div className="flex items-start gap-3">
                <div className="flex-1 space-y-1">
                    <h3 className="font-extrabold text-gray-100 text-lg tracking-tight group-hover:text-orange-400 transition-colors">
                        {place.place_name}
                    </h3>

                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span className="truncate">{place.address_name} |</span>
                        {place.phone ? (
                            <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0"  />
                                <span>{place.phone}</span>

                            </span>
                        ): (
                            <span className="flex items-center gap-1">
                                <PhoneMissed className="w-3.5 h-3.5 text-gray-500 shrink-0"  />
                                <span>-</span>
                            </span>
                        )}
                    </p>

                    {place.distance && (
                        <div className="pt-1">
                            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-orange-400">
                                {Number(place.distance) < 1000
                                    ? `${place.distance}m`
                                    : `${(Number(place.distance) / 1000).toFixed(1)}km`}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
