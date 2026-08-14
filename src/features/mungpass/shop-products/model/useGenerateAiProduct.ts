'use client'


import { generateAiProduct } from "@/features/mungpass/shop-products/api/generateAiProduct"
import { useMutation } from "@tanstack/react-query"

export function useGenerateAiProduct(){
    return useMutation({
        mutationFn: generateAiProduct
    })
}