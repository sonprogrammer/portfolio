'use client'


import { KakaoPlace } from "@/entities/mungpass/shops/model/types";
import { PlaceCard } from "@/entities/mungpass/shops/model/ui";

interface PlaceListProps {
  places: KakaoPlace[]
  placeClick: () => void
}

export function PlaceList({ places, placeClick }: PlaceListProps) {

  const sortedPlaces = [...places].sort((a, b) => Number(a.distance) - Number(b.distance))

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {sortedPlaces.map(place => (
        <PlaceCard
          key={place.id}
          place={place}
          onClick={placeClick}
        />
      ))}
    </div>
  )
}