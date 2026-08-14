import { updateNote } from "@/features/bnty/note/api/updateNote";
import { noteQueryKeys } from "@/features/bnty/note/model/useGetNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNote(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: noteQueryKeys.all})
        }
    })
}