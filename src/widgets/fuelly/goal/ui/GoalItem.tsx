interface GoalItemProps {
    label: string
    value: string
    ariaLabel: string
    variant?: 'default' | 'primary' | 'warning'
    onClick: () => void
}

export function GoalItem({
    label,
    value,
    ariaLabel,
    variant = 'default',
    onClick,
}: GoalItemProps) {
    const variantClassName = {
        default:
            'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white',
        primary:
            'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300',
        warning:
            'bg-red-500/10 text-red-400 hover:bg-red-500/20',
    }[variant]

    return (
        <div className="flex items-center justify-between gap-4">
            <span className="shrink-0 text-xs text-gray-500">
                {label}
            </span>

            <button
                type="button"
                aria-label={ariaLabel}
                onClick={onClick}
                className={`rounded-lg px-2.5 py-1 text-right text-xs font-medium transition-colors ${variantClassName}`}
            >
                {value}
            </button>
        </div>
    )
}