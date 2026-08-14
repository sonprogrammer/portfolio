'use client'

import { getSocket } from "@/shared/lib/socket"
import { createContext, useContext, useEffect, useMemo } from "react"
import type { Socket} from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({children}: {children: React.ReactNode}){
    const socket = useMemo(() => getSocket(),[])

    useEffect(() =>{
        socket.connect()

        return () => {
            socket.disconnect()
        }
    },[socket])

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    const socket = useContext(SocketContext)
    if(!socket){
        throw new Error('provider내부에서 사용')
    }
    return socket
}

