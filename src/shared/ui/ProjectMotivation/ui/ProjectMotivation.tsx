import { Lightbulb } from "lucide-react";

import { themeMap, ThemeType } from "@/shared/config/all/themeMap";

type ProjectMotivationProps = {
    description: string;
    theme: ThemeType;
};

export function ProjectMotivation({
    description,
    theme,
}: ProjectMotivationProps) {
    const style = themeMap[theme];

    return (
        <section className="lg:px-20 pb-10">
            <div className="mx-auto w-full max-w-7xl">
                <div
                    className={`rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 ${style.border}`}
                >
                    <div className="flex items-start gap-4">
                        <div
                            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${style.icon}`}
                        >
                            <Lightbulb
                                size={19}
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <p
                                className={`text-xs font-black uppercase tracking-[0.16em] ${style.text}`}
                            >
                                Why I Built This
                            </p>

                            <h2 className="mt-3 text-xl font-black tracking-tight text-white">
                                프로젝트를 시작한 이유
                            </h2>

                            <p className="mt-4 max-w-4xl whitespace-pre-line text-sm font-medium leading-7 text-zinc-300 sm:text-base">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}