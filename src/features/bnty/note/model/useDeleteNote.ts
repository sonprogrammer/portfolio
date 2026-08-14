import { deleteNote } from "@/features/bnty/note/api/deleteNote";
import { noteQueryKeys } from "@/features/bnty/note/model/useGetNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteNote(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: noteQueryKeys.all})
        }
    })
}