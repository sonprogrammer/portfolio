'use client'

import { useVcGuestLogin, useVcGuestLogout, useVcGuestSession } from "@/features/vc/guest/model";

export function VcGuestBtn() {
    const { data, isPending } = useVcGuestSession()
    const loginMutation = useVcGuestLogin()
    const logoutMutation = useVcGuestLogout()

    const guest = data?.guest ?? null

    return (
        <div className="flex items-center gap-3">
            {isPending ? (
                <div className="h-9 w-28 animate-pulse rounded-xl bg-white/10" />
            ) : guest ? (
                <div className="flex items-center gap-3">
                    <h1>{guest.nickname}</h1>
                    <div className="text-right">
                        <p className="text-xs text-white/40">
                            보유 원화
                        </p>

                        <p className="text-sm font-medium text-white">
                            {guest.krwBalance.toLocaleString()}
                            원
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={
                            logoutMutation.isPending
                        }
                        onClick={() => {
                            logoutMutation.mutate();
                        }}
                        className="rounded-xl cursor-pointer border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {logoutMutation.isPending
                            ? '로그아웃 중'
                            : '로그아웃'}
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    disabled={
                        loginMutation.isPending
                    }
                    onClick={() => {
                        loginMutation.mutate();
                    }}
                    className="rounded-xl cursor-pointer bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loginMutation.isPending
                        ? '생성 중'
                        : '게스트 로그인'}
                </button>
            )}
        </div>
    )
}