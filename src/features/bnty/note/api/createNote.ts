import type { NoteItem } from "@/entities/bnty/note/model/noteTypes";

export interface CreateNotePayload{
    trainerId: string;
    memberId: string;
    chatRoomId: string;
    title: string;
    content: string;
    workoutDate: string
}

interface CreateNoteRes{
    message: string;
    note: NoteItem
}

export async function createNote(payload: CreateNotePayload):Promise<NoteItem>{
    const res = await fetch('/api/bnty/notes',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json as CreateNoteRes | {message?: string}

    if(!res.ok){
        throw new Error(data.message ?? '일지 작성 실패')
    }
    return (data as CreateNoteRes).note
}