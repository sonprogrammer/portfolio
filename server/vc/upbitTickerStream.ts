import { randomUUID } from 'node:crypto';

import type { Server } from 'socket.io';
import WebSocket, { type RawData } from 'ws';

import type {
    UpbitMarket,
    UpbitTickerMessage,
    VcTicker,
} from './upbitTypes';

const UPBIT_MARKET_URL = 'https://api.upbit.com/v1/market/all?is_details=false';

const UPBIT_WEBSOCKET_URL = 'wss://api.upbit.com/websocket/v1';

export const VC_TICKER_ROOM = 'vc:ticker';

async function getUpbitKrwMarkets(): Promise<UpbitMarket[]> {
    const response = await fetch(UPBIT_MARKET_URL);

    if (!response.ok) {
        throw new Error(
            `업비트 마켓 조회 실패: ${response.status}`,
        );
    }

    const markets = (await response.json()) as UpbitMarket[];

    return markets.filter(({ market }) =>
        market.startsWith('KRW-'),
    );
}

export function startUpbitTickerStream(io: Server) {
    const latestTickers = new Map<string, VcTicker>();
    const pendingTickers = new Map<string, VcTicker>();

    let marketMap = new Map<string, UpbitMarket>();
    let upbitSocket: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;

    const flushTimer = setInterval(() => {
        if (pendingTickers.size === 0) {
            return;
        }

        const updates = Array.from(pendingTickers.values());

        pendingTickers.clear();

        io.to(VC_TICKER_ROOM).emit(
            'vc:ticker:update',
            updates,
        );
    }, 250);

    function scheduleReconnect() {
        if (reconnectTimer) {
            return;
        }

        reconnectTimer = setTimeout(() => {
            reconnectTimer = null;
            void connect();
        }, 3_000);
    }

    function handleMessage(rawData: RawData) {
        try {
            const message = JSON.parse(
                rawData.toString(),
            ) as UpbitTickerMessage;

            const marketInfo = marketMap.get(message.code);

            const ticker: VcTicker = {
                market: message.code,
                koreanName: marketInfo?.korean_name ?? message.code,
                englishName: marketInfo?.english_name ?? message.code,

                tradePrice: message.trade_price,
                openingPrice: message.opening_price,
                highPrice: message.high_price,
                lowPrice: message.low_price,

                signedChangePrice: message.signed_change_price,
                signedChangeRate: message.signed_change_rate,

                accTradePrice24h: message.acc_trade_price_24h,
                accTradeVolume24h: message.acc_trade_volume_24h,

                timestamp: message.timestamp,
            };

            latestTickers.set(message.code, ticker);
            pendingTickers.set(message.code, ticker);
        } catch (error) {
            console.error(
                '업비트 시세 파싱 실패:',
                error,
            );
        }
    }

    async function connect() {
        try {
            const markets = await getUpbitKrwMarkets();

            marketMap = new Map(
                markets.map((market) => [
                    market.market,
                    market,
                ]),
            );

            const marketCodes = markets.map(
                ({ market }) => market,
            );

            upbitSocket = new WebSocket(UPBIT_WEBSOCKET_URL);

            upbitSocket.on('open', () => {
                console.log(
                    `업비트 KRW 마켓 ${marketCodes.length}개 구독 시작`,
                );

                upbitSocket?.send(
                    JSON.stringify([
                        {
                            ticket: randomUUID(),
                        },
                        {
                            type: 'ticker',
                            codes: marketCodes,
                        },
                        {
                            format: 'DEFAULT',
                        },
                    ]),
                );
            });

            upbitSocket.on('message', handleMessage);

            upbitSocket.on('close', () => {
                console.log('업비트 연결 종료, 재연결 시도');

                scheduleReconnect();
            });

            upbitSocket.on('error', (error) => {
                console.error('업비트 소켓 오류:', error);

                upbitSocket?.close(); 
            });
        } catch (error) {
            console.error(
                '업비트 스트림 시작 실패:',
                error,
            );

            scheduleReconnect();
        }
    }

    void connect();

    return {
        getSnapshot(): VcTicker[] {
            return Array.from(latestTickers.values()).sort(
                (a, b) =>
                    b.accTradePrice24h -
                    a.accTradePrice24h,
            );
        },

        stop() {
            clearInterval(flushTimer);

            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
            }

            upbitSocket?.close();
        },
    };
}