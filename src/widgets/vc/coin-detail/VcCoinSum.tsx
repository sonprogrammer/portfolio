import { VcTicker } from "@/entities/vc/coin/model/coinTypes";
import { formatTradePrice } from "@/shared/lib/vc";
import { MarketStat } from "@/widgets/vc/coin-detail/MarketStat";
import Image from 'next/image'

interface VcCoinSumProps{
    coin: VcTicker;
    coinLogo: string;
}


export function VcCoinSum({coin, coinLogo}: VcCoinSumProps) {
    const coinUnit = coin.market.split('-')[1]
    const changeRate = coin.signedChangeRate * 100

    const changeClassName =
    changeRate > 0
      ? 'text-red-400'
      : changeRate < 0
        ? 'text-blue-400'
        : 'text-zinc-400';
    
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111318] p-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <Image
                  src={coinLogo}
                  alt={`${coin.koreanName} 로고`}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 object-contain"
                />
    
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold text-white">
                      {coin.koreanName}
                    </h1>
    
                    <span className="text-sm text-white/35">
                      {coinUnit}
                    </span>
                  </div>
    
                  <p className="mt-1 text-sm text-white/35">
                    {coin.englishName}
                  </p>
                </div>
              </div>
    
              <div className="md:text-right">
                <p className="text-3xl font-semibold text-white">
                  {coin.tradePrice.toLocaleString()}
                  <span className="ml-1 text-base font-normal text-white/40">
                    원
                  </span>
                </p>
    
                <div
                  className={`mt-2 flex items-center gap-2 md:justify-end ${changeClassName}`}
                >
                  <span>
                    {changeRate > 0 ? '+' : ''}
                    {changeRate.toFixed(2)}%
                  </span>
    
                  <span>
                    {coin.signedChangePrice > 0
                      ? '+'
                      : ''}
                    {coin.signedChangePrice.toLocaleString()}
                    원
                  </span>
                </div>
              </div>
            </div>
    
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <MarketStat
                label="시가"
                value={`${coin.openingPrice.toLocaleString()}원`}
              />
    
              <MarketStat
                label="고가"
                value={`${coin.highPrice.toLocaleString()}원`}
                valueClassName="text-red-400"
              />
    
              <MarketStat
                label="저가"
                value={`${coin.lowPrice.toLocaleString()}원`}
                valueClassName="text-blue-400"
              />
    
              <MarketStat
                label="24시간 거래대금"
                value={formatTradePrice(
                  coin.accTradePrice24h,
                )}
              />
            </div>
          </section>
  )
}