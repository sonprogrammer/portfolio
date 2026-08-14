interface ProfileInputProps {
    name: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step?: string;
    defaultValue?: number;
}

export function ProfileInput({
    name,
    label,
    unit,
    min,
    max,
    step = '1',
    defaultValue
}: ProfileInputProps) {
    return (
        <label>
            <span className="mb-2 block text-sm text-white/70">
                {label}
            </span>

            <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-4">
                <input
                    type="number"
                    name={name}
                    required
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={
                        defaultValue
                    }
                    className="h-12 w-full bg-transparent text-white outline-none"
                />

                <span className="text-sm text-white/40">
                    {unit}
                </span>
            </div>
        </label>
    );
}