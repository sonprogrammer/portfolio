import type { ReactNode } from "react";

interface AmountProgressProps {
    label: string;
    currentAmount: number;
    targetAmount: number;
    unit: 'kcal' | 'g'
    icon: ReactNode
}

export function AmountProgress({ label, currentAmount, targetAmount, unit, icon }: AmountProgressProps) {
    const current = Math.max(0, currentAmount)

    const percent = targetAmount > 0 ? Math.min(100, Math.round((current / targetAmount) * 100)) : 0

    const remain = targetAmount - current

    const barColor = percent >= 100 ? 'bg-red-500' : percent >= 75 ? 'bg-orange-400' : 'bg-emerald-500'

    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {icon}

                    <span className="text-sm font-semibold text-white/70">
                        {label}
                    </span>
                </div>

                <span className="text-xs text-white/40">
                    {percent}%
                </span>
            </div>

            <div className="flex items-baseline justify-between gap-3">
                <p className="text-2xl font-bold text-white">
                    {current.toLocaleString('ko-KR')}

                    <span className="ml-1 text-sm font-normal text-white/40">
                        {unit}
                    </span>
                </p>

                <p className="text-xs text-white/40">
                    목표{' '}
                    {targetAmount.toLocaleString('ko-KR')}
                    {unit}
                </p>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                    className={`h-full rounded-full transition-[width] duration-500 ${barColor}`}
                    style={{width: `${percent}%`}}
                />
            </div>

            <p className="text-xs text-white/50">
                {remain > 0 ? (
                    <>
                        남은 {label}:{' '}
                        <strong className="font-semibold text-emerald-400">
                            {remain.toLocaleString('ko-KR')}
                            {unit}
                        </strong>
                    </>
                ) : remain < 0 ? (
                    <>
                        목표 초과:{' '}
                        <strong className="font-semibold text-red-400">
                            +
                            {Math.abs(remain).toLocaleString('ko-KR')}
                            {unit}
                        </strong>
                    </>
                ) : (
                    <strong className="font-semibold text-emerald-400">
                        목표를 달성했습니다.
                    </strong>
                )}
            </p>
        </article>
    )
}