import { Users } from 'lucide-react'

import { MAdminUser } from '../model'

import { AdminUserCard } from './AdminUserCard'

interface AdminUserListProps {
    users: MAdminUser[]
}

export function AdminUserList({
    users
}: AdminUserListProps) {
    if (users.length === 0) {
        return (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-950">
                <Users className="h-7 w-7 text-gray-700" />

                <p className="mt-3 text-sm font-bold text-gray-500">
                    조건에 맞는 회원이 없습니다.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {users.map(user => (
                <AdminUserCard
                    key={user.id}
                    user={user}
                />
            ))}
        </div>
    )
}