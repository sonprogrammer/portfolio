import {
    ArrowRight,
    Bot,
    CheckCircle2,
    Database,
    ExternalLink,
    GitBranch,
    ShieldCheck,
    User,
    UserCheck,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { TeumsaeCollapsibleDetails } from "./TeumsaeCollapsibleDetails";
import { TeumsaeImageGallery } from "./TeumsaeImageGallery";

const changeFlow = [
    {
        icon: User,
        step: "01",
        title: "사용자 요청",
        description: "사용자가 대화로 일정 등록, 수정 또는 삭제를 요청합니다."
    },
    {
        icon: Bot,
        step: "02",
        title: "AI 제안",
        description: "AI가 요청을 해석하고 변경할 일정과 내용을 확인 카드로 제안합니다.",
    },
    {
        icon: UserCheck,
        step: "03",
        title: "사용자 확인",
        description: "사용자가 확인 카드에서 제안을 승인합니다.",
    },
    {
        icon: ShieldCheck,
        step: "04",
        title: "서버 검증",
        description:
            "로그인 사용자와 일정 소유자, 기존 일정의 버전과 변경 충돌 여부를 확인합니다.",
    },
    {
        icon: Database,
        step: "05",
        title: "일정 반영",
        description:
            "검증을 통과한 경우에만 데이터베이스에 반영하고 달력과 일정 목록을 갱신합니다.",
    },
];

const responsibilities = [
    "초기 요구사항과 사용 중 발견한 개선사항을 GitHub Issue로 관리하고, 완료 조건을 정해 기능별 작업 범위를 구체화했습니다.",
    "Codex와 서브에이전트를 구현과 리뷰에 활용하고, 변경 코드를 검토해 필요한 부분을 직접 수정했습니다.",
    "main 브랜치 직접 Push를 제한하고 PR을 통해 변경사항을 검토한 뒤 병합하도록 설정",
    "기능별 브랜치와 Git worktree에서 작업하고 PR 단위로 변경사항을 검증하고 통합했습니다.",
    "데스크톱과 모바일에서 주요 사용자 흐름을 직접 확인했습니다.",
    "프론트엔드, 백엔드, QA, 보안 검토 스킬을 작업 유형에 맞게 적용하고, 반복적으로 발생한 문제와 검증 항목을 반영해 스킬을 지속적으로 개선했습니다.",
    "GitHub Actions로 타입 검사, 린트, 테스트, 빌드 CI를 구성하고 Husky와 lint-staged로 커밋 전 검사 자동화 했습니다.",
];

const validationItems = ["자동화 테스트 199개(11.03기준)", "타입 검사", "린트", "프로덕션 빌드"];

export function TeumsaeCaseStudy() {
    return (
        <section id="teumsae" className="scroll-mt-24 sm:px-10">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-800/50 bg-zinc-900/70 shadow-2xl shadow-teal-950/20 backdrop-blur-md">
                

                <div className="relative border-b border-zinc-800/80 p-6 sm:p-10 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-teal-700/50 bg-teal-950/60 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-teal-300">
                            AI 활용 개발
                        </span>
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-700/80 bg-zinc-950/55 px-3.5 py-2 shadow-inner backdrop-blur-sm">
                            <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                            />
                            <span className="text-xs font-bold text-zinc-200">
                                개인 프로젝트
                            </span>
                            <span
                                aria-hidden="true"
                                className="h-3 w-px bg-zinc-700"
                            />
                            <span className="text-xs font-semibold tabular-nums text-zinc-400">
                                10.27 ~ 현재
                            </span>
                        </div>
                    </div>

                    <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                        <div>
                            <p className="text-sm font-bold text-teal-400">
                                서비스 소개와 개발 상태
                            </p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                틈새
                            </h2>
                            <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-zinc-300 sm:text-base sm:leading-8">
                                등록된 일정과 개인별 가능 시간을 바탕으로 빈 시간을 찾고,
                                자연어 대화로 일정을 관리하는 개인 AI 스케줄러입니다. AI가
                                변경안을 제안하면 사용자가 확인하고, 서버 검증을 통과한 뒤
                                일정에 반영합니다.
                            </p>
                            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-zinc-400">
                                개인 프로젝트로 실제 배포해 사용 중이며, 사용자 경험과 기능을
                                계속 개선하고 있습니다.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <a
                                href="https://teumsae-blush.vercel.app/"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-700 px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                            >
                                <ExternalLink
                                    size={15}
                                    aria-hidden="true"
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                                Live Demo
                            </a>
                            <a
                                href="https://github.com/sonprogrammer/teumsae"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950/50 px-5 py-3 text-sm font-extrabold text-zinc-200 transition-colors hover:border-teal-700 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                            >
                                <SiGithub size={15} aria-hidden="true" />
                                GitHub
                            </a>
                            <a
                                href="https://github.com/sonprogrammer/teumsae/actions"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950/50 px-5 py-3 text-sm font-extrabold text-zinc-200 transition-colors hover:border-teal-700 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                            >
                                <GitBranch size={15} aria-hidden="true" />
                                CI 확인
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative space-y-12 p-6 sm:p-10 lg:p-12">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-400">
                            Representative Screens
                        </p>
                        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                            대표 화면
                        </h3>

                        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/45 p-5 sm:p-7">
                            <TeumsaeImageGallery />

                            <div className="mt-6 grid gap-5 border-t border-zinc-800 pt-6 lg:grid-cols-2">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-teal-500">
                                        Calendar & Availability
                                    </p>
                                    <h4 className="mt-2 text-base font-extrabold text-white">
                                        달력과 일정 가능 시간 설정
                                    </h4>
                                    <p className="mt-3 text-sm font-medium leading-7 text-zinc-400">
                                        주간 및 월간 달력에서 일정을 확인하고, 요일별 가능 시간과
                                        날짜별 불가일을 관리합니다. 다른 기기에서 변경한 일정은
                                        화면 복귀 시 확인하거나 새로고침할 수 있습니다.
                                    </p>
                                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-800/60 bg-teal-950/40 px-3.5 py-2 text-xs font-bold text-teal-200">
                                        <CheckCircle2 size={14} aria-hidden="true" />
                                        PWA 홈 화면 설치와 일정 푸시 알림을 지원
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-teal-500">
                                        AI Schedule Assistant
                                    </p>
                                    <h4 className="mt-2 text-base font-extrabold text-white">
                                        AI 대화와 일정 변경 확인
                                    </h4>
                                    <p className="mt-3 text-sm font-medium leading-7 text-zinc-400">
                                        자연어로 일정 조회와 빈 시간 검색을 요청할 수 있습니다.
                                        일정 등록, 수정, 삭제는 사용자가 내용을 확인한 뒤 서버
                                        검증을 거쳐 실행됩니다.
                                    </p>
                                    <div className="mt-4 flex items-start gap-2.5">
                                        <CheckCircle2
                                            size={15}
                                            aria-hidden="true"
                                            className="mt-1 shrink-0 text-teal-400"
                                        />
                                        <span className="text-xs font-medium leading-6 text-zinc-300">
                                            Groq API로 GPT-OSS 모델을 호출하고, Tool Calling으로
                                            일정 기능을 연결했습니다.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-400">
                            Safe Schedule Changes
                        </p>
                        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                            일정 변경 실행 구조
                        </h3>
                        <p className="mt-3 text-sm font-bold text-teal-200">
                            AI 변경 제안 → 사용자 확인 → 서버 검증 → 일정 반영
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {validationItems.map(item => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-full border border-teal-900/60 bg-teal-950/30 px-3 py-2 text-xs font-bold text-teal-100"
                                >
                                    <CheckCircle2
                                        size={14}
                                        aria-hidden="true"
                                        className="shrink-0 text-teal-400"
                                    />
                                    {item}
                                </span>
                            ))}
                        </div>

                        <TeumsaeCollapsibleDetails>
                            <div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
                                    {changeFlow.map((item, index) => {
                                        const Icon = item.icon;

                                        return (
                                            <article
                                                key={item.step}
                                                className="group relative flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950/45 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-800/80 hover:bg-zinc-950/70 hover:shadow-lg hover:shadow-teal-950/20"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex size-10 items-center justify-center rounded-xl border border-teal-800/50 bg-teal-950/50 text-teal-300 transition-colors group-hover:border-teal-700 group-hover:bg-teal-900/40">
                                                        <Icon size={18} aria-hidden="true" />
                                                    </div>
                                                    <span className="text-xs font-black text-zinc-600">
                                                        {item.step}
                                                    </span>
                                                </div>
                                                <h4 className="mt-5 text-sm font-extrabold text-white">
                                                    {item.title}
                                                </h4>
                                                <p className="mt-2 text-xs font-medium leading-6 text-zinc-400">
                                                    {item.description}
                                                </p>
                                                {index < changeFlow.length - 1 && (
                                                    <span className="absolute -right-5.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-teal-500 shadow-md xl:flex">
                                                        <ArrowRight
                                                            size={12}
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>

                                <div className="mt-5 rounded-2xl border border-teal-900/60 bg-teal-950/25 px-5 py-4">
                                    <p className="text-sm font-semibold leading-7 text-teal-100/90">
                                        AI는 실제 저장 여부나 권한을 결정하지 않습니다. 사용자 확인과
                                        서버 검증을 거쳐야 일정이 변경됩니다.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
                                <div className="rounded-3xl border border-zinc-800 bg-zinc-950/45 p-5 sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-400">
                                        My Role
                                    </p>
                                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                                        직접 수행한 역할
                                    </h3>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {responsibilities.map(item => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    aria-hidden="true"
                                                    className="mt-0.5 shrink-0 text-teal-400"
                                                />
                                                <span className="text-xs font-medium leading-6 text-zinc-300">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-teal-800/40 bg-linear-to-br from-teal-950/55 to-zinc-950/70 p-5 sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-400">
                                        Verified
                                    </p>
                                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
                                        확인 가능한 근거
                                    </h3>
                                    <p className="mt-4 text-sm font-medium leading-7 text-zinc-400">
                                        최근 로컬 검증에서 아래 항목을 모두 통과했습니다.
                                    </p>

                                    <div className="mt-5 space-y-3">
                                        {validationItems.map(item => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 rounded-2xl border border-teal-900/50 bg-teal-950/30 px-4 py-3"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    aria-hidden="true"
                                                    className="shrink-0 text-teal-400"
                                                />
                                                <span className="text-sm font-bold text-zinc-200">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TeumsaeCollapsibleDetails>
                    </div>
                </div>
            </div>
        </section>
    );
}
