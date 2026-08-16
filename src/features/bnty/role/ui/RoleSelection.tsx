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
        <section className="relative flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0">
            <div className="grid w-full max-w-xs grid-cols-2 gap-3 sm:max-w-sm sm:gap-6 lg:w-auto lg:max-w-none lg:gap-20">
                <NomalBtn
                    onClick={() => handleRoleClick("trainer")}
                    className={`w-full bg-stone-100 px-3 py-1 text-stone-400 ${role === "trainer" && "bg-red-400! text-white!"
                        }`}
                >
                    trainer
                </NomalBtn>

                <NomalBtn
                    type="button"
                    onClick={() => handleRoleClick("member")}
                    className={`w-full bg-stone-100 px-3 py-1 text-stone-400 ${role === "member" && "bg-blue-500! text-white!"
                        }`}
                >
                    Member
                </NomalBtn>
            </div>

            <section className="w-full text-center lg:absolute lg:right-0 lg:w-auto">
                <UserLoginStatus />
            </section>
        </section>
    )
}