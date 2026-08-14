'use client'

import { Clock3, Pencil, Trash2 } from 'lucide-react'

import { MShopProduct } from '../model/types'

interface ProductCardProps {
    product: MShopProduct
    isDeleting: boolean
    onEdit: (product: MShopProduct) => void
    onDelete: (productId: string) => void
}

export function ProductCard({ product, isDeleting, onEdit, onDelete }: ProductCardProps) {
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-gray-100">
                            {product.name}
                        </h3>

                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${product.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
                            {product.is_active ? '활성' : '비활성'}
                        </span>
                    </div>

                    <p className="mt-3 text-xl font-extrabold text-orange-400">
                        {product.price.toLocaleString()}원
                    </p>
                </div>

                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-800 hover:text-gray-100"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => onDelete(product.id)}
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-400">
                <Clock3 className="h-4 w-4" />

                <span>
                    기본 {product.duration_minutes}분
                </span>

                <span className="text-gray-700">·</span>

                <span>
                    초과 {product.overtime_unit_mins}분당 {product.overtime_unit_price.toLocaleString()}원
                </span>
            </div>

            <p className="mt-2 text-xs font-semibold text-gray-500">
                유예 시간 {product.grace_period_mins}분
            </p>
        </div>
    )
}