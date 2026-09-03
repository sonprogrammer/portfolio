'use client'

import { ArrowUpRight, ArrowDown, Code2 } from "lucide-react";
import { AnimationNum } from '@/shared/ui/animation'
import Link from "next/link";

const metrics = [
  {
    value: 86,
    suffix: '%',
    label: "LCP 개선",
    project: "BNTY",
    color: 'text-blue-400'
  },
  {
    value: 80,
    suffix: '%',
    label: "초기 시세 로딩 단축",
    project: "Virtual Coin",
    color: 'text-red-400'
  },

  {
    value: 67,
    suffix: '%',
    label: "AI API 호출 절감",
    project: "MungPass",
    color: 'text-orange-400'
  },
];

export function HomeHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden border-b  px-6 py-16 border-zinc-900 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="max-w-4xl">
          

          <h1 className="text-4xl font-black leading-[1.08] tracking-tight  text-white sm:text-6xl lg:text-7xl">
            복잡한 데이터 흐름을
            <br />
            <span className="text-purple-500 ">
              구조와 사용자 경험으로
            </span>
            <br />
            연결합니다.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            O2O, 실시간 데이터, AI, 인증처럼 서로 다른 문제를 직접
            구현하며 서비스 구조와 상태 흐름을 설계하고
            성능과 사용자 경험을 개선해왔습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl  px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 bg-white text-zinc-950"
            >
              프로젝트 살펴보기
              <ArrowDown size={16} />
            </a>

            <div className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold border-zinc-800 bg-zinc-950 text-zinc-300">
              <Code2 size={16} />
              5개의 서비스 직접 설계 · 구현
            </div>
          </div>
        </div>

        <div className="rounded-3xl border p-6  shadow-zinc-200/60 border-zinc-800 bg-zinc-950  sm:p-8">
          <div>


            <h2 className="mt-3 text-2xl font-black text-white">
              구현 결과를 숫자로 확인하세요.
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              단순 기능 구현에서 끝내지 않고 실제 병목과 비용을 분석해
              개선했습니다.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {metrics.map(metric => (
              <div
                key={metric.project}
                className="group flex items-center justify-between gap-5 rounded-2xl border  px-5 py-4 transition-colors border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900"
              >
                <div>
                  <p className="text-sm font-bold text-white">
                    {metric.label}
                  </p>

                  <p className={`mt-1 text-xs  ${metric.color}`}>
                    {metric.project}
                  </p>
                </div>

                <strong
                  className={`min-w-18 text-right text-3xl font-black tabular-nums tracking-tight ${metric.color}`}
                >
                  <AnimationNum
                    value={metric.value}
                    suffix={metric.suffix}
                    duration={1200}
                  />
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 w-full max-w-7xl border-t border-zinc-800/80 pt-10 sm:mt-20">
        <div className="group flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-purple-400">
              Perspective
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              AI를 바라보는 개발자의 관점
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
            <p className="max-w-2xl text-xs sm:text-sm font-medium leading-7 text-zinc-300">
              AI를 대체재가 아닌 설계와 구현 역량을 확장하는 도구로 활용합니다.
              변화하는 AI 시대를 위협으로 보기보다 새로운 도구를 빠르게 학습하고
              제 역량에 결합해 더 나은 결과를 만드는 기회로 바라봅니다.
            </p>

            <Link
              href="/lab#ai-development"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-extrabold text-purple-400 transition-colors hover:text-purple-300"
            >
              AI 활용 방식 자세히 보기
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}