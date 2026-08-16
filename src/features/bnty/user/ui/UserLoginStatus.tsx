'use client'

import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { useGetUser } from "@/features/bnty/user/model/useGetUser"
import { Login } from "@/features/bnty/user/ui"

export function UserLoginStatus() {
    const role = useBntyRoleStore(state => state.role)
    const { data: user } = useGetUser(role as 'trainer' | 'member')

    return (
        <div className="flex items-center justify-center whitespace-nowrap lg:justify-start">

            {!role ? (
                <></>
            ) : !user ? (
                <div className="flex items-center gap-2">
                    <h1 className="text-xs font-medium sm:text-sm">
                        {role === "member" ? "회원" : "트레이너"}
                    </h1>
                    <Login role={role} />
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <h1 className="text-xs font-semibold sm:text-sm">
                        {user.name}
                    </h1>

                    <p className="text-xs text-gray-500 sm:text-sm">
                        {user.role === "member" ? "회원님" : "트레이너님"}
                    </p>
                </div>
            )}
        </div>
    )
}