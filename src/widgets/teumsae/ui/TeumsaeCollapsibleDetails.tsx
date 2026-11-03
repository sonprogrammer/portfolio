"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type TeumsaeCollapsibleDetailsProps = {
    children: ReactNode;
};

export function TeumsaeCollapsibleDetails({ children }: TeumsaeCollapsibleDetailsProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-6">
            <button
                type="button"
                onClick={() => setIsOpen(current => !current)}
                aria-expanded={isOpen}
                aria-controls="teumsae-implementation-details"
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-teal-900/70 bg-teal-950/25 px-5 py-4 text-left transition-colors hover:border-teal-700/80 hover:bg-teal-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
                <span>
                    <span className="block text-sm font-extrabold text-white">
                        {isOpen ? "상세 내용 접기" : "구현 상세 보기"}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-zinc-400">
                        일정 변경 검증 과정과 직접 수행한 역할을 확인할 수 있습니다.
                    </span>
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-teal-800/70 bg-zinc-950/50 text-teal-300">
                    <ChevronDown
                        size={17}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                </span>
            </button>

            {isOpen && (
                <div id="teumsae-implementation-details" className="mt-8 space-y-12">
                    {children}
                </div>
            )}
        </div>
    );
}
