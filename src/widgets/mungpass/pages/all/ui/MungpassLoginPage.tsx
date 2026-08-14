'use client'


import { MungpassLoginForm } from "@/features/mungpass/auth/ui"
import { useMungpassNavStore } from "@/features/mungpass/nav/model"
import { MungpassRole } from "@/features/mungpass/nav/model/types"
import { MungpassRoleSelector } from "@/features/mungpass/role/ui"
import { useState } from "react"
import Image from 'next/image'

export function MungpassLoginPage() {
    const [selectedRole, setSelectedRole] = useState<MungpassRole>('member')
    const setRole = useMungpassNavStore(state => state.setRole)

    const handleSuccess = () => {
        setRole(selectedRole)
    }

    return (
        <div className="mx-auto w-full max-w-md">
            <div className="mb-8 text-center">
                <div className="flex items-center gap-2 text-3xl font-black justify-center ">
                    <Image
                        src="/mung.png"
                        alt="멍패스 로고"
                        width={32}
                        height={32}
                    />
                    <h1 className="tracking-tighter text-white">
                        멍 <span className="text-orange-500">패스</span>
                    </h1>
                </div>


            </div>

            <div className="space-y-6">
                <MungpassRoleSelector
                    role={selectedRole}
                    onChange={setSelectedRole}
                />

                <MungpassLoginForm
                    onSuccess={handleSuccess}
                />
            </div>
            <p className="mt-5 text-sm text-gray-300 text-center">
                *하나의 데모 계정으로
                모든 역할을 체험할
                수 있습니다.
            </p>
        </div>
    )
}