'use client'

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface ProjectHeroProps {
    name: string;
    description: string;
    logoSrc: string;
    projectType: "Personal Project" | "Team Project";
    githubUrl: string;
    deployUrl?: string;
    role?: string;
    period: string;
    accentClassName?: string;
    borderClassName?: string;
}

export function ProjectHero({
    name,
    description,
    logoSrc,
    projectType,
    githubUrl,
    deployUrl,
    role,
    period,
    accentClassName,
    borderClassName
}: ProjectHeroProps) {
    return (
        <section className="px-4 pt-12 sm:px-2 sm:pt-16 md:px-3 lg:px-5">
            <div
                className={`mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 border-b pb-5 sm:gap-8 md:flex-row md:items-center ${borderClassName}`}
            >
                <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-5">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-2.5 sm:size-20 sm:p-3">
                        <Image
                            src={logoSrc}
                            alt={`${name} logo`}
                            width={80}
                            height={80}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span
                                className={`text-xs font-black uppercase tracking-[0.16em] ${accentClassName}`}
                            >
                                {projectType}
                            </span>

                            {role && (
                                <span className="text-xs font-semibold text-blue-500">
                                    {role}
                                </span>
                            )}
                        </div>

                        <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                {name}
                            </h1>

                            <span className="pb-1 text-xs font-semibold text-gray-500 sm:text-sm">
                                {period}
                            </span>
                        </div>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-full shrink-0 flex-wrap gap-3 md:w-auto lg:flex-row">
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:-translate-y-0.5 hover:border-gray-600 hover:text-white md:flex-none"
                    >
                        <SiGithub size={17} />
                        GitHub
                    </a>

                    {deployUrl && (
                        <a
                            href={deployUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:-translate-y-0.5 hover:border-gray-600 hover:text-white md:flex-none"
                        >
                            <ExternalLink size={17} />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}