'use client'

import { ReactNode, useState } from 'react'

import { useSocket, useSocketConnection } from '@/shared/providers/SocketProvider'
import { FunctionReveal } from '@/shared/ui/Function-reveal'
import { RealtimeUnavailableModal } from '@/shared/ui/unavailable-modal'
import { ModalPortal } from '@/shared/ui/modal'


interface VcFunctionRevealProps {
    children: ReactNode
}

export function VcFunctionReveal({children}: VcFunctionRevealProps) {
    const { realtimeUnavailable } = useSocket()

    const [unavailableDismissed, setUnavailableDismissed] = useState(false)
    const [realtimeActive, setRealtimeActive] = useState(false)

    useSocketConnection(realtimeActive)

    const showUnavailableModal =
        realtimeActive && realtimeUnavailable && !unavailableDismissed

    const handleOpenChange = (isOpen: boolean) => {
        setRealtimeActive(isOpen)
        setUnavailableDismissed(false)
    }

    return (
        <>
            <FunctionReveal
                title="Virtual Coin 기능 체험"
                description="실시간 코인 시세를 기반으로 매수·매도와 포트폴리오 변화를 직접 체험해보세요."
                theme="red"
                coldStartNotice
                onOpenChange={handleOpenChange}
            >
                {children}
            </FunctionReveal>

            {showUnavailableModal && (
                <ModalPortal isOpen={showUnavailableModal}>
                    <RealtimeUnavailableModal
                        onClose={() => setUnavailableDismissed(true)}
                    />
                </ModalPortal>
            )}
        </>
    )
}
