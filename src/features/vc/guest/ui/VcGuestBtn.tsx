'use client'

import { useVcGuestLogin, useVcGuestLogout, useVcGuestSession } from "@/features/vc/guest/model";

export function VcGuestBtn() {
    const { data, isPending } = useVcGuestSession()
    const loginMutation = useVcGuestLogin()
    const logoutMutation = useVcGuestLogout()

    const guest = data?.guest ?? null

    return (
        <div className="flex min-w-0 items-center justify-center gap-2 sm:gap-3">
            {isPending ? (
                <div className="h-9 w-24 animate-pulse rounded-xl bg-white/10 sm:w-28" />
            ) : guest ? (
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <h1 className="max-w-20 truncate text-xs text-white sm:max-w-none sm:text-sm">
                        {guest.nickname}
                    </h1>

                    <div className="shrink-0 text-right">
                        <p className="text-[10px] text-white/40 sm:text-xs">
                            보유 원화
                        </p>

                        <p className="text-xs font-medium text-white sm:text-sm">
                            {guest.krwBalance.toLocaleString()}원
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={logoutMutation.isPending}
                        onClick={() => {
                            logoutMutation.mutate();
                        }}
                        className="shrink-0 cursor-pointer rounded-xl border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                    >
                        {logoutMutation.isPending
                            ? "로그아웃 중"
                            : "로그아웃"}
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    disabled={loginMutation.isPending}
                    onClick={() => {
                        loginMutation.mutate();
                    }}
                    className="cursor-pointer rounded-xl bg-blue-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                >
                    {loginMutation.isPending
                        ? "생성 중"
                        : "게스트 로그인"}
                </button>
            )}
        </div>
    )
}