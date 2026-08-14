import { getDemoSession } from '@/shared/lib/bnty/bnty-session/demo';
import { CreateBntyUserResponse, CreateBntyUserRequest } from './../model/userTypes';

export async function createUser(payload: Omit<CreateBntyUserRequest, 'demoSession'>):Promise<CreateBntyUserResponse> {
    const res = await fetch('/api/bnty/users', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            ...payload,
            demoSession: getDemoSession()
        })
    })

    const data = await res.json() as CreateBntyUserResponse | {message?: string}

    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : '유저 생성 실패')
    }

    return data as CreateBntyUserResponse
    
}
