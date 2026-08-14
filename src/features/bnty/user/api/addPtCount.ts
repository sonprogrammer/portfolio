interface AddMemberPtCoundReq{
    memberId: string;
    trainerId: string;
    count: number
}

interface AddmemberPtCountRes{
    member: {
        id: string;
        name: string;
        ptCount: number
    }
}

export async function addPtCount(payload: AddMemberPtCoundReq): Promise<AddmemberPtCountRes>{
    const res = await fetch('/api/bnty/trainer/members/pt-count',
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )

    const data = await res.json() as AddmemberPtCountRes | { message?: string}

    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : 'Pt 횟수 등록 실패')
    }
    return data as AddmemberPtCountRes
}