'use client'

import {
    FormEvent,
    useState,
} from 'react'

import {
    MDog,
    MDogPayload,
} from '@/entities/mungpass/dog/model/types'

import { useCreateMdog } from '../model/useCreateMdog'
import { useUpdateMdog } from '../model/useUpdateMdog'
import { format } from 'date-fns/format'

interface MungpassDogFormProps {
    dog?: MDog
    onSuccess?: () => void
    onCancel?: () => void
}

export function DogForm({
    dog,
    onSuccess,
    onCancel,
}: MungpassDogFormProps) {
    const [name, setName] = useState(dog?.name ?? '')

    const [breed, setBreed] = useState(dog?.breed ?? '')

    const [birthDate, setBirthDate] = useState(dog?.birth_date ?? '')

    const [weight, setWeight] = useState(dog ? String(dog.weight) : '')

    const createMutation = useCreateMdog()

    const updateMutation = useUpdateMdog()
    const isEditing = !!dog

    const isPending = createMutation.isPending || updateMutation.isPending

    const error =
        createMutation.data?.success === false
            ? createMutation.data.message
            : updateMutation.data?.success === false
                ? updateMutation.data.message
                : null

    const handleSubmit = (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault()

        const payload: MDogPayload = {
            name,
            breed,
            birth_date: birthDate,
            weight: Number(weight),
        }

        if (isEditing) {
            updateMutation.mutate(
                payload,
                {
                    onSuccess: (result) => {
                        if (result.success) {
                            onSuccess?.()
                        }
                    },
                },
            )

            return
        }

        createMutation.mutate(
            payload,
            {
                onSuccess: (result) => {
                    if (result.success) {
                        onSuccess?.()
                    }
                },
            },
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div>
                <label className="mb-2 block text-sm text-gray-400">
                    이름
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="예: 쪼롱이"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-orange-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-gray-400">
                    견종
                </label>

                <input
                    type="text"
                    value={breed}
                    onChange={(e) =>
                        setBreed(e.target.value)
                    }
                    placeholder="예: 요크셔테리어"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-orange-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-gray-400">
                    생년월일
                </label>

                <input
                    type="date"
                    value={birthDate}
                    max={format(new Date(),'yyyy-MM-dd')}
                    onChange={(e) =>setBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-orange-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-gray-400">
                    몸무게
                </label>

                <div className="relative">
                    <input
                        type="number"
                        min={0}
                        step="0.1"
                        value={weight}
                        onChange={(e) =>
                            setWeight(e.target.value)
                        }
                        placeholder="예: 4.5"
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 pr-12 text-sm text-white outline-none transition-colors focus:border-orange-500"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        kg
                    </span>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

            <div className="flex gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-800"
                    >
                        취소
                    </button>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending
                        ? '저장 중...'
                        : isEditing
                            ? '수정하기'
                            : '등록하기'}
                </button>
            </div>
        </form>
    )
}