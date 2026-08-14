interface QrCheckInReq {
    trainerId: string;
    memberId: string;
}

interface QrCheckInRes{
    type: 'connected' | 'checked-in'
    message: string;
    ptCount: number
}

export async function QrCheckIn(payload: QrCheckInReq):Promise<QrCheckInRes>{
    const res = await fetch('/api/bnty/qr/check-in', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json() as QrCheckInRes | {message?: string}

    if(!res.ok){
        throw new Error(data.message ?? 'QR체크인 실패')
    }

    return data as QrCheckInRes
}