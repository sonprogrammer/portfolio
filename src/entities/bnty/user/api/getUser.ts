import { BntyUser } from './../model/userTypes';
import { getDemoSession } from "@/shared/lib/bnty/bnty-session/demo";


type GetBntyUserResponse = {
    user: BntyUser | null;
}


export async function getBntyUser(role: 'member' | 'trainer'): Promise<BntyUser | null> {
    const demoSession = getDemoSession()

    const params = new URLSearchParams({
        demoSession,
        role
    })

    const res = await fetch(`/api/bnty/userinfo?${params.toString()}`)

    const data = await res.json() as BntyUser | { message?: string }

    if (!res.ok) {
        throw new Error('message' in data && data.message ? data.message : '사용자 조회 실패')
    }
    

    return (data as GetBntyUserResponse).user

}

