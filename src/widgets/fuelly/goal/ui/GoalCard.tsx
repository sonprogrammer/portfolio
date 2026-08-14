// src/widgets/fuelly-goal-card/ui/GoalCard.tsx

'use client'

import { FuellyActivityLevel, FuellyGoal } from '@/entities/fuelly/user/model/types'
import { GoalEditType } from '@/features/fuelly/goal/model/types'
import { EditGoalModal } from '@/features/fuelly/goal/ui/EditGoalModal'
import { activityLevels, goals } from '@/shared/config/fuelly/fuelly-profile'
import { ModalPortal } from '@/shared/ui/modal'
import { GoalItem } from '@/widgets/fuelly/goal/ui/GoalItem'
import { useState } from 'react'



interface GoalCardProps {
    goal: FuellyGoal
    weight: number
    activity: FuellyActivityLevel
}


export function GoalCard({
    goal,
    weight,
    activity,
}: GoalCardProps) {
    const [editType, setEditType] = useState<GoalEditType | null>(null)

    const goalName = goals.find(g => g.label === goal)?.name ?? '설정 필요'
    const activityName = activityLevels.find(a => a.label === activity)?.name ?? '설정 필요'

    const closeModal = () => {
        setEditType(null)
    }

    return (
        <>
            <section className="relative rounded-2xl border border-gray-700 bg-gray-800 p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">
                        내 목표
                    </h2>

                    <p className="text-xs text-gray-500">
                        클릭하여 수정
                    </p>
                </div>

                <div className="space-y-3">
                    <GoalItem
                        label="목표"
                        value={goalName}
                        ariaLabel="목표 수정"
                        variant="primary"
                        onClick={() => setEditType('goal')}
                    />

                    <GoalItem
                        label="체중"
                        value={
                            weight !== undefined
                                ? `${weight}kg`
                                : '설정 필요'
                        }
                        ariaLabel="몸무게 수정"
                        onClick={() => setEditType('weight')}
                    />

                    <GoalItem
                        label="운동량"
                        value={activityName}
                        ariaLabel="활동량 수정"
                        variant={activity ? 'default' : 'warning'}
                        onClick={() => setEditType('activity')}
                    />
                </div>
            </section>

            {editType && (
                <ModalPortal isOpen={true}>
                    <div
                        onClick={closeModal}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                        >
                            <EditGoalModal
                                type={editType}
                                recentGoal={goal}
                                recentWeight={weight}
                                recentActivity={activity}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                </ModalPortal>
            )}
        </>
    )
}

