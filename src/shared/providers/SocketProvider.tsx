'use client'

import { getSocket } from "@/shared/lib/socket"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Socket } from 'socket.io-client'

interface SocketContextValue {
    socket: Socket;
    realtimeUnavailable: boolean
}

const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const socket = useMemo(() => getSocket(), [])
    const [realtimeUnavailable, setRealtimeUnavailable] = useState(false)

    useEffect(() => {
        const handleConnect = () => {
            setRealtimeUnavailable(false)
        }
        const handleConnectError = () => {
            setRealtimeUnavailable(true)
        }
        const handleDisconnect = () => {
            setRealtimeUnavailable(true)
        }
        socket.on('connect', handleConnect)
        socket.on('connect_error', handleConnectError)
        socket.on('disconnect', handleDisconnect)

        socket.connect()

        return () => {
            socket.off('connect', handleConnect)
            socket.off('connect_error', handleConnectError)
            socket.off('disconnect', handleDisconnect)
            socket.disconnect()
        }
    }, [socket])

    return (
        <SocketContext.Provider value={{socket, realtimeUnavailable}}>
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

