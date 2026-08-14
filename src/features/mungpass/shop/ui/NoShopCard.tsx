import { CreateShopModal } from "@/features/mungpass/shop/ui/CreateShopModal";
import { Store } from "lucide-react";


interface NoShopCardProps{
    setIsOpen: (open: boolean) => void
    isOpen: boolean
}

export function NoShopCard({setIsOpen, isOpen}: NoShopCardProps) {
    return (
        <>
            <div className="rounded-[2.5rem] border border-dashed border-gray-800 bg-gray-900/40 backdrop-blur-md p-8 text-center shadow-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-inner mb-4">
                    <Store className="h-6 w-6" />
                </div>

                <h3 className="font-extrabold text-gray-100 tracking-tight text-base">
                    등록된 매장이 없습니다
                </h3>

                <p className="mt-1.5 text-xs text-gray-400">
                    매장을 등록하고 멍패스 사장님 기능을 체험해보세요.
                </p>
                <p className="mt-1 text-xs  underline tracking-wide font-black">
                    * 실제 프로젝트에서의 등록과정을 간단하게 구현하였습니다.
                </p>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 cursor-pointer active:scale-[0.98]"
                >
                    빠르게 매장 등록하기
                </button>
            </div>

            <CreateShopModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}