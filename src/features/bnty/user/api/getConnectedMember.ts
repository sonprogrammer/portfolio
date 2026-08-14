import { ConnectedMember } from './../model/types';

interface GetConnectedMember{
    members: ConnectedMember[]
}

export async function getConnectedMember(trainerId: string): Promise<ConnectedMember[]>{
    const params = new URLSearchParams({trainerId})

    const res = await fetch(`/api/bnty/trainer/members?${params.toString()}`)

    const data = await res.json() as GetConnectedMember | {message?: string}

    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : '연결된 회원 조회 실패')
    }

    return (data as GetConnectedMember).members
    
}