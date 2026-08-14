'use client'

import { autoGenerateAiShop } from "@/features/mungpass/shop/api/autoGenerateAiShop"
import { useMutation } from "@tanstack/react-query"

export function useGenerateAiShop(){
    return useMutation({
        mutationFn: autoGenerateAiShop
    })
}