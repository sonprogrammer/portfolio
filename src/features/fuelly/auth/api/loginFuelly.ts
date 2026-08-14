import { GetFuellyUserResponse, LoginFuellyUserPayload } from './../../../../entities/fuelly/user/model/types';

export async function loginFuelly(payload: LoginFuellyUserPayload): Promise<GetFuellyUserResponse>{
    const res = await fetch('/api/fuelly/user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ??'로그인 시패')
    }

    return data
}