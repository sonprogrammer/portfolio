'use client'

import { getSocket } from "@/shared/lib/socket"
import { createSocketConnectionLease } from "@/shared/lib/socketConnectionLease"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Socket } from 'socket.io-client'

type SocketConnectionStatus = 'idle' | 'connecting' | 'connected' | 'unavailable'

interface SocketContextValue {
    socket: Socket;
    realtimeUnavailable: boolean
    connectionStatus: SocketConnectionStatus
    acquireConnection: () => () => void
}

const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const socket = useMemo(() => getSocket(), [])
    const [connectionStatus, setConnectionStatus] = useState<SocketConnectionStatus>('idle')
    const [connectionLease] = useState(() =>
        createSocketConnectionLease({
            connect: () => {
                setConnectionStatus('connecting')
                socket.connect()
            },
            disconnect: () => {
                socket.disconnect()
                setConnectionStatus('idle')
            },
        }),
    )

    const acquireConnection = useCallback(
        () => connectionLease.acquire(),
        [connectionLease],
    )

    useEffect(() => {
        const handleConnect = () => {
            setConnectionStatus('connected')
        }
        const handleConnectError = () => {
            setConnectionStatus('unavailable')
        }
        const handleDisconnect = (reason: Socket.DisconnectReason) => {
            if (
                connectionLease.getConsumerCount() === 0 ||
                reason === 'io client disconnect'
            ) {
                setConnectionStatus('idle')
                return
            }

            setConnectionStatus('connecting')
        }
        socket.on('connect', handleConnect)
        socket.on('connect_error', handleConnectError)
        socket.on('disconnect', handleDisconnect)

        return () => {
            socket.off('connect', handleConnect)
            socket.off('connect_error', handleConnectError)
            socket.off('disconnect', handleDisconnect)
            socket.disconnect()
        }
    }, [connectionLease, socket])

    return (
        <SocketContext.Provider
            value={{
                socket,
                realtimeUnavailable: connectionStatus === 'unavailable',
                connectionStatus,
                acquireConnection,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    const socket = useContext(SocketContext)
    if (!socket) {
        throw new Error('provider내부에서 사용')
    }
    return socket
}

export function useSocketConnection(enabled = true) {
    const { acquireConnection } = useSocket()

    useEffect(() => {
        if (!enabled) {
            return
        }

        return acquireConnection()
    }, [acquireConnection, enabled])
}

