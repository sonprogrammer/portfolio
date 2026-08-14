interface DeleteNotePayload {
    noteId: string;
    trainerId: string;
}

interface DeleteNoteRes {
    message: string;
    noteId: string
}

export async function deleteNote({ noteId, trainerId }: DeleteNotePayload): Promise<DeleteNoteRes> {
    const searchParams = new URLSearchParams({ trainerId })

    const res = await fetch(`/api/bnty/notes/${noteId}?${searchParams.toString()}`,
        {
            method: 'DELETE'
        })

    const data = await res.json() as DeleteNoteRes | {message: string}

    if(!res.ok){
        throw new Error(data.message ?? '운동일지 삭제 실패 ')
    }

    return data as DeleteNoteRes
}