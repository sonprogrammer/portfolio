import type { NoteItem } from "@/entities/bnty/note/model/noteTypes";

export interface UpdateNotePayload{
    noteId: string;
    trainerId: string;
    title: string;
    content: string;
    workoutDate: string;
}

interface UpdateNoteRes{
    note: NoteItem
}


export const updateNote = async({noteId, trainerId, title, content, workoutDate}: UpdateNotePayload):Promise<NoteItem> => {
    const res = await fetch(`/api/bnty/notes/${noteId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            trainerId,title, content, workoutDate
        })
    })

    const data = (await res.json()) as UpdateNoteRes | {message?: string}

    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : '운동 일지 수정 실패')
    }

    return (data as UpdateNoteRes).note
    
}