import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNotePayload } from './../api/createNote';
import { createNote } from "@/features/bnty/note/api/createNote";
import { noteQueryKeys } from '@/features/bnty/note/model/useGetNotes';
import { toast } from 'sonner';

export function useCreateNote(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:(payload: CreateNotePayload) => createNote(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: noteQueryKeys.all})
            toast.success('일지 기록 완료')   
        }
    })
}