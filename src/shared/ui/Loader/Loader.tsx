'use client'

import { Loader2 } from "lucide-react";

interface LoaderProps {
    text?: string;
    color?: string
}

export function Loader({ text ='사용자 정보를 확인하는 중입니다.', color }: LoaderProps) {
    return (
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-3">
            <Loader2
                className={`h-6 w-6 animate-spin ${color}`}
            />
            <p className="text-sm text-white animate-pulse ">
                {text}
            </p>
        </div>
    )
}

