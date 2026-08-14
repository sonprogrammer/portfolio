import { SectionHeader } from "@/shared/ui/project-section-ui";
import { Bot, CheckCircle2, Network, Terminal } from "lucide-react";



const aiUsage = [
    "프로젝트 아이디어와 요구사항 구체화",
    "빠른 MVP 확인을 위한 UI 디자인 보조",
    "코드 분석 및 반복 구현 작업 보조",
    "문제가 발생했을 때 원인과 해결 방향 논의",
    "필요한 경우 새로운 구현 방법과 선택지 탐색",
];

const agentWorkflow = [
    {
        icon: Terminal,
        title: "Codex + tmux",
        description:
            "tmux 환경에서 Codex를 사용하며 여러 작업을 한 화면에서 확인하고 있습니다.",
    },
    {
        icon: Network,
        title: "Role-based Agents",
        description:
            "작업에 따라 에이전트의 역할을 나누고 필요한 작업을 각각 전달하는 방식을 실험하고 있습니다.",
    },
    {
        icon: Bot,
        title: "Context Management",
        description:
            "세션과 컨텍스트를 어떻게 나눌지 고민하며 불필요한 토큰 사용을 줄이는 방법을 학습하고 있습니다.",
    },
];

export function AiAssit() {
    return (
       <section
            id="ai-development"
            className="scroll-mt-24"
        >
            <SectionHeader
                number="02"
                title="AI-assisted Development"
                description="AI에게 개발을 맡기기보다 직접 정한 방향과 설계를 기준으로 개발 과정의 생산성을 높이는 도구로 활용하고 있습니다."
            />

            <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 sm:px-10">

                <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 text-zinc-100 shadow-xl backdrop-blur-md sm:p-8 transition-all duration-300 hover:border-zinc-700">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                        <Bot
                            size={20}
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-purple-400">
                        AI as a Tool
                    </p>

                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                        방향은 직접 정하고
                        <br />
                        AI로 속도를 높입니다.
                    </h3>

                    <p className="mt-4 text-sm font-medium leading-7 text-zinc-300">
                        어떤 서비스를 만들지와 화면이 어떤 방향이어야 하는지는 먼저 직접
                        정합니다. 이후 프로젝트를 더 구체화하거나 빠른 MVP 화면을 만들고
                        코드 분석과 반복 작업의 시간을 줄이는 데 AI를 활용하고 있습니다.
                    </p>

                    <div className="mt-7 space-y-3">
                        {aiUsage.map(item => (
                            <div
                                key={item}
                                className="flex items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 px-4 py-3.5 backdrop-blur-md transition-colors hover:border-zinc-700"
                            >
                                <CheckCircle2
                                    size={16}
                                    className="shrink-0 text-purple-400"
                                    aria-hidden="true"
                                />

                                <span className="text-sm font-medium text-zinc-200">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 text-zinc-100 shadow-xl backdrop-blur-md sm:p-8 transition-all duration-300 hover:border-zinc-700">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                        <Bot
                            size={20}
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-purple-400">
                        Agent Workflow Experiment
                    </p>

                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                        AI를 사용하는 방법 자체도
                        <br />
                        하나의 개발 역량으로 학습하고 있습니다.
                    </h3>

                    <p className="mt-4 text-sm font-medium leading-7 text-zinc-300">
                        현재 사이드 프로젝트에서 직접 코드를 일부 수정하며 Codex와 역할별
                        에이전트 활용 방식을 실험하고 있습니다. 작업을 어디까지 AI에게 맡길지,
                        세션과 컨텍스트를 어떻게 나눌지, 토큰 낭비를 어떻게 줄일지를 고민하며
                        더 효율적인 AI 개발 방식을 학습하고 있습니다.
                    </p>

                    <div className="mt-7 space-y-3">
                        {agentWorkflow.map(item => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-4.5 backdrop-blur-md transition-colors hover:border-zinc-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-purple-400 shadow-inner">
                                            <Icon
                                                size={18}
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <h4 className="text-sm font-extrabold text-white">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <p className="mt-3 text-xs font-medium leading-6 text-zinc-300">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 sm:px-10">
                <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-purple-400">
                        My Perspective on AI
                    </p>

                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                        AI를 대체재보다
                        <br />
                        개발 역량을 확장하는 도구로 봅니다.
                    </h3>

                    <div className="mt-5 max-w-5xl space-y-4">
                        <p className="text-sm font-medium leading-7 text-zinc-300">
                            강의를 통해 여러 기업이 AI를 실제 개발 프로세스와 생산성 향상에
                            활용하는 사례를 접하면서 앞으로는 AI를 단순히 사용할 줄 아는 것보다
                            개발 과정에 어떻게 적용하고 통제할 수 있는지가 중요해질 것이라고
                            생각했습니다.
                        </p>

                        <p className="text-sm font-medium leading-7 text-zinc-300">
                            AI로 인해 개발자의 역량이 약해질 것을 걱정하기보다 오히려 기존의
                            개발 역량을 확장할 수 있는 도구라고 생각합니다. 변화하는 환경에서
                            기존 방식만 고수하기보다 새로운 도구를 빠르게 학습하고 제가 가진
                            설계와 구현 역량에 결합해 더 나은 결과를 만드는 개발자가 되는 것을
                            목표로 하고 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}