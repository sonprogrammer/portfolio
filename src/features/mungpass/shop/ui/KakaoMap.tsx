'use client';


import { PartnerKakaoPlace } from '@/entities/mungpass/shops/model/types';
import { KakaoMapProps } from '@/features/mungpass/shop/model/types';
import React, { memo } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';


function KakaoMap({ center, places, onMarkerClick, onBoundChange }: KakaoMapProps) {
  console.log('KakaoMap center:', center)
  return (
     <div className="relative h-full w-full">
      <Map
        key={`${center.lat}-${center.lon}`}
        center={{
          lat: center.lat,
          lng: center.lon,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={4}
        isPanto={true}
        scrollwheel={true}
        onIdle={(map) => {
          if (onBoundChange) {
            const currentBound = map.getBounds()
            const sw = currentBound.getSouthWest()
            const ne = currentBound.getNorthEast()

            onBoundChange({
              sw: {
                lat: sw.getLat(),
                lon: sw.getLng(),
              },
              ne: {
                lat: ne.getLat(),
                lon: ne.getLng(),
              },
            })
          }
        }}
      >
        <MapMarker
          position={{
            lat: center.lat,
            lng: center.lon,
          }}
        />

        {places.slice(0, 20).map((place: PartnerKakaoPlace) => (
          <React.Fragment key={place.id}>
            <MapMarker
              position={{
                lat: Number(place.y),
                lng: Number(place.x),
              }}
              onClick={() => onMarkerClick(place)}
              image={
                place.isPartner
                  ? {
                      src: '/dog.png',
                      size: {
                        width: 34,
                        height: 34,
                      },
                    }
                  : undefined
              }
            />

            <CustomOverlayMap
              position={{
                lat: Number(place.y),
                lng: Number(place.x),
              }}
              yAnchor={2.3}
            >
              <div className="rounded-xl border border-gray-700 bg-gray-900/90 px-2 py-1 shadow-xl backdrop-blur-md sm:px-2.5">
                <p className="max-w-28 truncate whitespace-nowrap text-[9px] font-extrabold tracking-tight text-orange-400 sm:max-w-none sm:text-[11px]">
                  {place.place_name}
                </p>
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </Map>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 w-[90%] -translate-x-1/2 sm:bottom-4 sm:w-[80%] md:w-[70%] md:px-10">
        <p className="rounded-full border border-gray-800 bg-gray-900/90 px-3 py-2 text-center text-[9px] font-bold text-white shadow-2xl backdrop-blur-md sm:px-4 sm:py-2.5 sm:text-[11px]">
          📍 마커를 클릭해 멍패스 샵 정보를 확인하세요
        </p>
      </div>
    </div>
  );
}

export default memo(KakaoMap)