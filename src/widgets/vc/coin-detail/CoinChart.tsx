'use client';

import {
  CandlestickSeries,
  ColorType,
  CrosshairMode,
  Time,
  createChart,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type LogicalRange,
  type UTCTimestamp,
} from 'lightweight-charts';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  VcCandle,
  VcCandleUnit,
} from '@/entities/vc/coin/model/candleTypes';
import { useInfiniteVcCandle } from '@/features/vc/candle/model';



interface CoinChartProps {
  market: string;
}

const CANDLE_UNIT_OPTIONS: {
  label: string;
  value: VcCandleUnit;
}[] = [
    {
      label: '1분',
      value: 1,
    },
    {
      label: '5분',
      value: 5,
    },
    {
      label: '15분',
      value: 15,
    },
    {
      label: '1시간',
      value: 60,
    },
  ];

const LOAD_MORE_THRESHOLD = 30;

function formatChartPrice(
  price: number,
) {
  if (price >= 1_000) {
    return Math.round(
      price,
    ).toLocaleString('ko-KR');
  }

  if (price >= 1) {
    return price.toLocaleString(
      'ko-KR',
      {
        maximumFractionDigits: 4,
      },
    );
  }

  return price.toLocaleString(
    'ko-KR',
    {
      maximumFractionDigits: 8,
    },
  );
}

function createChartData(
  candles: VcCandle[],
): CandlestickData<UTCTimestamp>[] {
  return candles.map((candle) => ({
    time:
      candle.time as UTCTimestamp,

    open: candle.open,
    high: candle.high,
    low: candle.low,
    close: candle.close,
  }));
}

export function CoinChart({ market }: CoinChartProps) {
  const [unit, setUnit] = useState<VcCandleUnit>(1)
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const chartRef = useRef<IChartApi | null>(null)

  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  const hasInitializedRef = useRef(false)

  const loadPreviousCandlesRef = useRef<() => void>(() => { })

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteVcCandle({
    market,
    unit
  })


  const candles = useMemo(() => {
    const candleMap =
      new Map<number, VcCandle>();

    for (const page of data?.pages ?? []) {
      for (const candle of page.candles) {
        candleMap.set(
          candle.time,
          candle,
        );
      }
    }

    return Array.from(
      candleMap.values(),
    ).sort(
      (first, second) =>
        first.time - second.time,
    );
  }, [data]);


  useEffect(() => {
    loadPreviousCandlesRef.current =
      () => {
        if (
          !hasNextPage ||
          isFetchingNextPage
        ) {
          return;
        }

        void fetchNextPage();
      };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  /*
   * 차트 인스턴스 생성
   */
  useEffect(() => {
    const container =
      chartContainerRef.current;

    if (!container) {
      return;
    }

    const chart = createChart(
      container,
      {
        width: container.clientWidth,
        height: 420,

        layout: {
          background: {
            type: ColorType.Solid,
            color: '#111318',
          },

          textColor:
            'rgba(255, 255, 255, 0.45)',

          /*
           * TradingView 출처 표시.
           * 라이선스 링크 요구사항 충족에 도움 된다.
           */
          attributionLogo: true,
        },

        grid: {
          vertLines: {
            color:
              'rgba(255, 255, 255, 0.04)',
          },

          horzLines: {
            color:
              'rgba(255, 255, 255, 0.04)',
          },
        },

        crosshair: {
          mode: CrosshairMode.Normal,

          vertLine: {
            color:
              'rgba(255, 255, 255, 0.22)',
            labelBackgroundColor:
              '#272a31',
          },

          horzLine: {
            color:
              'rgba(255, 255, 255, 0.22)',
            labelBackgroundColor:
              '#272a31',
          },
        },

        rightPriceScale: {
          borderColor:
            'rgba(255, 255, 255, 0.08)',

          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },

        timeScale: {
          borderColor:
            'rgba(255, 255, 255, 0.08)',

          timeVisible: true,
          secondsVisible: false,

          rightOffset: 5,
          barSpacing: 8,
          minBarSpacing: 2,

          lockVisibleTimeRangeOnResize:
            true,
        },

        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
          horzTouchDrag: true,
          vertTouchDrag: false,
        },

        handleScale: {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
        },

        localization: {
          locale: 'ko-KR',

          priceFormatter:
            formatChartPrice,

          timeFormatter: (time:Time) => {
            const timestamp = Number(time) * 1000;

            return new Intl.DateTimeFormat(
              'ko-KR',
              {
                timeZone:
                  'Asia/Seoul',

                month: '2-digit',
                day: '2-digit',

                hour: '2-digit',
                minute: '2-digit',

                hour12: false,
              },
            ).format(
              new Date(timestamp),
            );
          },
        },
      },
    );

    const candleSeries =
      chart.addSeries(
        CandlestickSeries,
        {
          upColor: '#f87171',
          downColor: '#60a5fa',

          wickUpColor: '#f87171',
          wickDownColor: '#60a5fa',

          borderUpColor: '#f87171',
          borderDownColor:
            '#60a5fa',

          borderVisible: false,

          priceFormat: {
            type: 'custom',
            minMove: 0.00000001,
            formatter:
              formatChartPrice,
          },
        },
      );

    chartRef.current = chart;
    candleSeriesRef.current =
      candleSeries;

    const handleVisibleRangeChange = (
      logicalRange: LogicalRange | null,
    ) => {
      if (!logicalRange) {
        return;
      }

      /*
       * 차트 왼쪽에 남은 데이터가
       * 30개 이하가 되면 이전 데이터 조회
       */
      if (
        logicalRange.from <
        LOAD_MORE_THRESHOLD
      ) {
        loadPreviousCandlesRef.current();
      }
    };

    chart
      .timeScale()
      .subscribeVisibleLogicalRangeChange(
        handleVisibleRangeChange,
      );

    const resizeObserver =
      new ResizeObserver(
        (entries) => {
          const entry = entries[0];

          if (!entry) {
            return;
          }

          chart.resize(
            entry.contentRect.width,
            420,
          );
        },
      );

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();

      chart
        .timeScale()
        .unsubscribeVisibleLogicalRangeChange(
          handleVisibleRangeChange,
        );

      chart.remove();

      chartRef.current = null;
      candleSeriesRef.current =
        null;
    };
  }, []);

  /*
   * 마켓 또는 분봉 단위가 바뀌면
   * 이전 차트를 비우고 새 데이터로 초기화한다.
   */
  useEffect(() => {
    hasInitializedRef.current =
      false;

    candleSeriesRef.current?.setData(
      [],
    );
  }, [market, unit]);

  /*
   * React Query의 캔들 데이터를
   * Lightweight Charts에 적용한다.
   */
  useEffect(() => {
    const chart = chartRef.current;
    const candleSeries =
      candleSeriesRef.current;

    if (
      !chart ||
      !candleSeries ||
      candles.length === 0
    ) {
      return;
    }

    candleSeries.setData(
      createChartData(candles),
    );

    /*
     * 최초 조회 또는 분봉 변경 때만
     * 최신 데이터 전체가 보이도록 맞춘다.
     *
     * 과거 데이터 추가 조회 때 fitContent를
     * 호출하면 사용자의 스크롤 위치가 초기화된다.
     */
    if (!hasInitializedRef.current) {
      chart.timeScale().fitContent();

      hasInitializedRef.current =
        true;
    }
  }, [candles]);

  const handleUnitChange = (
    nextUnit: VcCandleUnit,
  ) => {
    if (nextUnit === unit) {
      return;
    }

    setUnit(nextUnit);
  };

  return (
    <section>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111318]">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-medium text-white">
              캔들 차트
            </h2>

            <p className="mt-1 text-xs text-white/35">
              업비트 시세 기준
            </p>
          </div>

          <div className="flex gap-1">
            {CANDLE_UNIT_OPTIONS.map(
              (option) => {
                const isActive =
                  unit === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      handleUnitChange(
                        option.value,
                      );
                    }}
                    className={
                      isActive
                        ? 'rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white'
                        : 'rounded-lg px-3 py-1.5 text-xs text-white/40 transition hover:bg-white/10 hover:text-white'
                    }
                  >
                    {option.label}
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div className="relative h-105">
          <div
            ref={chartContainerRef}
            className="h-full w-full"
          />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#111318]">
              <p className="animate-pulse text-sm text-white/35">
                캔들 데이터를 불러오는
                중입니다.
              </p>
            </div>
          )}

          {isError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#111318]">
              <p className="text-sm text-red-400">
                {error instanceof Error
                  ? error.message
                  : '차트를 불러오지 못했습니다.'}
              </p>

              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                다시 시도
              </button>
            </div>
          )}

          {isFetchingNextPage && (
            <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/60 backdrop-blur-sm">
              이전 캔들을 불러오는 중...
            </div>
          )}

          {!hasNextPage &&
            candles.length > 0 && (
              <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/50 backdrop-blur-sm">
                조회 가능한 가장 오래된
                데이터입니다.
              </div>
            )}
        </div>
      </div>
    </section>
  );
}