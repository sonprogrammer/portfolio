'use client'

import { ChevronDown, Lightbulb } from "lucide-react";
import { useState } from "react";

export interface TechChoice {
    title: string;
    description: string;
    points: string[]
}


interface TechChoiceCardProps {
    data: TechChoice
    colors?: string
}

export function TechChoiceCard({ data, colors }: TechChoiceCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="px-5 pt-5 md:px-10 xl:px-20">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left sm:p-7"
                >
                    <div className="flex min-w-0 items-start gap-4">
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 ${colors}`}
                        >
                            <Lightbulb className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <p
                                className={`text-xs font-bold uppercase tracking-[0.18em] ${colors}`}
                            >
                                Why this stack
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-white">
                                {data.title}
                            </h3>

                            <p className="mt-2 text-sm font-medium leading-6 text-white/50">
                                {data.description}
                            </p>
                        </div>
                    </div>

                    <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        } ${colors}`}
                    />
                </button>

                <div
                    className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="border-t border-white/10 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                            <div className="space-y-4">
                                {data.points.map((point) => (
                                    <div
                                        key={point}
                                        className="flex items-start gap-3"
                                    >
                                        <span
                                            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${colors}`}
                                        />

                                        <p className="text-sm font-medium leading-7 text-white/70">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

