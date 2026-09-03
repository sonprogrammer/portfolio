import { projects } from "@/shared/config/all";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";



export function ProjectOverview() {
  const featuredProject = projects.find(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  if (!featuredProject) {
    return null;
  }

  const FeaturedIcon = featuredProject.icon;

  return (
    <section
      id="projects"
      className="px-6 py-20 bg-zinc-950"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            문제를 정의하고
            <br />
            해결 과정을 설계했습니다.
          </h2>

          <p className="mt-5 text-base leading-7 text-zinc-400">
            각 프로젝트에서 실제 기능을 직접 체험하고 서비스 아키텍처,
            기술 선택과 트러블슈팅 과정을 확인할 수 있습니다.
          </p>
        </div>

        <article
          className={`group relative mt-10 overflow-hidden rounded-3xl border  p-7 transition-all duration-300 hover:shadow-xl border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 ${featuredProject.theme.border}`}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-3xl `}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl ${featuredProject.theme.icon}`}
                >
                  <FeaturedIcon size={22} />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-black tracking-[0.16em] ${featuredProject.theme.text}`}
                  >
                    {featuredProject.category}
                  </span>

                  <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] font-bold text-zinc-400">
                    {featuredProject.projectType}
                  </span>

                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-end gap-x-3 gap-y-1">
                <h3 className="text-4xl font-black tracking-tight text-white">
                  {featuredProject.name}
                </h3>

                <span className="pb-1 text-sm font-semibold text-zinc-500">
                  {featuredProject.period}
                </span>
              </div>

              <p className="mt-3 text-lg font-semibold  text-zinc-200">
                {featuredProject.summary}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7  text-zinc-400">
                {featuredProject.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {featuredProject.technologies.map(technology => (
                  <span
                    key={technology}
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold border-zinc-700 bg-zinc-950 text-zinc-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border  p-5 border-zinc-800 bg-zinc-950">
              <p className="text-xs font-bold text-zinc-400">
                KEY RESULT
              </p>

              <strong
                className={`mt-2 block text-4xl font-black tracking-tight ${featuredProject.theme.text}`}
              >
                {featuredProject.metric}
              </strong>

              <p className="mt-1 text-sm font-semibold text-zinc-300">
                {featuredProject.metricLabel}
              </p>

              <div className=" border-t py-5 border-zinc-800">
                <ul className="space-y-2">
                  {featuredProject.highlights.map(highlight => (
                    <li
                      key={highlight}
                      className="text-sm text-zinc-400"
                    >
                      · {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={featuredProject.link}
                className={`flex items-center justify-between border-t pt-5 text-sm font-black border-zinc-800 ${featuredProject.theme.text}`}
              >
                <span>프로젝트 상세 보기</span>

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {otherProjects.map(project => {
            const Icon = project.icon;

            return (
              <article
                key={project.id}
                className={`group flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 ${project.theme.border}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${project.theme.icon}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-black tracking-[0.14em] ${project.theme.text}`}
                    >
                      {project.category}
                    </span>

                    <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] font-bold text-zinc-400">
                      {project.projectType}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <h3 className="text-2xl font-black text-white">
                    {project.name}
                  </h3>

                  <span className="pb-1 text-xs font-semibold text-zinc-500">
                    {project.period}
                  </span>
                </div>

                <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-zinc-300">
                  {project.summary}
                </p>

                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-6 rounded-2xl border p-4 border-zinc-800 bg-zinc-950">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Key Result
                  </p>

                  <strong
                    className={`mt-2 block text-2xl font-black tracking-tight ${project.theme.text}`}
                  >
                    {project.metric}
                  </strong>

                  <span className="mt-1 block text-xs font-semibold text-zinc-500">
                    {project.metricLabel}
                  </span>
                </div>
                <ul className="mt-5 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm leading-6 text-zinc-400"
                    >
                      · {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map(technology => (
                    <span
                      key={technology}
                      className="rounded-full px-3 py-1 text-xs font-medium bg-zinc-950 text-zinc-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-7">
                  <Link
                    href={project.link}
                    className={`flex items-center justify-between border-t pt-5 text-sm font-black border-zinc-800 ${project.theme.text}`}
                  >
                    <span>프로젝트 상세 보기</span>

                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}