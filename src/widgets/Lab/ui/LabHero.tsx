
import { ArrowDownRight, BrainCircuit, ChartNoAxesCombined, Eye, Layers3, Lightbulb, RefreshCw } from "lucide-react";


const learning = [
  {
    number: "01",
    icon: Eye,
    title: "Observe",
    description: "실제 서비스와 일상 속 불편에서 궁금한 지점을 발견합니다.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Think",
    description: "기능 뒤의 데이터와 상태 흐름이 어떻게 동작할지 먼저 생각합니다.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Build",
    description: "직접 설계하고 구현하면서 생각했던 구조를 실제 코드로 확인합니다.",
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Improve",
    description: "직접 사용하며 불편하거나 느린 부분을 발견하고 다시 개선합니다.",
  },
];

const sections = [
  {
    number: "01",
    title: "Development Workflow",
    href: "#development",
  },
  {
    number: "02",
    title: "AI-assisted Development",
    href: "#ai-development",
  },
  {
    number: "03",
    title: "Learning System",
    href: "#learning",
  },
  {
    number: "04",
    title: "Engineering Principles",
    href: "#principles",
  },
  {
    number: "05",
    title: "Current Focus",
    href: "#focus",
  },
];


export function LabHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-72px)] items-start px-0 sm:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-20">

        <div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            How I Learn,
            <br />

            <span className="text-zinc-400">
              Build and Improve.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg font-medium">
            새로운 기술을 배우는 데서 끝내지 않고,
            어떻게 개발 과정에 적용하고 더 나은 구조와 생산성으로
            연결할 수 있을지 고민하고 있습니다.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#principles"
              className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4.5 py-2.5 text-sm font-extrabold text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-purple-500/50 hover:text-white backdrop-blur-md shadow-md"
            >
              <Layers3 size={16} className="text-purple-400" />
              Architecture
            </a>

            <a
              href="#development"
              className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4.5 py-2.5 text-sm font-extrabold text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-purple-500/50 hover:text-white backdrop-blur-md shadow-md"
            >
              <BrainCircuit size={16} className="text-purple-400" />
              AI-assisted Development
            </a>

            <a
              href="#principles"
              className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4.5 py-2.5 text-sm font-extrabold text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-purple-500/50 hover:text-white backdrop-blur-md shadow-md"
            >
              <ChartNoAxesCombined size={16} className="text-purple-400" />
              Performance
            </a>
          </div>
        </div>

        <div>
          <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-purple-400">
                  My Learning
                </p>

                <h2 className="mt-2 text-lg font-extrabold text-white tracking-tight">
                  궁금함을 구현과 개선으로 연결합니다.
                </h2>
              </div>

            </div>

            <div className="mt-6">
              {learning.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {index < learning.length - 1 && (
                      <div className="absolute left-5 top-10 h-[calc(100%-24px)] w-px bg-zinc-800" />
                    )}

                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                      <Icon size={17} />
                    </div>

                    <div className="pt-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-purple-400/80">
                          {item.number}
                        </span>

                        <h3 className="text-sm font-extrabold text-white">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-1.5 text-xs leading-5 text-zinc-300 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 border-t border-zinc-800/80 pt-6">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-purple-400">
                Explore Lab
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {sections.map(item => (
                  <a
                    key={item.number}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/40 px-4 py-3 transition-all duration-200 hover:border-purple-500/50 hover:bg-zinc-900/80 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-purple-400/80">
                        {item.number}
                      </span>

                      <span className="text-xs font-bold text-zinc-300 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>

                    <ArrowDownRight
                      size={14}
                      className="text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-purple-400"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}