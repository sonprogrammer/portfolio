'use client'

import { useGetMUser } from "@/features/mungpass/auth/model"
import { useMungpassNavStore } from "@/features/mungpass/nav/model"
import { MungpassNav } from "@/features/mungpass/nav/ui"
import { MungpassRoleSelector } from "@/features/mungpass/role/ui"
import { MadminPages } from "@/widgets/mungpass/pages/admin/pages/ui"
import { MungpassLoginPage } from "@/widgets/mungpass/pages/all/ui/MungpassLoginPage"
import { MownerPages } from "@/widgets/mungpass/pages/owner/pages/ui"
import { MuserPages } from "@/widgets/mungpass/pages/user/pages/ui"
import { useShallow } from "zustand/shallow"

export function MungpassPages() {
    const { data: user, isPending, error } = useGetMUser()
    const { role, setRole } = useMungpassNavStore(useShallow(state => ({
        role: state.role,
        setRole: state.setRole
    })
    ))

    if (isPending) {
        return (
            <div>
                로딩 중...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

    if (!user) {
        return <MungpassLoginPage />
    }

    if (!role) {
        return <MungpassRoleSelector role={role} onChange={setRole}/>
    }
    return (
        <div className="">
            <MungpassNav />
            {role === 'member' && (<MuserPages />)}
            {role === 'owner' && (<MownerPages />)}
            {role === 'admin' && (<MadminPages />)}
        </div>
    )
}