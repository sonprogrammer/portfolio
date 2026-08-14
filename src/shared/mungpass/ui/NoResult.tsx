import { Info } from "lucide-react";


export interface NoResultProps {
    title: string;
    description: string | React.ReactNode;
    icon?: React.ReactNode
}

export function NoResult({
    title,
    description,
    icon = <Info className="w-6 h-6 text-orange-300" />
}: NoResultProps) {
    return (
        <div className="mt-10 flex flex-col items-center justify-center p-10 bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-800 shadow-xl">
            <div className="w-12 h-12 bg-gray-800/80 border border-gray-700 rounded-2xl flex items-center justify-center shadow-md mb-3 text-orange-400">
                {icon}
            </div>
            <p className="text-sm font-extrabold text-gray-200 mb-1 tracking-tight">{title}</p>
            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                {description}
            </p>
        </div>
    )
}