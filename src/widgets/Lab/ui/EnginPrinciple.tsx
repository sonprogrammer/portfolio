import { SectionHeader } from "@/shared/ui/project-section-ui";
import { Bot, Gauge, Layers3, Wrench } from "lucide-react";

const principles = [
    {
        number: "01",
        icon: Layers3,
        title: "Structure before Implementation",
        description: "먼저 어떤 기능이 필요한지 정의하고 그 기능에 필요한 데이터를 생각합니다. 이후 데이터가 어디에서 생성되고 어떻게 전달되는지 흐름을 설계한 뒤 상태와 데이터를 어디에서 관리할지 결정합니다.",
    },
    {
        number: "02",
        icon: Bot,
        title: "AI as a Tool, not Replacement",
        description: "AI에게 개발을 모두 맡기기보다 제가 정한 아이디어와 구현 방향을 문서로 구조화하고 코드 분석과 반복 작업의 생산성을 높이는 도구로 활용하고 구현 방향과 필요한 수정은 직접 판단하려고 합니다.",
    },
    {
        number: "03",
        icon: Wrench,
        title: "AX & DX",
        description: "실제 생활과 업무에서 경험한 반복적이고 비효율적인 흐름을 발견하면 먼저 디지털화할 방법을 고민합니다. 이후 필요한 영역에서는 AI를 활용해 기존 경험과 생산성을 한 단계 더 개선할 수 있는 방법을 찾습니다.",
    },
    {
        number: "04",
        icon: Gauge,
        title: "Measure and Improve",
        description: "직접 서비스를 사용하며 느린 화면이나 불편한 흐름을 먼저 발견하고 개선합니다. 이후 Lighthouse와 로딩 시간, API 호출 횟수처럼 확인 가능한 지표를 통해 개선 결과도 함께 확인하려고 합니다.",

    },
];

export function EnginPrinciples() {
    return (
        <section id='principles' className="scroll-mt-24">
            <SectionHeader
                number="04"
                title="Engineering Principles"
                description="프로젝트와 학습 과정에서 점점 구체화하고 있는 개발 원칙입니다."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 sm:px-10">
                {principles.map(principle => {
                    const Icon = principle.icon;

                    return (
                        <article
                            key={principle.number}
                            className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-md transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 shadow-xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <span className="text-sm font-black text-zinc-600 group-hover:text-purple-400/50 transition-colors">
                                        {principle.number}
                                    </span>
                                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                                        {principle.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="mt-5 text-sm leading-7 text-zinc-300 font-medium">
                                {principle.description}
                            </p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}