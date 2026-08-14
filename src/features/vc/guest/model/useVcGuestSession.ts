import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { VcGuestSessionRes } from "@/entities/vc/guest/model";
import { createVcGuestSession, deleteVcGuestSession, getVcGuestSession } from "@/features/vc/guest/api/guestSessionApi";
import { vcGuestQueryKeys } from "@/features/vc/guest/model/queryKeys";

export function useVcGuestSession(){
    return useQuery({
        queryKey: vcGuestQueryKeys.session(),
        queryFn: getVcGuestSession,
        staleTime: Infinity,
        retry: false
    })
}

export function useVcGuestLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createVcGuestSession,
        onSuccess: (data) => {
            queryClient.setQueryData<VcGuestSessionRes>(
                vcGuestQueryKeys.session(),
                data
            )
        }
    })
}

export function useVcGuestLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVcGuestSession,

    onSuccess: (data) => {
      queryClient.setQueryData<VcGuestSessionRes>(
        vcGuestQueryKeys.session(),
        data,
      );

      queryClient.removeQueries({
        queryKey: ['vc', 'assets'],
      });

      queryClient.removeQueries({
        queryKey: ['vc', 'orders'],
      });
    },
  });
}