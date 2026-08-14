import {
    LucideIcon,
    Minus,
    TrendingDown,
    TrendingUp
} from 'lucide-react'

interface AdminDashboardCardProps {
    title: string
    value: number
    unit: string
    change: number
    icon: LucideIcon
}

export function AdminDashboardCard({
    title,
    value,
    unit,
    change,
    icon: Icon
}: AdminDashboardCardProps) {
    const isIncrease = change > 0
    const isDecrease = change < 0

    return (
        <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500">
                        {title}
                    </p>

                    <div className="mt-3 flex items-end gap-1">
                        <strong className="text-3xl font-extrabold text-gray-100">
                            {value.toLocaleString()}
                        </strong>

                        <span className="mb-1 text-sm font-bold text-gray-500">
                            {unit}
                        </span>
                    </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10">
                    <Icon className="h-5 w-5 text-orange-400" />
                </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
                <div
                    className={`flex items-center gap-1 text-xs font-extrabold ${
                        isIncrease
                            ? 'text-emerald-400'
                            : isDecrease
                                ? 'text-red-400'
                                : 'text-gray-500'
                    }`}
                >
                    {isIncrease ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                    ) : isDecrease ? (
                        <TrendingDown className="h-3.5 w-3.5" />
                    ) : (
                        <Minus className="h-3.5 w-3.5" />
                    )}

                    <span>
                        {change > 0 ? '+' : ''}
                        {change}
                    </span>
                </div>

                <span className="text-xs font-semibold text-gray-600">
                    전일 대비
                </span>
            </div>
        </div>
    )
}