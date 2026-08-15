import { HomeHero } from "@/widgets/home-hero";
import { ProjectOverview } from "@/widgets/project-overview";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <HomeHero />
      <ProjectOverview />
    </main>
  );
}
