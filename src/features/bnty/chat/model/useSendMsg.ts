

import {  useSocket } from '@/shared/providers/SocketProvider';
import { SendMessagePayload, SendMessageResult } from '@/entities/bnty/chat/model/chatSocketTypes';
import { useState } from 'react';


export function useSendMsg() {
    const [isPending, setIsPending] = useState(false)

    const {socket} = useSocket()

    const sendMsg = (payload: SendMessagePayload) => {
        return new Promise<void>((resolve,rej) => {
            setIsPending(true)

            socket.emit('send-msg',payload,(res:SendMessageResult) => {
                setIsPending(false)
                if(!res.success){
                    rej(new Error(res.error))
                    return 
                }
                resolve()
            })
        })
    }

    return { sendMsg, isPending}
    
}