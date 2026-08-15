import { SectionHeader } from "@/shared/ui/project-section-ui";
import {
    Award,
    BadgeCheck,
} from "lucide-react";

const certificates = [
    {
        icon: BadgeCheck,
        title: "정보처리기사",
        acquiredAt: '2024.09',
        category: "한국산업인력공단",
    },
    {
        icon: Award,
        title: "GTQ 1급",
        acquiredAt: '2021.10',
        category: "한국생산성본부",
    },
];

export function Certificates() {
    return (
        <section>
            <SectionHeader
                number="02"
                title="Certificates"
                description="개발과 디지털 활용 역량을 확장하며 취득한 자격입니다."
            />

            <div className="mt-5 px-1 grid gap-4 sm:grid-cols-2 sm:px-10">
                {certificates.map(item => {
                    const Icon = item.icon

                    return (
                        <article
                            key={item.title}
                            className="group relative flex items-center gap-5 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
                        >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                                <Icon size={20} />
                            </div>

                            <div>
                                <h3 className="flex items-center gap-2">
                                    <span className="font-extrabold text-white tracking-tight">
                                        {item.title}
                                    </span>
                                    <span className="text-zinc-600">|</span>
                                    <span className="text-xs font-bold text-purple-400">
                                        {item.acquiredAt}
                                    </span>
                                </h3>

                                <p className="mt-1 text-xs font-semibold text-zinc-400">
                                    {item.category}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}