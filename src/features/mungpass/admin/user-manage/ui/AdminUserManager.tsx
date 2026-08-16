'use client'

import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { MAdminShopStatusFilter, MAdminUserTypeFilter, useGetAllUsers } from '../model'

import { UserFilters } from './UserFilters'
import { AdminUserList } from './AdminUserList'

export function AdminUserManager() {
    const [search, setSearch] = useState('')
    const [userType, setUserType] = useState<MAdminUserTypeFilter>('all')
    const [shopStatus, setShopStatus] = useState<MAdminShopStatusFilter>('all')

    const { data: users = [], isPending, isError } = useGetAllUsers()

    const filteredUsers = useMemo(() => {
        const keyword = search.trim().toLowerCase()

        return users.filter(user => {
            const matchesName =
                !keyword ||
                user.name.toLowerCase().includes(keyword)

            const matchesUserType =
                userType === 'all' ||
                user.userType === userType

            const matchesShopStatus =
                userType !== 'owner' ||
                shopStatus === 'all' ||
                user.shopStatus === shopStatus

            return (
                matchesName &&
                matchesUserType &&
                matchesShopStatus
            )
        })
    }, [users, search, userType, shopStatus])

    const handleUserTypeChange = (
        value: MAdminUserTypeFilter
    ) => {
        setUserType(value)

        if (value !== 'owner') {
            setShopStatus('all')
        }
    }

    if (isPending) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400">
                회원 목록을 불러오지 못했습니다.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <UserFilters
                search={search}
                userType={userType}
                shopStatus={shopStatus}
                onSearchChange={setSearch}
                onUserTypeChange={handleUserTypeChange}
                onShopStatusChange={setShopStatus}
            />

            <div className="flex items-center justify-between px-1">
                <p className="text-sm font-bold text-gray-500">
                    회원 목록
                </p>

                <p className="text-xs font-bold text-gray-600">
                    {filteredUsers.length.toLocaleString()}명
                </p>
            </div>

            <AdminUserList users={filteredUsers} />
        </div>
    )
}