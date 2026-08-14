'use client'

import { useGetFuellyUser } from "@/features/fuelly/auth/model/useGetFuellyUser";
import { LoginForm } from "@/features/fuelly/auth/ui";
import { useFuellyNavStore } from "@/features/fuelly/nav/model";
import { ProfileForm } from "@/features/fuelly/profile/ui";
import { FuellyNav } from "@/widgets/fuelly/nav/ui";
import { MainPage } from "@/widgets/fuelly/pages/ui/MainPage";
import { MealsPage } from "@/widgets/fuelly/pages/ui/MealsPage";
import { RecommendPage } from "@/widgets/fuelly/pages/ui/RecommendPage";
import { useShallow } from "zustand/shallow";

export function FuellyPages() {
    const { data: userInfo, isPending } = useGetFuellyUser()
    const { activePage } = useFuellyNavStore(useShallow(state => ({
        activePage: state.activePage,
    })))

    if (isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center text-sm text-white/40">
                사용자 정보를 확인하는 중입니다.
            </div>
        );
    }
    const user = userInfo?.user ?? null;

    if (!user) {
        return <LoginForm />
    }

    if (!user.profile) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center text-white">
                <ProfileForm />
            </div>
        );
    }

    return (
        <main className="space-y-6">
            <div className="flex items-center justify-center">
                <FuellyNav />
            </div>

            {activePage === 'nutrition' && (
                <MainPage
                    user={user}
                />
            )}

            {activePage === 'diet' && (
                <MealsPage profile={user.profile}/>
            )}

            {activePage === 'ai' && (
                <RecommendPage profile={user.profile}/>
            )}
        </main>
    )
}