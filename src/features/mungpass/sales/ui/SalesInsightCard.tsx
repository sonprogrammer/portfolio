'use client'

import { BrainCircuit, Check, FlaskConical, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { MSalesSummary, useGetGenrateAiInsight, useGetTodaySalesInsight } from '../model'

interface SalesInsightCardProps {
    shopId: string
    shopStatus: 'pending' | 'approved' | 'rejected'
    summary: MSalesSummary
    isMockupMode: boolean
}

export function SalesInsightCard({ shopId, shopStatus, summary, isMockupMode }: SalesInsightCardProps) {
    const { data: todayInsight, isPending } = useGetTodaySalesInsight(shopId)
    const insightMutation = useGetGenrateAiInsight()

    const mockInsight = insightMutation.data?.isMockupMode
        ? insightMutation.data.insight
        : null

    const displayInsight = isMockupMode
        ? mockInsight
        : todayInsight?.insight ?? null
    const handleAnalyze = () => {
        if (!isMockupMode && shopStatus === 'pending') {
            toast.info('관리자 승인 후 기능을 이용할 수 있습니다.')
            return
        }

        if (!isMockupMode && shopStatus === 'rejected') {
            toast.info('매장 입점 신청이 거절되었습니다.')
            return
        }

        if (!isMockupMode && todayInsight) {
            toast.info('AI 매출 분석은 하루에 한 번만 가능합니다.')
            return
        }

        if (summary.totalVisits === 0) {
            toast.info('분석할 매출 데이터가 없습니다.')
            return
        }

        insightMutation.mutate({
            shopId,
            summary,
            isMockupMode
        }, {
            onSuccess: data => {
                if (data.isMockupMode) {
                    toast.success('테스트 데이터 AI 분석이 완료되었습니다.')
                    return
                }

                toast.success('AI 매출 분석이 완료되었습니다.')
            }
        })
    }

    if (isPending && !isMockupMode) {
        return (
            <div className="flex h-52 items-center justify-center rounded-3xl border border-gray-800 bg-gray-950">
                <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
            </div>
        )
    }

    return (
        <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10">
                        <BrainCircuit className="h-5 w-5 text-violet-400" />
                    </div>

                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-extrabold text-gray-100">
                            AI 매출 인사이트
                        </h2>

                        {isMockupMode && (
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                                테스트 데이터
                            </span>
                        )}

                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-500">
                        Gemini가 이번 달 매출 데이터를 분석합니다.
                    </p>
                </div>
            </div>

            {displayInsight ? (
                <div className="mt-6 rounded-2xl border border-violet-500/10 bg-violet-500/5 p-5">
                    <p className="whitespace-pre-line text-sm font-semibold leading-7 text-gray-300">
                        {displayInsight}
                    </p>
                </div>
            ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-8 text-center">
                    {isMockupMode ? (
                        <FlaskConical className="mx-auto h-6 w-6 text-emerald-400" />
                    ) : (
                        <Sparkles className="mx-auto h-6 w-6 text-gray-600" />
                    )}

                    <p className="mt-3 text-sm font-semibold text-gray-500">
                        {isMockupMode
                            ? '테스트 매출 데이터를 기반으로 AI 분석을 체험해보세요.'
                            : '매출 데이터를 기반으로 AI 분석을 받아보세요.'
                        }
                    </p>
                </div>
            )}

            <button
                type="button"
                onClick={handleAnalyze}
                disabled={insightMutation.isPending ||(!isMockupMode && !!todayInsight)
                }
                className="mt-5 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {insightMutation.isPending ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        AI가 매출 분석 중...
                    </>
                ) : !isMockupMode && todayInsight ? (
                    <>
                        <Check className="h-4 w-4" />
                        오늘 AI 분석 완료
                    </>
                ) : isMockupMode && mockInsight ? (
                    <>
                        <Sparkles className="h-4 w-4" />
                        테스트 AI 다시 분석하기
                    </>
                ) : isMockupMode ? (
                    <>
                        <FlaskConical className="h-4 w-4" />
                        테스트 AI 분석하기
                    </>
                ) : (
                    <>
                        <Sparkles className="h-4 w-4" />
                        AI 매출 분석하기
                    </>
                )}
            </button>
            {!isMockupMode && todayInsight && (
                <p className="mt-2 text-center text-xs font-semibold text-gray-600">
                    AI 매출 분석은 하루에 한 번 이용할 수 있습니다.
                </p>
            )}

            {isMockupMode && (
                <p className="mt-2 text-center text-xs font-semibold text-gray-600">
                    테스트 AI 분석 결과는 저장되지 않습니다.
                </p>
            )}
        </div>
    )
}