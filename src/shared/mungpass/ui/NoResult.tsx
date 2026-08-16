import { Info } from "lucide-react";


export interface NoResultProps {
    title: string;
    description: string | React.ReactNode;
    icon?: React.ReactNode
}

export function NoResult({
    title,
    description,
    icon = <Info className="h-5 w-5 text-orange-300 sm:h-6 sm:w-6" />
}: NoResultProps) {
    return (
        <div className="mt-6 flex w-full min-w-0 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-gray-800 bg-gray-900/40 p-5 shadow-xl backdrop-blur-md sm:mt-8 sm:rounded-4xl sm:p-8 md:mt-10 md:rounded-[2.5rem] md:p-10">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 bg-gray-800/80 text-orange-400 shadow-md sm:h-12 sm:w-12 sm:rounded-2xl">
                {icon}
            </div>

            <p className="mb-1 text-center text-xs font-extrabold tracking-tight text-gray-200 sm:text-sm">
                {title}
            </p>

            <p className="text-center text-[10px] leading-relaxed text-gray-400 sm:text-[11px]">
                {description}
            </p>
        </div>
    )
}