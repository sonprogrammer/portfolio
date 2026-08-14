import { SectionHeader } from "@/shared/ui/project-section-ui";
import { ArrowRight, BookOpen, Network, Workflow } from "lucide-react";

const items = [
    {
        icon: BookOpen,
        title: "Learn",
        description: "n8n을 학습하며 코드 외에도 워크플로우를 통해 반복 작업을 자동화하는 방식을 익혔습니다.",
    },
    {
        icon: Network,
        title: "Connect",
        description: "여러 서비스와 데이터를 연결해 하나의 자동화 흐름으로 구성하는 방식에 관심을 두고 있습니다.",
    },
    {
        icon: Workflow,
        title: "Apply",
        description: "앞으로 개인 프로젝트와 실제 개발 과정에서 반복되는 작업에 적용할 수 있는 영역을 탐색하고 있습니다.",
    },
];

export function AutomationSection() {
    return (
        <section>
            <SectionHeader
                number="02"
                title="Automation"
                description="반복적인 작업을 개발자가 직접 처리하는 것뿐 아니라 자동화할 수 있는 방법도 학습하고 있습니다."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="relative rounded-3xl border bg-card p-6"
                        >
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                                <Icon size={20} />
                            </div>

                            <h3 className="mt-6 text-lg font-black">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {item.description}
                            </p>

                            {index < items.length - 1 && (
                                <ArrowRight className="absolute -right-5 top-1/2 hidden text-zinc-300 md:block" />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}