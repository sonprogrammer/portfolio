'use client'

import { FuellyActivityLevel, FuellyGoal } from "@/entities/fuelly/user/model/types"
import { useUpdateFuellyProfile } from "@/features/fuelly/profile/model/useUpdateFuellyProfile"
import { ProfileInput } from "@/features/fuelly/profile/ui/ProfileInput"
import { ProfileSelect } from "@/features/fuelly/profile/ui/ProfileSelect"
import { activityLevels, goals } from "@/shared/config/fuelly/fuelly-profile"
import React from "react"



export function ProfileForm() {
    const { mutate, isPending, error } = useUpdateFuellyProfile()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        mutate({
            height: Number(formData.get('height')),
            weight: Number(formData.get('weight')),
            age: Number(formData.get('age')),
            gender: formData.get('gender') === 'female' ? 'female' : 'male',
            activityLevel: formData.get('activityLevel') as FuellyActivityLevel,
            goal: formData.get('goal') as FuellyGoal
        })

    }

    return (
        <main className="flex min-h-[75vh] items-center justify-center px-4 py-10">
            <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8">
                <header>
                    <p className="text-sm font-semibold text-emerald-400">
                        신체정보 등록
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-white">
                        맞춤 영양 목표를 설정할게요
                    </h1>

                    <p className="mt-2 text-sm text-white/50">
                        입력한 정보를 기준으로 권장
                        칼로리와 단백질을 계산합니다.
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 grid gap-5 sm:grid-cols-2"
                >
                    <ProfileInput
                        name="height"
                        label="키"
                        unit="cm"
                        min={100}
                        max={250}
                    />

                    <ProfileInput
                        name="weight"
                        label="몸무게"
                        unit="kg"
                        min={30}
                        max={300}
                        step="0.1"
                    />

                    <ProfileInput
                        name="age"
                        label="나이"
                        unit="세"
                        min={1}
                        max={120}
                    />

                    <ProfileSelect
                        name="gender"
                        label="성별"
                    >
                        <option value="male">
                            남성
                        </option>
                        <option value="female">
                            여성
                        </option>
                    </ProfileSelect>

                    <ProfileSelect
                        name="activityLevel"
                        label="활동량"
                    >
                        {activityLevels.map((item) => (
                            <option
                                key={item.label}
                                value={item.label}
                            >
                                {item.name}
                            </option>
                        ))}
                    </ProfileSelect>

                    <ProfileSelect
                        name="goal"
                        label="목표"
                    >
                        {goals.map((item) => (
                            <option
                                key={item.label}
                                value={item.label}
                            >
                                {item.name}
                            </option>
                        ))}
                    </ProfileSelect>

                    {error && (
                        <p className="text-sm text-red-400 sm:col-span-2">
                            {error instanceof Error
                                ? error.message
                                : '저장에 실패했습니다.'}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-13 cursor-pointer rounded-xl bg-emerald-400 font-semibold text-black disabled:opacity-40 sm:col-span-2"
                    >
                        {isPending
                            ? '저장 중...'
                            : '영양 목표 확인하기'}
                    </button>
                </form>
            </section>
        </main>
    )
}