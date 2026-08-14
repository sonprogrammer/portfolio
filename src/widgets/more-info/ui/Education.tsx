import { SectionHeader } from "@/shared/ui/project-section-ui";
import { Code2, Database, GitBranch, GraduationCap, Server } from "lucide-react";

const bootcampItems = [
    {
        icon: Code2,
        title: "Frontend",
        description: "React와 TypeScript를 중심으로 컴포넌트 기반 UI 구현과 상태 관리 등 프론트엔드 웹 개발의 기본 구조를 학습했습니다.",
    },
    {
        icon: Server,
        title: "Web & Backend Fundamentals",
        description:
            "Node.js와 Express를 사용하며 HTTP 요청·응답, REST API, CRUD와 서버 애플리케이션의 기본 흐름을 학습했습니다.",
    },
    {
        icon: Database,
        title: "Database & Authentication",
        description:
            "MongoDB를 활용한 데이터 저장과 조회를 학습하고, 세션과 JWT 토큰 등 웹 인증 방식의 기본 개념을 익혔습니다.",
    },
    {
        icon: GitBranch,
        title: "Team Development",
        description: "Git 기반 협업과 데일리 스크럼, 백엔드 팀원과의 API 연동을 경험하며 실무형 팀 개발 프로세스를 익혔습니다.",
    },
];

export function Education() {
    return (
        <section id="education">
            <SectionHeader
                number="01"
                title="Education"
                description="전공 교육과 개발 부트캠프를 통해 소프트웨어와 웹 개발의 기반을 쌓았습니다."
            />

            <div className="mt-5 space-y-6 px-4 sm:px-10">
                {/* 대학교 카드 */}
                <article className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-inner">
                                <GraduationCap size={20} />
                            </div>

                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.14em] text-purple-400">
                                    University
                                </p>

                                <h3 className="mt-2 text-xl font-extrabold text-white tracking-tight">
                                    한서대학교
                                </h3>

                                <p className="mt-1 text-sm font-semibold text-zinc-400">
                                    항공소프트웨어공학과
                                </p>
                            </div>
                        </div>

                        <div className="sm:text-right">
                            <p className="font-extrabold text-white">
                                2024.02
                            </p>

                            <p className="mt-1 text-xs font-semibold text-zinc-500">
                                졸업
                            </p>
                        </div>
                    </div>
                </article>

                {/* 부트캠프 카드 */}
                <article className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-purple-400">
                                Bootcamp
                            </p>

                            <h3 className="mt-2 text-xl font-extrabold text-white tracking-tight">
                                엘리스 웹 개발자 트랙 6기
                            </h3>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300 font-medium">
                                프론트엔드부터 서버, 데이터베이스까지 웹 서비스의 전체 흐름을 학습하고
                                팀 프로젝트를 통해 실제 API 연동과 협업 과정을 경험했습니다.
                            </p>

                            <p className="mt-2 text-xs font-semibold text-zinc-500">
                                2023.08 – 2023.12 · 수료
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {bootcampItems.map((item, index) => {
                            const Icon = item.icon;
                            const num = index + 1;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5 backdrop-blur-md transition-colors hover:border-zinc-700"
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-purple-400 shadow-inner">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-black text-zinc-700">
                                                0{num}
                                            </span>
                                            <h4 className="font-extrabold text-white">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs leading-6 text-zinc-400 font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5 backdrop-blur-md">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-purple-400">
                            Team Project
                        </p>
                        <p className="mt-3 text-sm leading-7 text-zinc-300 font-medium">
                            데일리 스크럼과 백엔드 팀원과의 API 연동 협업을 경험했으며,
                            Issue 발행, 브랜치 전략과 Pull Request 기반 코드 리뷰 과정을
                            적용해 팀 프로젝트를 진행했습니다.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {[
                            "React", "TypeScript", "Node.js", "Express", "MongoDB",
                            "HTTP", "REST API", "CRUD", "Session", "JWT", "Git"
                        ].map(item => (
                            <span
                                key={item}
                                className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-md"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}