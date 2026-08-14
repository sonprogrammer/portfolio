'use client'

import { useCreateUser } from "@/features/bnty/user/model"
import { BntyUserRole } from "@/entities/bnty/user/model/userTypes"
import { FormEvent, useState } from "react"

type LoginProps = {
    role: BntyUserRole
}

export function Login({ role }: LoginProps) {
    const [name, setName] = useState('')
    const { mutate: createUser, isPending } = useCreateUser()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmedName = name.trim()

        if (!trimmedName) {
            return
        }

        createUser({
            name: trimmedName,
            role
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <div className="flex flex-col gap-1">
                
                <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                    className="w-full p-2 rounded-xl border border-gray-200 text-gray-100 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
            </div>

            <button
                disabled={isPending}
                type="submit"
                className="py-3 px-4 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
                {isPending ? "로그인 중..." : "로그인"}
            </button>
        </form>
    )
}