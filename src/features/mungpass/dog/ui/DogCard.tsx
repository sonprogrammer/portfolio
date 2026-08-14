import { MDog } from '@/entities/mungpass/dog/model/types'
import { getDogAge } from '@/features/mungpass/dog/lib/getDogAge'
import { Pencil } from 'lucide-react'



interface DogCardProps {
    dog?: MDog | null
    onRegister?: () => void
    onEdit?: () => void
}

export function DogCard({
    dog,
    onRegister,
    onEdit,
}: DogCardProps) {
    if (!dog) {
        return (
            <div className="flex w-full items-center justify-between rounded-full border-2 border-dashed border-orange-500/20 bg-gray-900/50 p-6 px-10">
                <div>
                    <p className="text-lg font-bold text-gray-200">
                        반려견을 등록해주세요
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        우리 아이 정보를 등록하면 더 편하게 이용할 수 있어요.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onRegister}
                    className="cursor-pointer rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                    등록
                </button>
            </div>
        )
    }

    return (
        <div className="group relative flex items-center justify-between rounded-3xl border border-gray-800 bg-gray-900/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-orange-500/40 hover:bg-gray-900/80 hover:shadow-orange-500/5">
            <div className="flex items-center gap-5">
                

                <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                        <h3 className="text-lg font-bold text-gray-100 tracking-tight">
                            {dog.name}
                        </h3>
                        <span className="text-xs rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-orange-400 font-semibold">
                            {dog.breed}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400">
                        <span>{getDogAge(dog.birth_date)}</span>
                        <span className="text-gray-600">•</span>
                        <span>{dog.weight}kg</span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={onEdit}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-gray-700 bg-gray-950/40 px-4 py-2.5 text-sm font-medium text-gray-300 shadow-sm transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 active:scale-[0.97]"
            >
                <Pencil size={15} />
                <span>수정</span>
            </button>
        </div>
    )
}