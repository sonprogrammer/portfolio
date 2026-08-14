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
    accentClassName,
    borderClassName
}: ProjectHeroProps) {
    return (
        <section className="px-20 pt-16 ">
            <div className={`mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 border-b pb-5 sm:flex-row sm:items-center ${borderClassName}`}>
                <div className="flex items-center gap-5">
                    <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-3">
                        <Image
                            src={logoSrc}
                            alt={`${name} logo`}
                            width={80}
                            height={80}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`text-xs font-black uppercase tracking-[0.16em] ${accentClassName}`}
                            >
                                {projectType}
                            </span>

                            {role && (
                                <span className="text-xs font-semibold text-gray-500">
                                    {role}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
                            {name}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:-translate-y-0.5 hover:border-gray-600 hover:text-white"
                    >
                        <SiGithub size={17} />
                        GitHub
                    </a>

                    {deployUrl && (
                        <a
                            href={deployUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:-translate-y-0.5 hover:border-gray-600 hover:text-white"
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