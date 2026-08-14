import { SectionHeader } from "@/shared/ui/project-section-ui";
import { Braces, CheckCircle2, Network, Workflow } from "lucide-react";

const learningItems = [
    {
        icon: Network,
        title: "서비스 구조를 추측하는 습관",
        description: "웹이나 앱을 사용하다 궁금한 기능이 생기면 화면 뒤에서 어떤 API와 데이터 흐름으로 동작할지 먼저 예상해봅니다. 이후 실제 사례나 기술 자료를 찾아보며 제가 생각한 구조와 비교합니다.",
        points: [
            "기능을 보며 클라이언트와 서버의 역할 추측",
            "데이터가 어디에서 생성되고 전달되는지 예상",
            "AI 기능이라면 로컬, 클라우드 처리 방식과 API 구조 등을 고민",
            "궁금한 부분은 검색을 통해 실제 구현 사례와 비교",
        ],
    },
    {
        icon: Braces,
        title: "Frontend Engineering",
        description: "새로운 라이브러리를 많이 아는 것보다 기능이 어떤 구조와 데이터 흐름 위에서 동작하는지 이해하는 데 집중하고 있습니다.",
        points: [
            "서버 상태와 클라이언트 상태의 책임 구분",
            "기능 확장을 고려한 컴포넌트와 모듈 구조",
            "실시간 데이터와 API 요청 흐름 이해",
            "렌더링과 네트워크 성능 개선 방법 학습",
        ],
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "n8n 강의를 통해 여러 서비스와 데이터를 연결하고 Trigger부터 다음 작업까지 이어지는 워크플로 기반 자동화의 기본 흐름을 학습했습니다.",
        points: [
            "Trigger를 시작으로 이어지는 Workflow 구조 이해",
            "서비스와 API를 연결하는 자동화 흐름 학습",
            "조건에 따라 작업이 이어지는 처리 방식 이해",
            "반복 작업을 워크플로 관점에서 바라보는 경험",
        ],
    },
];

export function Learning() {
    return (
        <section id='learning' className="scroll-mt-24">
            <SectionHeader
                number="03"
                title="Learning System"
                description="하나의 기술에만 집중하기보다 개발 역량과 도구 활용 능력을 함께 확장하고 있습니다."
            />

            <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-10">
                {learningItems.map(item => {
                    const Icon = item.icon;

                    return (
                        <article
                            key={item.title}
                            className="flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl text-zinc-100 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                                    <Icon size={20} />
                                </div>

                                <h3 className="font-extrabold text-white tracking-tight text-base">
                                    {item.title}
                                </h3>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-zinc-300 font-medium">
                                {item.description}
                            </p>

                            <div className="mt-6 flex-1 space-y-2.5 border-t border-zinc-800/80 pt-5">
                                {item.points.map((point, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-2.5"
                                    >
                                        <CheckCircle2
                                            size={14}
                                            className="mt-1 shrink-0 text-purple-400"
                                            aria-hidden="true"
                                        />
                                        <span className="text-xs text-zinc-400 font-medium leading-relaxed">
                                            {point}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}