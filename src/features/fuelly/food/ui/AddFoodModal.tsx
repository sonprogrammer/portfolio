'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

import { useAnalyzeFood } from '@/features/fuelly/food/model/useAnalyzeFood'
import { useSaveFood } from '@/features/fuelly/food/model/useSaveFood'
import { useAddDailyMeal } from '@/features/fuelly/meal/model/useAddDailyMeal'
import { ModalPortal } from '@/shared/ui/modal'

interface AddFoodModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddFoodModal({
  isOpen,
  onClose,
}: AddFoodModalProps) {
  const [name, setName] = useState('')
  const [calorie, setCalorie] = useState('')
  const [protein, setProtein] = useState('')
  const [unit, setUnit] = useState('')

  const {
    mutate: analyzeFood,
    isPending: isAnalyzing,
  } = useAnalyzeFood()

  const {
    mutate: saveFood,
    isPending: isSaving,
  } = useSaveFood()

  const {
    mutate: addDailyMeal,
    isPending: isAdding,
  } = useAddDailyMeal()

  const handleAnalyze = () => {
    if (!name.trim()) {
      return
    }

    analyzeFood(name.trim(), {
      onSuccess: (food) => {
        setName(food.name)

        setCalorie(
          String(
            food.calorie,
          ),
        )

        setProtein(
          String(
            food.protein,
          ),
        )

        setUnit(
          food.unit,
        )
      },
    })
  }

  const handleAddDailyMeal =
    () => {
      const parsedCalorie =
        Number(calorie)

      const parsedProtein =
        Number(protein)

      if (
        !name.trim() ||
        !unit.trim() ||
        !Number.isFinite(
          parsedCalorie,
        ) ||
        !Number.isFinite(
          parsedProtein,
        )
      ) {
        return
      }

      addDailyMeal(
        {
          foodName: name.trim(),
          calories: parsedCalorie,
          protein: parsedProtein,
          unit: unit.trim(),
        },
        {
          onSuccess: onClose
        },
      )
    }

  const handleSaveFood =
    () => {
      const parsedCalorie =
        Number(calorie)

      const parsedProtein =
        Number(protein)

      if (
        !name.trim() ||
        !unit.trim() ||
        !Number.isFinite(
          parsedCalorie,
        ) ||
        !Number.isFinite(
          parsedProtein,
        )
      ) {
        return
      }

      saveFood(
        {
          name: name.trim(),
          calorie:
            parsedCalorie,
          protein:
            parsedProtein,
          unit: unit.trim(),
        },
        {
          onSuccess:
            onClose,
        },
      )
    }

  return (
    <ModalPortal isOpen={isOpen}>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      >
        <div
          onClick={(event) =>
            event.stopPropagation()
          }
          className="w-full max-w-lg rounded-2xl border border-gray-700 bg-gray-800 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                음식 직접 추가
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                직접 입력하거나 AI로 영양정보를 불러오세요.
              </p>
            </div>

            <button
              type="button"
              aria-label="모달 닫기"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-gray-300">
                음식 이름
              </span>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={
                    name
                  }
                  onChange={(
                    event,
                  ) =>
                    setName(
                      event
                        .target
                        .value,
                    )
                  }
                  placeholder="예: 닭가슴살 샐러드"
                  className="h-11 min-w-0 flex-1 rounded-xl border border-gray-600 bg-gray-900 px-4 text-sm text-white outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  disabled={
                    isAnalyzing
                  }
                  onClick={
                    handleAnalyze
                  }
                  className="shrink-0 rounded-xl border border-emerald-500 px-4 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10 disabled:opacity-50"
                >
                  {isAnalyzing
                    ? '불러오는 중'
                    : 'AI로 불러오기'}
                </button>
              </div>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">
                  칼로리
                </span>

                <div className="flex items-center rounded-xl border border-gray-600 bg-gray-900 px-4">
                  <input
                    type="number"
                    min={0}
                    step="0.1"
                    value={
                      calorie
                    }
                    onChange={(
                      event,
                    ) =>
                      setCalorie(
                        event
                          .target
                          .value,
                      )
                    }
                    className="h-11 min-w-0 flex-1 bg-transparent text-white outline-none"
                  />

                  <span className="text-xs text-gray-500">
                    kcal
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-gray-300">
                  단백질
                </span>

                <div className="flex items-center rounded-xl border border-gray-600 bg-gray-900 px-4">
                  <input
                    type="number"
                    min={0}
                    step="0.1"
                    value={
                      protein
                    }
                    onChange={(
                      event,
                    ) =>
                      setProtein(
                        event
                          .target
                          .value,
                      )
                    }
                    className="h-11 min-w-0 flex-1 bg-transparent text-white outline-none"
                  />

                  <span className="text-xs text-gray-500">
                    g
                  </span>
                </div>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-gray-300">
                기준량
              </span>

              <input
                type="text"
                value={unit}
                onChange={(
                  event,
                ) =>
                  setUnit(
                    event.target
                      .value,
                  )
                }
                placeholder="예: 100g, 1개, 1잔"
                className="h-11 w-full rounded-xl border border-gray-600 bg-gray-900 px-4 text-sm text-white outline-none focus:border-emerald-500"
              />
            </label>

            <p className="text-xs leading-5 text-gray-500">
              AI 영양정보는 추정치이므로 실제 제품의 영양성분과 차이가 있을 수 있습니다.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={
                isAdding
              }
              onClick={
                handleAddDailyMeal
              }
              className="h-11 flex-1 rounded-xl bg-emerald-500 text-sm font-semibold text-white transition-colors hover:bg-emerald-400 disabled:opacity-50"
            >
              {isAdding
                ? '추가 중...'
                : '오늘 식단 추가'}
            </button>

            <button
              type="button"
              disabled={
                isSaving
              }
              onClick={
                handleSaveFood
              }
              className="h-11 flex-1 rounded-xl border border-gray-600 text-sm font-semibold text-gray-200 transition-colors hover:bg-gray-700 disabled:opacity-50"
            >
              {isSaving
                ? '저장 중...'
                : '내 음식으로 저장'}
            </button>
          </div>
        </div>
      </div>
      </ModalPortal>
      )
}