import { SectionHeader } from "@/shared/ui/project-section-ui";
import { Languages, MessageCircleMore } from "lucide-react";

const learningItems = [
    {
        icon: MessageCircleMore,
        title: "English",
        goal: "TOEIC Speaking AL",
        description: "개발 외적인 커뮤니케이션 역량을 확장하기 위해 영어 학습을 이어가고 있습니다.",
    },
    {
        icon: Languages,
        title: "Japanese",
        goal: "JLPT N3",
        description: "일본어 독해와 커뮤니케이션 역량을 목표로 꾸준히 학습하고 있습니다.",
    },
];

export function SelfDevelopment() {
    return (
        <section>
            <SectionHeader
                number="03"
                title="Self Development"
                description="개발 역량 외에도 장기적인 성장을 위해 꾸준히 학습하고 있는 영역입니다."
            />

            <div className="mt-5 px-4 grid gap-5 md:grid-cols-2 sm:px-10">
                {learningItems.map(item => {
                    const Icon = item.icon;

                    return (
                        <article
                            key={item.title}
                            className="group relative flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-7 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                                    <Icon size={20} />
                                </div>
                            </div>

                            <h3 className="mt-6 text-lg font-extrabold text-white tracking-tight">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-purple-400">
                                Goal : {item.goal}
                            </p>

                            <p className="mt-3 text-sm leading-7 text-zinc-300 font-medium">
                                {item.description}
                            </p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}