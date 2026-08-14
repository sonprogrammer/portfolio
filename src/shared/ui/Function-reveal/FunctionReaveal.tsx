'use client'

import { ReactNode, useState } from 'react'
import {
    ChevronDown,
    ChevronUp,
    Play,
    Sparkles
} from 'lucide-react'
import { themeMap } from '@/shared/config/all/themeMap'

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
}



export function FunctionReveal({
    title,
    description,
    theme = 'orange',
    children
}: FeatureRevealProps) {
    const [isOpen, setIsOpen] = useState(false)

    const styles = themeMap[theme]

    return (
        <section
            className={`relative rounded-3xl border bg-gray-950 transition-all duration-500 ${isOpen ? `overflow-visible ${styles.border}` : "overflow-hidden border-gray-800"
                }`}
        >
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-40 blur-3xl transition-all duration-700 ${styles.glow
                    } ${isOpen
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-20 opacity-0'
                    }`}
            />

            <div className="relative z-10 p-6">
                <div className="flex items-center justify-between gap-5">
                    <div className="flex min-w-0 items-center gap-4">
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${isOpen
                                ? `${styles.icon} rotate-0 scale-100`
                                : 'bg-gray-900 text-gray-600 scale-95'
                                }`}
                        >
                            <Sparkles className={`w-5 h-5 ${styles.text}`} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-extrabold text-gray-100">
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

                            <p className="mt-1 text-sm font-medium text-gray-300">
                                {description}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(prev => !prev)}
                        className={`group cursor-pointer flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${isOpen
                            ? 'border border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800'
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

                <div
                    className={`grid transition-all duration-700 ease-out ${isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                        }`}
                >
                    <div
                        className={`min-h-0 ${isOpen ? "overflow-visible" : "overflow-hidden"
                            }`}
                    >
                        <div
                            className={`transition-all duration-700 ease-out ${isOpen
                                ? 'translate-y-0 scale-100 blur-0'
                                : 'translate-y-6 scale-[0.98] blur-sm'
                                }`}
                        >
                            <div className="mt-6 border-t border-gray-800 pt-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}