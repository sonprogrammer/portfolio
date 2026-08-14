import {
    MShopManageStatusFilter
} from '../model'

interface ShopManageFiltersProps {
    status: MShopManageStatusFilter
    onChange: (status: MShopManageStatusFilter) => void
    counts: {
        all: number
        pending: number
        approved: number
        rejected: number
    }
}

const options: {
    value: MShopManageStatusFilter
    label: string
}[] = [
    {
        value: 'all',
        label: '전체'
    },
    {
        value: 'pending',
        label: '심사중'
    },
    {
        value: 'approved',
        label: '입점완료'
    },
    {
        value: 'rejected',
        label: '반려'
    }
]

export function ShopManageFilters({
    status,
    onChange,
    counts
}: ShopManageFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map(option => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                        status === option.value
                            ? 'bg-orange-500 text-white'
                            : 'border border-gray-800 bg-gray-950 text-gray-500 hover:bg-gray-900 hover:text-gray-200'
                    }`}
                >
                    {option.label}

                    <span className="ml-2 text-xs opacity-70">
                        {counts[option.value]}
                    </span>
                </button>
            ))}
        </div>
    )
}