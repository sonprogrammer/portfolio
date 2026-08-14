'use client'


import { MungpassUser } from "@/entities/mungpass/user/model/types"
import { useCreateMungpassUser } from "@/features/mungpass/auth/model"
import { useState } from "react"


interface MungpassLoginFormProps {
    onSuccess: (user: MungpassUser) => void
}

export function MungpassLoginForm({ onSuccess }: MungpassLoginFormProps) {
    const [name, setName] = useState('')

    const { mutate: createUser, isPending, error } = useCreateMungpassUser()



    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmedName = name.trim()

        if (!trimmedName) return

        createUser(name, {
            onSuccess: (user) => {
                onSuccess?.(user)
            }
        })
    }

    return (
        <form
            onSubmit={handleLogin}
            className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl backdrop-blur-md"
        >
            <div className="space-y-1.5">
                <input
                    type="text"
                    value={name}
                    placeholder="테스트 계정 명을 입력해주세요."
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-3.5 text-sm text-gray-100 placeholder-gray-500 transition-all duration-200 outline-none focus:border-orange-500 "
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
                    <span>⚠️</span>
                    <p>{error.message}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={!name.trim() || isPending}
                className="w-full rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer"
            >
                {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>로그인 중...</span>
                    </div>
                ) : (
                    '시작하기'
                )}
            </button>
        </form>
    )
}