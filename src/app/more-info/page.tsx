import { Certificates, Education, MoreInfoHero, SelfDevelopment } from "@/widgets/more-info/ui";


export default function MoreInfoPage() {
    return (
        <main>
            <MoreInfoHero />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 lg:px-10  py-16">
                <Education />

                <Certificates />

                <SelfDevelopment />

            </div>
        </main>
    );
}