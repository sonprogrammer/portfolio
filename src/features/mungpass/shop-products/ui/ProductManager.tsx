'use client'

import { useState } from 'react'
import { Inbox, Loader2, Plus } from 'lucide-react'
import { MShopProduct, useDeleteShopProduct, useGetShopProducts } from '../model'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import { MOwnerShop } from '@/features/mungpass/shop/model/owner-types'
import { toast } from 'sonner'
import { ProductDeleteModal } from '@/features/mungpass/shop-products/ui/ProductDeleteModal'
import { ModalPortal } from '@/shared/ui/modal'

interface ProductManagerProps {
    shop: MOwnerShop
}

export function ProductManager({ shop }: ProductManagerProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [checkModalOpen, setCheckModalOpen] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
    const [editingProduct, setEditingProduct] = useState<MShopProduct | null>(null)
    const shopId = shop.id

    const { data: products = [], isPending, isError } = useGetShopProducts(shopId)
    const deleteMutation = useDeleteShopProduct()

    const handleCreate = () => {

        if (shop.status === 'pending') {
            toast.info('관리자 승인 후 기능을 이용할 수 있습니다.')
            return
        }

        if (shop.status === 'rejected') {
            toast.info('매장 입점 신청이 거절되었습니다.')
            return
        }

        setEditingProduct(null)
        setModalOpen(true)
    }

    const handleEdit = (product: MShopProduct) => {
        setEditingProduct(product)
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setEditingProduct(null)
    }

    const handleDeleteCheck = (productId: string) => {
        setDeleteProductId(productId)
        setCheckModalOpen(true)
    }

    const handleConfirmDelete = () => {
        if (!deleteProductId) return

        deleteMutation.mutate({
            shopId: shop.id,
            productId: deleteProductId
        }, {
            onSuccess: () => {
                toast.success('상품이 삭제되었습니다.')
                setCheckModalOpen(false)
                setDeleteProductId(null)
            },
            onError: error => {
                toast.error(error.message)
            }
        })
    }

    const handleCancelDelete = () => {
        if (deleteMutation.isPending) return

        setCheckModalOpen(false)
        setDeleteProductId(null)
    }

    if (isPending) {
        return (
            <div className="flex h-52 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm sm:text-xl font-extrabold text-gray-100">
                        상품 관리
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-400">
                        회원이 이용할 수 있는 매장 상품을 관리합니다.
                    </p>
                </div>
                {products.length !== 0 && (
                    <button
                        type="button"
                        onClick={handleCreate}
                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-2 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white"
                    >
                        <Plus className="h-4 w-4 hidden sm:block" />
                        상품 등록
                    </button>
                )}

            </div>

            {isError && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-400">
                    상품을 불러오지 못했습니다.
                </div>
            )}

            {!isError && products.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/60 py-16">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-700 bg-emerald-800 text-emerald-400">
                        <Inbox className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-sm font-extrabold text-gray-200">
                        등록된 상품이 없습니다.
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-500">
                        첫 상품을 등록해보세요.
                    </p>

                    <button
                        type="button"
                        onClick={handleCreate}
                        className="mt-5 cursor-pointer flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white"
                    >
                        <Plus className="h-4 w-4" />
                        상품 등록
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDeleteCheck}
                            isDeleting={deleteMutation.isPending && deleteMutation.variables?.productId === product.id}
                        />
                    ))}
                </div>
            )}

            {modalOpen && (
                <ModalPortal isOpen={modalOpen}>
                    <ProductModal
                        key={editingProduct?.id ?? 'create'}
                        shopId={shopId}
                        product={editingProduct}
                        onClose={handleClose}
                    />
                </ModalPortal>
            )}

            <ProductDeleteModal
                isOpen={checkModalOpen}
                isPending={deleteMutation.isPending}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}