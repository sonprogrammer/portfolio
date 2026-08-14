'use client'

import { FuellyUser } from "@/entities/fuelly/user/model/types"
import { GoalCard } from "@/widgets/fuelly/goal/ui/GoalCard"
import { NutritionSummary } from "@/widgets/fuelly/main/ui"


export function MainPage({ user }: { user: FuellyUser }) {

  if (!user.profile) {
    return null
  }

  console.log('user', user)


  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-white/50">
          <span className='font-black text-emerald-500'>{user.name} </span>
          {`님의 신체정보를
          기준으로 계산했습니다.`}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-white">
          오늘의 영양 목표
        </h1>
      </header>

      <NutritionSummary user={user} />

      <GoalCard
        goal={user.profile.goal}
        weight={user.profile.weight}
        activity={user.profile.activityLevel}
      />


    </div>
  )
}