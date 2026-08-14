import { SectionHeader } from "@/shared/ui/project-section-ui";
import { ArrowRight, CheckCircle2, Code2, LayoutTemplate, Lightbulb, RefreshCw, Waypoints } from "lucide-react";

const workflow = [
    {
        icon: Lightbulb,
        step: "01",
        title: "Problem Definition",
        description: "어떤 서비스를 만들고 싶은지와 사용자가 어떤 문제를 해결할 수 있어야 하는지부터 정리합니다.",
    },
    {
        icon: Waypoints,
        step: "02",
        title: "Architecture & Planning",
        description: "필요한 기능을 정리하고 데이터와 상태가 어디에서 생성되고 관리되어야 하는지 흐름을 먼저 설계합니다.",
    },
    {
        icon: LayoutTemplate,
        step: "03",
        title: "MVP Design",
        description: "화면의 방향과 필요한 사용자 경험을 먼저 정한 뒤 빠르게 MVP를 확인할 수 있도록 AI를 활용해 UI 디자인을 구체화합니다.",
    },
    {
        icon: Code2,
        step: "04",
        title: "Implementation",
        description: "설계한 데이터 흐름과 기능을 기준으로 직접 구현하고 필요한 코드 분석이나 반복 작업에서는 AI를 개발 보조 도구로 활용합니다.",
    },
    {
        icon: CheckCircle2,
        step: "05",
        title: "User Flow Check",
        description: "구현된 기능을 직접 사용해보면서 처음 의도했던 사용자 흐름대로 동작하는지 확인하고 불편하거나 어색한 부분을 찾습니다.",
    },
    {
        icon: RefreshCw,
        step: "06",
        title: "Improve",
        description: "실제 사용 과정에서 발견한 문제나 구조적으로 수정이 필요한 부분을 직접 변경하거나 AI와 다시 논의하며 개선합니다.",
    },
];

const architecturePoints = [
    {
        title: "Data Flow",
        description: "데이터가 어디에서 만들어지고 어떤 과정을 거쳐 화면까지 전달되는지 먼저 생각합니다.",
    },
    {
        title: "State Responsibility",
        description: "서버 데이터와 UI 상태의 역할을 구분하고 어떤 상태를 어디에서 관리할지 결정합니다.",
    },
    {
        title: "User Flow",
        description: "기능 단위 구현뿐 아니라 사용자가 실제로 기능을 사용하는 순서를 함께 고려합니다.",
    },
    {
        title: "Change & Improve",
        description: "처음 설계를 고정된 답으로 두기보다 구현 과정에서 문제가 보이면 구조를 다시 수정합니다.",
    },
];

export function DevelopmentWorkFlow() {
    return (
        <section id='development' className="scroll-mt-24">
            <SectionHeader
                number="01"
                title="Development Workflow"
                description="아이디어를 바로 구현하기보다 문제를 정의하고 데이터와 상태 흐름을 설계한 뒤 실제 사용자 흐름을 확인하며 구조를 개선합니다."
            />

            <div className="mt-5 space-y-8 sm:px-10">
                <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl text-zinc-100">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-purple-400">
                            How I Build
                        </p>

                        <h3 className="mt-3 text-xl font-extrabold text-white tracking-tight">
                            화면보다 먼저 서비스의 흐름을 생각합니다.
                        </h3>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300 font-medium">
                            만들고 싶은 서비스의 목적과 필요한 기능을 먼저 정리하고
                            데이터와 상태가 어떤 흐름으로 연결되어야 하는지 생각한 뒤
                            구현합니다. 구현 이후에는 실제 기능을 사용해보면서 불편한 부분이나
                            구조적으로 다시 손봐야 할 부분을 계속 수정합니다.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                        {workflow.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.step}
                                    className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-purple-500/5 backdrop-blur-md"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                                            <Icon
                                                size={18}
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <span className="text-xs font-black text-zinc-500">
                                            {item.step}
                                        </span>
                                    </div>

                                    <h4 className="mt-5 text-sm font-extrabold text-white group-hover:text-purple-400 transition-colors">
                                        {item.title}
                                    </h4>

                                    <p className="mt-2 text-xs leading-6 text-zinc-400 font-medium">
                                        {item.description}
                                    </p>

                                    {index < workflow.length - 1 && (
                                        <ArrowRight
                                            size={16}
                                            aria-hidden="true"
                                            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-zinc-700 xl:block"
                                        />
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl text-zinc-100">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-purple-400">
                            What I Consider
                        </p>

                        <h3 className="mt-3 text-xl font-extrabold text-white tracking-tight">
                            기능을 어디에 구현할지보다
                            <br />
                            데이터가 어떻게 움직일지를 먼저 봅니다.
                        </h3>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 font-medium">
                            프로젝트 규모가 커질수록 컴포넌트 하나의 구현보다 데이터와 상태가
                            어디에서 관리되고 어떤 기능과 연결되는지가 더 중요하다고
                            생각합니다. 구현하면서 처음 설계가 적절하지 않다고 판단되면
                            구조를 다시 변경하기도 합니다.
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            {architecturePoints.map(item => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 backdrop-blur-md transition-colors hover:border-zinc-700"
                                >
                                    <h4 className="text-sm font-extrabold text-white">
                                        {item.title}
                                    </h4>

                                    <p className="mt-2 text-xs leading-5 text-zinc-400 font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}