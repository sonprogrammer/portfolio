'use client'

import { BntyUser } from "@/entities/bnty/user/model/userTypes"
import { QrCheckIn } from "@/features/bnty/qr/ui"
import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { useGetUser } from "@/features/bnty/user/model/useGetUser"


export function MainPage({user}: {user: BntyUser}) {
    const role = useBntyRoleStore(state => state.role)
    // const { data: user } = useGetUser(role as 'trainer' | 'member')

    return (
        <section>
            {/* {!user ?
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl">
                        🔒
                    </div>
                    <h2 className="text-xl font-bold text-gray-100">로그인이 필요합니다</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        서비스를 원활하게 이용하시려면 로그인 후 다시 시도해 주세요.
                    </p>
                </div> */}
                {/* : */}
                <QrCheckIn role={role} user={user} />

            {/* } */}
        </section>
    )
}