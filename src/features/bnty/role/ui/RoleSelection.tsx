'use client'

import { BntyRole, useBntyRoleStore } from "@/features/bnty/role/model/RoleStore"
import { UserLoginStatus } from "@/features/bnty/user/ui"
import { NomalBtn } from "@/shared/ui/buttons"
import { useShallow } from "zustand/shallow"


export function RoleSelection() {
    const { role, setRole } = useBntyRoleStore(
        useShallow(state => ({
            role: state.role,
            setRole: state.setRole
        }))
    )

    const handleRoleClick = (role: BntyRole) => {
        setRole(role)
    }

    return (
        <section className="relative flex w-full justify-center items-center">
            <div className="grid grid-cols-2 gap-20">
                <NomalBtn
                    onClick={() => handleRoleClick('trainer')}
                    className={`bg-stone-100 text-stone-400 px-3 py-1 ${role === 'trainer' && 'bg-red-400! text-white!'}`}
                >
                    trainer
                </NomalBtn>
                <NomalBtn type="button"
                    onClick={() => handleRoleClick('member')}
                    className={`bg-stone-100 text-stone-400 px-3 py-1 ${role === 'member' && 'bg-blue-500! text-white!'}`}
                >
                    Member
                </NomalBtn>
            </div>

            <section className='absolute right-0 '>

                <UserLoginStatus />
            </section>

        </section>
    )
}