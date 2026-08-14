'use client'

import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { useGetUser } from "@/features/bnty/user/model/useGetUser"
import { Login } from "@/features/bnty/user/ui"

export function UserLoginStatus() {
    const role = useBntyRoleStore(state => state.role)
    const { data: user } = useGetUser(role as 'trainer' | 'member')

    return (
        <div className='flex items-center'>
            {!role ? (
                <></>
            ) : !user ? (
                <div className="flex gap-2 items-center">
                    <h1>{role === 'member' ? '회원' : '트레이너'}</h1>
                    <Login role={role} />
                </div>
            ) : (
                <div className="flex gap-1 items-center">
                    <h1>{user.name}</h1>
                    <p className="text-sm text-gray-500">
                        {user.role === 'member' ? '회원님' : '트레이너님'}
                    </p>
                </div>
            )}
        </div>
    )
}