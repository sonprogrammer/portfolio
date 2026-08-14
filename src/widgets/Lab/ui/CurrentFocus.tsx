import { SectionHeader } from "@/shared/ui/project-section-ui";

const focusItems = [
    {
        title: "AI-assisted Development",
        description: "Codex와 tmux를 활용하며 에이전트 역할 분리, 세션과 컨텍스트 관리 등 더 효율적인 AI 개발 방식을 실험하고 있습니다.",
        status: "Active",
    },
    {
        title: "Frontend Engineering",
        description: "기능 구현을 넘어 아키텍처, 데이터 흐름, 상태 관리와 성능 개선 역량을 계속 강화하고 있습니다.",
        status: "Active",
    }
];

export function CurrentFocus() {
    return (
        <section id='focus' className="scroll-mt-24">
            <SectionHeader
                number="05"
                title="Current Focus"
                description="현재 집중적으로 학습하고 개선하고 있는 영역입니다."
            />

            <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl sm:mx-10">
                {focusItems.map((item, index) => (
                    <div
                        key={item.title}
                        className={`grid gap-4 bg-transparent px-6 py-6 md:grid-cols-[0.3fr_0.55fr_0.15fr] md:items-center transition-colors hover:bg-zinc-800/30 ${index !== focusItems.length - 1 ? "border-b border-zinc-800/80" : ""
                            }`}
                    >
                        <h3 className="font-extrabold text-white tracking-tight text-base">
                            {item.title}
                        </h3>

                        <p className="text-sm leading-6 text-zinc-300 font-medium">
                            {item.description}
                        </p>

                        <div className="md:text-right">
                            <span className="inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-extrabold text-purple-400 shadow-sm">
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}