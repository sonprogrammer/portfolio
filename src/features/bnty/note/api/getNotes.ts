import type { NoteItem } from "@/entities/bnty/note/model/noteTypes";

interface GetNotesParams {
    userId: string;
    role: 'trainer' | 'member'
    memberId?: string
}

interface GetNotesRes{
    notes: NoteItem[]
}

export async function getNotes({userId, role, memberId}: GetNotesParams): Promise<NoteItem[]>{
    const searchParams = new URLSearchParams({userId, role})

    if(memberId){
        searchParams.set('memberId', memberId)
    }

    const res = await fetch(`/api/bnty/notes?${searchParams.toString()}`)

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? '노트 조회 실패')
    }
    return (data as GetNotesRes).notes
}