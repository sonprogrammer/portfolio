import { VcTicker } from "@/entities/vc/coin/model/coinTypes";
import { formatTradePrice } from "@/shared/lib/vc"
import Image from 'next/image'


interface CoinItemProps {
    coin: VcTicker;
    onSelectCoin: () => void
}

export function CoinItem({ coin, onSelectCoin }: CoinItemProps) {
    const changeRate = coin.signedChangeRate * 100;

    const changeClassName = changeRate > 0 ? 'text-red-400' : changeRate < 0 ? 'text-blue-400' : 'text-zinc-400';
    const coinUnit = coin.market.split('-')[1]
    const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`

    
    return (
        <button
            type="button"
            className="grid w-full grid-cols-[1fr_1fr_1fr_1fr] items-center border-t border-zinc-800 px-5 py-4 text-left transition-colors hover:bg-zinc-900/70"
            onClick={onSelectCoin}
        >
            <div className="flex items-center gap-5">
                <Image
                    src={coinLogo}
                    alt={`${coin.koreanName} 로고`}
                    width={30}
                    height={30}
                    className="sm:h-7.5 sm:w-7.5 h-4 w-4 shrink-0 object-contain"
                />
                <div>

                    <p className="font-medium text-xs sm:text-base ">
                        {coin.koreanName}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500 sm:text-base ">
                        {coin.market.replace(
                            'KRW-',
                            '',
                        )}
                    </p>
                </div>
            </div>
            <p className="text-right font-medium text-xs sm:text-base">
                {(coin.tradePrice).toLocaleString()}
                원
            </p>
            <p
                className={`text-right ${changeClassName} text-xs sm:text-base ` }
            >
                {changeRate > 0 ? '+' : ''}
                {changeRate.toFixed(2)}%
            </p>

            <p className="text-right text-sm text-zinc-400 sm:text-base ">
                {formatTradePrice(coin.accTradePrice24h)}
            </p>

        </button>
    )
}