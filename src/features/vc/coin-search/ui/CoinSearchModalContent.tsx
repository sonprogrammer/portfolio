'use client'

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import debounce from 'lodash/debounce'
import { useVcTickers } from "@/features/vc/market/model";
import { CoinItem } from "@/entities/vc/coin/ui";
import { useVcNavStore } from "@/features/vc/nav/model";

export function CoinSearchModalContent({onClose}: {onClose: () => void}) {
  const [searchInput, setSearchInput] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const { tickers, isLoading } = useVcTickers()
  const setSelectedMarket = useVcNavStore(state => state.setSelectedMarket)

  const updateSearchKeyword = useMemo(() =>
    debounce((val: string) => {
      setSearchKeyword(val.trim().toLowerCase())
    }, 300), []
  )

  useEffect(() => {
    return () => {
      updateSearchKeyword.cancel()
    }
  }, [updateSearchKeyword])

  const filteredTickers = useMemo(() => {
    if (!searchKeyword) {
      return tickers.slice(0, 10)
    }

    return tickers.filter(coin => {
      const koreanName = coin.koreanName
      const englishName = coin.englishName.toLowerCase()
      const market = coin.market.toLowerCase()
      const coinUnit = coin.market.split('-')[1].toLowerCase()
      return (
        koreanName.includes(searchKeyword) ||
        englishName.includes(searchKeyword) ||
        market.includes(searchKeyword) ||
        coinUnit.includes(searchKeyword)
      )

    })
  }, [searchKeyword, tickers])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    updateSearchKeyword(value)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="animate-pulse text-sm text-zinc-500">
          실시간 시세를 불러오는 중입니다.
        </div>
      </div>
    );
  }

  return (

    <section className="flex min-h-0 flex-1 flex-col p-5">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-blue-400/60 focus-within:bg-white/[0.07] focus-within:ring-4 focus-within:ring-blue-500/10">
        <Search
          size={19}
          className="shrink-0 text-white/35"
        />

        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="코인명 또는 심볼 검색"
          autoFocus
          className="h-12 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />


        {searchInput && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => {
              updateSearchKeyword.cancel()
              setSearchInput('')
              setSearchKeyword('')
            }}
            className="text-white/30 transition hover:text-white"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white/70">
            {searchKeyword
              ? `검색 결과 ${filteredTickers.length}개`
              : '실시간 TOP 10'}
          </h3>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {filteredTickers.length > 0 ? (
            filteredTickers.map((ticker) => (
              <CoinItem
                key={ticker.market}
                coin={ticker}
                onSelectCoin={() => {
                  setSelectedMarket(ticker.market)
                  onClose()
                }}
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/35">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>

  )
}