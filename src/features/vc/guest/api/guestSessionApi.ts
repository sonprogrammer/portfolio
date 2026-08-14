import type { VcGuestSessionRes } from "@/entities/vc/guest/model";

const GUEST_SESSION_URL = '/api/vc/guest-session'

async function parseRes(res: Response): Promise<VcGuestSessionRes>{
    if(!res.ok){
        throw new Error('게스트 생성 실패')
    }
    return res.json()
}

export async function getVcGuestSession(){
    const res = await fetch(GUEST_SESSION_URL, {
        method: 'POST',
        credentials: 'include'
    })
    return parseRes(res)
}

export async function createVcGuestSession(){
    const res = await fetch(GUEST_SESSION_URL,{
        method: "POST",
        credentials: 'include'
    })

    return parseRes(res)
}

export async function deleteVcGuestSession() {
  const response = await fetch(
    GUEST_SESSION_URL,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  return parseRes(response)
}