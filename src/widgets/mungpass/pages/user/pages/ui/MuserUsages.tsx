'use client'


import { UsageCard } from "@/entities/mungpass/usage/ui";
import { useGetMyPetUsage } from "@/features/mungpass/check-in/model";

import { format, parseISO } from "date-fns";
import { PawPrint } from "lucide-react";


export function MuserUsages() {
    const { data: historyList = [], isPending } = useGetMyPetUsage({ statuses: ['completed'] }) //*이용완료된 기록만 보임



    return (
        <main className="h-full flex flex-col relative bg-gray-950 text-gray-100">
            <header className="relative p-6 w-full  mx-auto shrink-0 flex items-center mt-2">
                <div className="flex flex-col w-full items-center">
                    <h1 className="text-2xl font-extrabold text-gray-100 tracking-tight">
                        멍패스 기록
                    </h1>
                </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto w-full mx-auto no-scrollbar">
                <div className="p-2 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5">
                    {isPending ? (
                        <div className="p-6 space-y-4">
                            <div className="animate-pulse bg-gray-900/60 border border-gray-800 rounded-3xl h-22 w-full backdrop-blur-md" />
                            <div className="animate-pulse bg-gray-900/60 border border-gray-800 rounded-3xl h-22 w-full backdrop-blur-md" />
                        </div>
                    ) : historyList.length > 0 ? (
                        historyList.map((item) => (
                            <UsageCard
                                key={item.id}
                                icon={<PawPrint className="w-5 h-5 text-orange-400" />}
                                title={item.shop.name}
                                description={item.product.name}
                                subText={format(parseISO(item.created_at), 'yy-MM-dd')}
                            />
                        ))) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-800 p-8 shadow-xl">
                            <div className="w-14 h-14 bg-gray-800/80 border border-gray-700 rounded-2xl flex items-center justify-center shadow-md mb-3 text-orange-400">
                                <PawPrint className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-extrabold text-gray-200 mb-1 tracking-tight">아직 이용 기록이 없어요</p>
                            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                                멍패스 샵에서 체크인하고 기록을 남겨보세요.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>

    );
}
