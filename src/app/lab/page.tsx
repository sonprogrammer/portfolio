import { DevelopmentWorkFlow, CurrentFocus, EnginPrinciples, LabHero, Learning, AiAssit } from "@/widgets/Lab/ui";
import { TeumsaeCaseStudy } from "@/widgets/teumsae";


export default function LabPage() {
    return (
        <main className="h-full">
            <LabHero />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 py-16">
                <TeumsaeCaseStudy />

                <DevelopmentWorkFlow />

                <AiAssit />

                <Learning />

                <EnginPrinciples />

                <CurrentFocus />
            </div>
        </main>
    );
}
