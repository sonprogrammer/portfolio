'use client'

import { FuellyGoal, FuellyActivityLevel } from '@/entities/fuelly/user/model/types'
import type { GoalEditType, UpdateFuellyProfilePayload } from '../model/types'
import { useState } from 'react'
import { useUpdateGoal } from '@/features/fuelly/goal/model/useUpdateGoal'
import { activityLevels, goals } from '@/shared/config/fuelly/fuelly-profile'
import { X } from 'lucide-react'

interface EditGoalModalProps {
    type: GoalEditType
    recentGoal: FuellyGoal
    recentWeight: number
    recentActivity: FuellyActivityLevel
    onClose: () => void
}

export function EditGoalModal({
    type,
    recentGoal,
    recentWeight,
    recentActivity,
    onClose,
}: EditGoalModalProps) {
    const [goal, setGoal] = useState<FuellyGoal>(recentGoal)
    const [weight, setWeight] = useState((recentWeight).toString())
    const [activity, setActivity] = useState<FuellyActivityLevel>(recentActivity)

    const { mutate: update, isPending, error } = useUpdateGoal()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let payload: UpdateFuellyProfilePayload

        if (type === 'goal') {
            payload = {
                type: 'goal',
                value: goal,
            }
        } else if (
            type === 'weight'
        ) {
            payload = {
                type: 'weight',
                value: Number(weight),
            }
        } else {
            payload = {
                type: 'activity',
                value: activity,
            }
        }

        update(payload, {
            onSuccess: onClose,
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[calc(100vw-2rem)] max-w-95 rounded-2xl border border-gray-700 bg-gray-800 p-6"
        >
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    {type === 'goal' &&
                        '목표 수정'}

                    {type === 'weight' &&
                        '체중 수정'}

                    {type ===
                        'activity' &&
                        '운동량 수정'}
                </h2>

                <button
                    type="button"
                    aria-label="모달 닫기"
                    onClick={onClose}
                    className="text-sm text-gray-400 transition-colors hover:text-white cursor-pointer"
                >
                    <X />
                </button>
            </div>

            {type === 'goal' && (
                <label className="block">
                    <span className="mb-2 block text-sm text-gray-300">
                        목표
                    </span>

                    <select
                        value={goal}
                        onChange={(event) =>
                            setGoal(
                                event.target
                                    .value as FuellyGoal,
                            )
                        }
                        className="h-12 w-full rounded-xl border border-gray-600 bg-gray-900 px-4 text-white outline-none"
                    >
                        {goals.map(
                            (item) => (
                                <option
                                    key={
                                        item.label
                                    }
                                    value={
                                        item.label
                                    }
                                >
                                    {item.name}
                                </option>
                            ),
                        )}
                    </select>
                </label>
            )}

            {type === 'weight' && (
                <label className="block">
                    <span className="mb-2 block text-sm text-gray-300">
                        체중
                    </span>

                    <div className="flex items-center rounded-xl border border-gray-600 bg-gray-900 px-4">
                        <input
                            type="number"
                            required
                            min={30}
                            max={300}
                            step="0.1"
                            value={weight}
                            onChange={(
                                event,
                            ) =>
                                setWeight(
                                    event
                                        .target
                                        .value,
                                )
                            }
                            className="h-12 w-full bg-transparent text-white outline-none"
                        />

                        <span className="text-sm text-gray-500">
                            kg
                        </span>
                    </div>
                </label>
            )}

            {type === 'activity' && (
                <label className="block">
                    <span className="mb-2 block text-sm text-gray-300">
                        운동량
                    </span>

                    <select
                        value={activity}
                        onChange={(event) =>
                            setActivity(
                                event.target
                                    .value as FuellyActivityLevel,
                            )
                        }
                        className="h-12 w-full rounded-xl border border-gray-600 bg-gray-900 px-4 text-white outline-none"
                    >
                        {activityLevels.map(
                            (item) => (
                                <option
                                    key={
                                        item.label
                                    }
                                    value={
                                        item.label
                                    }
                                >
                                    {item.name}
                                </option>
                            ),
                        )}
                    </select>
                </label>
            )}

            {error && (
                <p className="mt-3 text-sm text-red-400">
                    {error instanceof Error
                        ? error.message
                        : '수정에 실패했습니다.'}
                </p>
            )}

            <div className="mt-6 flex gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="h-11 flex-1 rounded-xl border border-gray-600 text-sm font-semibold text-gray-300"
                >
                    취소
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className="h-11 flex-1 rounded-xl bg-emerald-500 text-sm font-semibold text-white disabled:opacity-50"
                >
                    {isPending
                        ? '저장 중...'
                        : '저장하기'}
                </button>
            </div>
        </form>
    )
}