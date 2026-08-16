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
        <form
            onSubmit={handleSubmit}
            className="flex min-w-0 items-center gap-1.5 sm:gap-2"
        >
            <div className="min-w-0">
                <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                    className="w-28 rounded-xl border border-gray-200 p-2 text-xs text-gray-100 placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-40 sm:text-sm md:w-44"
                />
            </div>

            <button
                disabled={isPending}
                type="submit"
                className="shrink-0 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 sm:text-sm"
            >
                {isPending ? "로그인 중..." : "로그인"}
            </button>
        </form>
    )
}