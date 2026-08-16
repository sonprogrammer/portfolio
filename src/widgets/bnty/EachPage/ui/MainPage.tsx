'use client'

import { BntyUser } from "@/entities/bnty/user/model/userTypes"
import { QrCheckIn } from "@/features/bnty/qr/ui"
import { useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"


export function MainPage({ user }: { user: BntyUser }) {
    const role = useBntyRoleStore(state => state.role)


    return (
        <section>
            <QrCheckIn role={role} user={user} />

        </section>
    )
}