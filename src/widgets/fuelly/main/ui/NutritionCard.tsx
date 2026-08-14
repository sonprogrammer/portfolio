

interface NutritionCardProps {
    label: string;
    value: number;
    unit: string;
    emphasized?: boolean;
}

export function NutritionCard({
    label,
    value,
    unit,
    emphasized = false,
}: NutritionCardProps) {
    return (
        <article
            className={[
                'rounded-2xl border p-5',
                emphasized
                    ? 'border-emerald-400/30 bg-emerald-400/10'
                    : 'border-white/10 bg-white/5',
            ].join(' ')}
        >
            <p className="text-sm text-white/50">
                {label}
            </p>

            <p className="mt-3 text-2xl font-bold text-white">
                {value.toLocaleString(
                    'ko-KR',
                )}

                <span className="ml-1 text-sm font-normal text-white/40">
                    {unit}
                </span>
            </p>
        </article>
    );
}