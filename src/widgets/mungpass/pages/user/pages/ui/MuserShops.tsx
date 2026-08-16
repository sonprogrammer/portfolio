'use client'

import { MShopRadius } from "@/features/mungpass/shop/model/types"
import { useGetNearByShops } from "@/features/mungpass/shop/model"
import { useSearchShops } from "@/features/mungpass/shop/model"

import { MKakaoProvider } from "@/features/mungpass/shop/ui/MKakaoProvider"
import { AroundHeader } from "@/widgets/mungpass/pages/user/map"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import MapSection from "@/widgets/mungpass/pages/user/map/MapSection"
import { useSelectedPlace } from "@/features/mungpass/shop/model/useSelectedPlace"
import { PlaceListState } from "@/features/mungpass/shop/ui/PlaceListState"
import { Bound } from "@/entities/mungpass/shops/model/types"


export function MuserShops() {
  const [showMap, setShowMap] = useState(false)
  const [radius, setRadius] = useState<MShopRadius>(2000)
  const [keyword, setKeyword] = useState<string>('')
  const [mapCenter, setMapCenter] = useState<Bound | null>(null)
  const [dragBound, setDragBound] = useState<Bound | null>(null)
  const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)

  const setSelectedPlace = useSelectedPlace(state => state.setSelectedPlace)

  const { data: searchData, isPending: searchPending } = useSearchShops(keyword)
  const { data: nearShopData, isPending: nearShopPending } = useGetNearByShops(radius, dragBound)


  const isLoading = keyword ? searchPending : nearShopPending

  const displayCenter = useMemo(() => {
    if (keyword && searchData?.[0]) return { lat: Number(searchData[0].y), lon: Number(searchData[0].x) }
    if (nearShopData?.center) {
      return nearShopData.center
    }
    return { lat: 37.5665, lon: 126.9780 }
  }, [keyword, searchData, nearShopData])


  const handleCenterChange = useCallback((bound: Bound) => {
    setMapCenter(bound)
    setShowRefreshBtn(true)
  }, [])

  // * 지도 움직이거 그 지역에서 재탐색할때
  const handleRefresh = useCallback(() => {
    if (mapCenter) {
      setDragBound(mapCenter)
      setShowRefreshBtn(false)
      setKeyword('')
    }
  }, [mapCenter])

  const handleRadiusChange = useCallback((newRadius: MShopRadius) => {
    setKeyword('')
    setSelectedPlace(null)
    setRadius(newRadius)
  }, [setSelectedPlace])

  const toggleMap = useCallback(() => setShowMap(prev => !prev), [])

  // * 내 위치로 이동
  const handleMyLocation = useCallback(() => {
    setDragBound(null)
    setMapCenter(null)
    setKeyword('')
    setSelectedPlace(null)
    setShowRefreshBtn(false)
  }, [setSelectedPlace])

  const displayShops = useMemo(() => {
    if (keyword && searchData) {
      return searchData
    }
    return nearShopData?.places || []
  }, [keyword, searchData, nearShopData])

  // * 검색, 현재 위치에 따른 데이터 없음 알림
  useEffect(() => {
    if (isLoading) return

    if (!keyword && !dragBound && nearShopData?.isFallbackLocation) {
      toast.info('현재 위치를 가져오지 못해 서울시청 기준으로 검색합니다.')
      return
    }

    if (keyword && searchData && searchData.length === 0) {
      toast.warning(`'${keyword}'에 대한 검색 결과가 없습니다.`)
      return
    }

    if (!keyword && nearShopData && nearShopData.places.length === 0) {
      toast.info('이 지역 주변에는 등록된 매장이 없어요.')
    }
  }, [keyword, searchData, nearShopData, isLoading, dragBound])



  return (
    <MKakaoProvider
      fallback={
        <div className="h-64 w-full animate-pulse rounded-xl bg-gray-100 sm:h-80 sm:rounded-2xl md:h-96" />
      }
    >
      <div className="w-full min-w-0 max-w-full">
        <AroundHeader
          showMap={showMap}
          toggle={toggleMap}
          onSearch={setKeyword}
          radius={radius}
          setRadius={handleRadiusChange}
          onMyLocation={handleMyLocation}
        />
      </div>

      <main className="flex min-h-0 w-full min-w-0 max-w-full flex-1 flex-col overflow-y-auto">
        {showMap && displayCenter && (
          <div className="w-full min-w-0 max-w-full">
            <MapSection
              center={displayCenter}
              keyword={keyword}
              places={displayShops}
              showRefreshBtn={showRefreshBtn}
              onBoundChange={handleCenterChange}
              onRefresh={handleRefresh}
              onMarkerClick={setSelectedPlace}
              onMyLocation={handleMyLocation}
            />
          </div>
        )}

        <div className="min-w-0 flex-1 p-0 sm:p-4 md:p-6">
          {displayShops.length !== 0 && (
            <p className="pb-3 pt-5 pl-1 text-sm font-bold text-orange-500 sm:pb-4 sm:pl-2">
              주변 애견카페
            </p>
          )}

          <div className="w-full min-w-0 max-w-full">
            <PlaceListState
              isPending={isLoading}
              places={displayShops}
              onPlaceClick={() =>
                toast.success('실제 프로젝트에서는 바텀시트 등장합니다.')
              }
            />
          </div>
        </div>
      </main>
    </MKakaoProvider>
  )
}
