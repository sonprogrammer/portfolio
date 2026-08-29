'use client'

import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react'
import { themeMap } from '@/shared/config/all/themeMap'
import { toast } from 'sonner'

type FeatureRevealTheme =
    | 'orange'
    | 'emerald'
    | 'violet'
    | 'blue'
    | 'red'

interface FeatureRevealProps {
    title: string
    description: string
    theme?: FeatureRevealTheme
    children: ReactNode
    coldStartNotice?: boolean

    onBeforeOpen?: () => boolean
}



export function FunctionReveal({
    title,
    description,
    theme = 'orange',
    children,
    coldStartNotice,
    onBeforeOpen
}: FeatureRevealProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        if (onBeforeOpen && !onBeforeOpen()) {
            return
        }
        if (coldStartNotice) {
            toast.info('무료 서버의 Cold Start로 인해 첫 연결 시 잠시 시간이 걸릴 수 있습니다.')
        }
        setIsOpen(true)
    }

    const styles = themeMap[theme]

    return (
        <section
            className={`relative rounded-2xl border bg-gray-950 transition-all duration-500 sm:rounded-3xl ${isOpen
                ? `overflow-visible ${styles.border}`
                : "overflow-hidden border-gray-800"
                }`}
        >
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-40 blur-3xl transition-all duration-700 ${styles.glow
                    } ${isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-20 opacity-0"
                    }`}
            />

            <div className="relative z-10 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 sm:h-11 sm:w-11 sm:rounded-2xl ${isOpen
                                ? `${styles.icon} rotate-0 scale-100`
                                : "scale-95 bg-gray-900 text-gray-600"
                                }`}
                        >
                            <Sparkles className={`h-5 w-5 ${styles.text}`} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-base font-extrabold text-gray-100 sm:text-lg">
                                    {title}
                                </h2>

                                {isOpen && (
                                    <span
                                        className={`rounded-full bg-gray-900 px-2 py-1 text-[10px] font-extrabold tracking-wider ${styles.text}`}
                                    >
                                        LIVE
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs font-medium leading-5 text-gray-300 sm:text-sm sm:leading-6">
                                {description}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
                        className={`group flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 sm:w-auto ${isOpen
                            ? "border border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800"
                            : `${styles.button} text-white shadow-lg`
                            }`}
                    >
                        {isOpen ? (
                            <>
                                체험 닫기

                                <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4 fill-current" />

                                기능 체험하기

                                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                            </>
                        )}
                    </button>
                </div>

                <div className={`grid transition-all duration-700 ease-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className={`min-h-0 ${isOpen ? "overflow-visible" : "overflow-hidden"
                        }`}
                    >
                        <div className={`transition-all duration-700 ease-out ${isOpen
                            ? "translate-y-0 scale-100 blur-0"
                            : "translate-y-6 scale-[0.98] blur-sm"
                            }`}
                        >
                            <div className="mt-5 border-t border-gray-800 pt-5 sm:mt-6 sm:pt-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}