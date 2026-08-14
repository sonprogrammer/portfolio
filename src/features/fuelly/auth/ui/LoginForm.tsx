'use client'

import { useFuellyLogin } from "@/features/fuelly/auth/model/useFuellyLogin"
import { useState } from "react"

import { FormEvent } from 'react';

export function LoginForm() {
    const [name, setName] = useState('')

    const { mutate: login, isPending: logging, error } = useFuellyLogin()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmedName = name.trim()

        if (!trimmedName) {
            return
        }

        login({ name: trimmedName })
    }
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4">
            <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <div className="text-center">
                    <p className="text-sm font-semibold text-emerald-500">
                        Fuelly
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-white">
                        영양 관리를 시작하세요
                    </h1>

                    <p className="mt-3 text-sm text-white/50">
                        체험에 사용할 이름을
                        입력해주세요.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >
                    <label className="block">
                        <span className="sr-only">
                            이름
                        </span>

                        <input
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target
                                        .value,
                                )
                            }
                            maxLength={20}
                            placeholder="이름을 입력해주세요"
                            className="h-13 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white outline-none placeholder:text-white/30 focus:border-emerald-400"
                        />
                    </label>

                    {error && (
                        <p className="text-sm text-red-400">
                            {error instanceof
                                Error
                                ? error.message
                                : '로그인에 실패했습니다.'}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={
                            !name.trim() ||
                            logging
                        }
                        className="h-13 w-full rounded-xl bg-emerald-300 font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {logging
                            ? '로그인 중...'
                            : '시작하기'}
                    </button>
                </form>
            </section>
        </main>
    )
}