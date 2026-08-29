'use client'

import { ReactNode, useState } from 'react'

import { useSocket } from '@/shared/providers/SocketProvider'
import { FunctionReveal } from '@/shared/ui/Function-reveal'
import { RealtimeUnavailableModal } from '@/shared/ui/unavailable-modal'
import { ModalPortal } from '@/shared/ui/modal'


interface VcFunctionRevealProps {
    children: ReactNode
}

export function VcFunctionReveal({
    children
}: VcFunctionRevealProps) {
    const { realtimeUnavailable } = useSocket()

    const [openModal, setopenModal] = useState(false)

    const handleBeforeOpen = () => {
        if (realtimeUnavailable) {
            setopenModal(true)

            return false
        }

        return true
    }

    return (
        <>
            <FunctionReveal
                title="Virtual Coin 기능 체험"
                description="실시간 코인 시세를 기반으로 매수·매도와 포트폴리오 변화를 직접 체험해보세요."
                theme="red"
                coldStartNotice
                onBeforeOpen={handleBeforeOpen}
            >
                {children}
            </FunctionReveal>

            {openModal && (
                <ModalPortal isOpen={openModal}>
                    <RealtimeUnavailableModal
                        onClose={() => setopenModal(false)}
                    />
                </ModalPortal>
            )}
        </>
    )
}