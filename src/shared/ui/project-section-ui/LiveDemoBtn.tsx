"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { useSocket } from "@/shared/providers/SocketProvider"
import { RealtimeUnavailableModal } from "@/shared/ui/unavailable-modal"


interface LiveDemoButtonProps {
    name: string
    deployUrl: string
}

const buttonClassName = "flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:-translate-y-0.5 hover:border-gray-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 md:flex-none"

export function LiveDemoButton({ name, deployUrl }: LiveDemoButtonProps) {
    const requiresRealtime = name === "BNTY" || name === "Virtual Coin(VC)" || name === "Virtual Coin"

    if (requiresRealtime) {
        return <RealtimeDemoBtn deployUrl={deployUrl} />
    }

    return (
        <a href={deployUrl} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
            <ExternalLink size={17} />
            Live Demo
        </a>
    )
}

function RealtimeDemoBtn({ deployUrl }: { deployUrl: string }) {
    const { realtimeUnavailable } = useSocket()
    const [isNoticeOpen, setIsNoticeOpen] = useState(false)

    return (
        <>
            {realtimeUnavailable ? (
                <button
                    type="button"
                    onClick={() => setIsNoticeOpen(true)}
                    className={buttonClassName}
                >
                    <ExternalLink size={17} />
                    Live Demo
                </button>
            ) : (
                <a
                    href={deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName}
                >
                    <ExternalLink size={17} />
                    Live Demo
                </a>
            )}
            {isNoticeOpen && (
                <RealtimeUnavailableModal
                    onClose={() => setIsNoticeOpen(false)}
                />
            )
            }
        </>
    )
}