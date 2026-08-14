import { CircleDollarSign, PlayCircle } from "lucide-react"

interface OwnerUsageStatsProps {
    currentCount: number;
    expectedSales: number
}

export function OwnerUsageStats({ currentCount, expectedSales }: OwnerUsageStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-100">

            <div className="rounded-[2.5rem] border border-gray-800 bg-gray-900/60 backdrop-blur-md p-6 shadow-xl transition-all duration-200 hover:border-gray-700">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                        현재 이용 중
                    </p>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-inner">
                        <PlayCircle className="h-5 w-5" />
                    </div>
                </div>

                <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-3xl font-black text-gray-100 tracking-tight">
                        {currentCount}
                    </span>

                    <span className="mb-1 text-xs font-extrabold text-gray-400">
                        마리
                    </span>
                </div>
            </div>


            <div className="rounded-[2.5rem] border border-gray-800 bg-gray-900/60 backdrop-blur-md p-6 shadow-xl transition-all duration-200 hover:border-gray-700">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                        오늘 예상 매출
                    </p>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-inner">
                        <CircleDollarSign className="h-5 w-5" />
                    </div>
                </div>

                <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-3xl font-black text-gray-100 tracking-tight">
                        {expectedSales.toLocaleString()}
                    </span>

                    <span className="mb-1 text-xs font-extrabold text-gray-400">
                        원
                    </span>
                </div>
            </div>
        </div>
    )
}