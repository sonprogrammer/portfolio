'use client'
import { Scroll } from "@/shared/ui/animation";
import { EmailCopyBtn } from "@/shared/ui/buttons";
import { FileText } from "lucide-react";
import { SiGithub } from 'react-icons/si';
import Image from 'next/image'

const quickProfile = [
    {
        label: "Education",
        title: "한서대학교",
        description: "항공소프트웨어공학과",
    },
    {
        label: "Bootcamp",
        title: "엘리스 웹 개발자 트랙 6기",
        description: "2023.08 - 2023.12",
    },
    {
        label: "Certificates",
        title: "정보처리기사 · GTQ 1급",
        description: "자격 취득",
    },
    {
        label: "Current Focus",
        title: "Web Engineering & AI",
        description: "Architecture · Data Flow · Performance · AI-assisted Development",
    },
];

export function MoreInfoHero() {



    return (
        <section className="relative flex min-h-[calc(100svh-72px)] items-start mt-10 px-0 border-zinc-900 sm:px-10">
            <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-20">
                <div>
                    <div className="flex items-end gap-5">

                        <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">
                            <Image
                                src="/photo.png"
                                alt="손영진 프로필"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="pb-1">
                            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                손영진
                            </h1>

                            <p className="mt-2 text-lg font-semibold text-purple-400">
                                Frontend Developer
                            </p>
                        </div>
                    </div>

                    <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300">
                        프론트엔드 개발을 중심으로 프로젝트를 직접 설계하고 구현하며,
                        새로운 기술과 개발 방식을 꾸준히 학습하고 있습니다.
                        교육과 자격, 현재의 자기계발 내용을 정리했습니다.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="https://github.com/sonprogrammer"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg shadow-white/5 cursor-pointer"
                        >
                            <SiGithub size={16} />
                            GitHub
                        </a>

                        <a
                            href="/resume1.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-purple-500/50 hover:text-white shadow-lg cursor-pointer"
                        >
                            <FileText size={16} className="text-purple-400" />
                            Resume
                        </a>

                        <EmailCopyBtn email="ods04139@naver.com" />
                    </div>
                </div>


                <div className="rounded-[2.5rem] border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md shadow-xl lg:border-l lg:border-t-0 lg:pl-10">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-400">
                            Quick Profile
                        </p>
                    </div>

                    <div className="mt-7 divide-y divide-zinc-800/80">
                        {quickProfile.map(item => (
                            <div
                                key={item.label}
                                className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[120px_1fr]"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-zinc-400">
                                    {item.label}
                                </p>

                                <div>
                                    <h2 className="text-sm font-black text-white">
                                        {item.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-zinc-400 font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-zinc-800/80 pt-5">
                        <p className="text-xs leading-6 text-zinc-400 font-medium">
                            아래에서 교육 과정, 자격과 현재 자기계발 내용을
                            자세히 확인할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            <Scroll to="education" />
        </section>
    );
}