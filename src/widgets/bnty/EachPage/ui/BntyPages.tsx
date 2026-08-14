'use client'


import { useBntyNavStore } from "@/features/bnty/nav/model"
import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { useGetUser } from "@/features/bnty/user/model"
import { RoleReqText } from "@/shared/Bnty/ui"
import { LoadingBar } from "@/shared/ui/loadingbar"
import { ChatPage, MainPage, NotePage } from "@/widgets/bnty/EachPage/ui"

export function BntyPages() {
    const role = useBntyRoleStore(state => state.role)
    const activePage = useBntyNavStore(state => state.activePage)
    const { data: user, isPending } = useGetUser(role as 'member' | 'trainer')

    if (!role) {
        return (
            <div className="flex  flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-400">
                    역할을 먼저 선택해주세요.
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                    상단 또는 설정에서 역할을 선택하면 콘텐츠가 표시됩니다.
                </p>
            </div>
        )
    }

    if (role === null) {
        return (
            <RoleReqText />
        )
    }

    if (isPending) {
        return (
            <LoadingBar text="사용자 정보를 불러오는 중..." />
        )
    }

    if (!user) {
        return (
            <div className="flex min-h-100 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl">
                    🔒
                </div>

                <h2 className="text-xl font-bold text-gray-100">
                    로그인이 필요합니다
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    서비스를 이용하려면 사용자 정보를 생성해주세요.
                </p>
            </div>
        )
    }


    switch (activePage) {
        case 'chat':
            return (
                <ChatPage />
            )
        case 'note':
            return <NotePage user={user} role={role} />
        case 'home':
            return <MainPage user={user} />
    }

}