import { BntyUser } from "@/entities/bnty/user/model/userTypes";
import { QrCheckIn } from "@/features/bnty/qr/api";
import { bntyUserQueryKeys } from "@/features/bnty/user/model/useCreateUser";
import { connectedMemberQueryKeys } from "@/features/bnty/user/model/useGetConnectedMembers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"


export function usePostQrCheckIn() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: QrCheckIn,
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries({queryKey:connectedMemberQueryKeys.trainer(variables.trainerId)})
            queryClient.setQueryData<BntyUser | null>(
                bntyUserQueryKeys.role('member'),
                (prevUserData) => {
                    if(!prevUserData){
                        return prevUserData
                    }

                    return{
                        ...prevUserData,
                        ptCount: data.ptCount
                    }
                }
            )

            if (data.type === 'connected') {
                toast.success(data.message || '트레이너와 성공적으로 연결되었습니다!')
            } else if (data.type === 'checked-in') {
                toast.success(data.message || '출석 처리되었습니다.')
            }
        },
        onError: (error) => {
            toast.error(error?.message || 'QR 체크인 처리 중 문제가 발생했습니다.')
        }
    })
}
