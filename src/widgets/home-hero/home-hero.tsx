'use client'

import { ArrowUpRight, ArrowDown, Code2 } from "lucide-react";
import { AnimationNum } from '@/shared/ui/animation'
import Link from "next/link";

const metrics = [
  {
    value: 97,
    suffix: '%',
    label: "AI 분석 결과 DB 재사용으로 재조회 시간 단축",
    project: "MungPass",
    color: 'text-orange-400'
  },
  {
    value: 11,
    suffix: "ms",
    label: "AI 검색 결과 캐싱으로 평균 재조회 시간 867ms → 11ms",
    project: "Fuelly",
    color: 'text-emerald-500'
  },
  {
    value: 81,
    suffix: '%',
    label: "초기 시세 로딩 단축",
    project: "Virtual Coin",
    color: 'text-red-400'
  },
  {
    value: 86,
    suffix: '%',
    label: "LCP 개선",
    project: "BNTY",
    color: 'text-blue-400'
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
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-teal-500/40 sm:p-8 lg:p-10">

          <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
            <div>
              <span className="inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-teal-300">
                AI Project
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                AI 활용 개발 사례 | <span className="text-teal-500">틈새(Teumsae)</span>
              </h3>

              <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-zinc-300 sm:text-base sm:leading-8">
                자연어로 빈 시간을 찾고 일정을 관리하는 개인 AI 스케줄러입니다. 
                AI의 변경 제안을 사용자 확인과 서버 검증을 거쳐 실행하도록 구성했으며, 
                Codex를 활용한 개발 과정에서 요구사항 정의, 코드 검토, 사용자 흐름 검증, CI 및 PR 통합을 수행했습니다.

              </p>
            </div>

            <Link
              href="/lab#teumsae" 
              className="group/cta inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-teal-700/60 bg-teal-700/10 px-4 py-3 text-sm font-extrabold text-teal-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:bg-teal-700/20 hover:text-teal-200 sm:px-5"
            >
              프로젝트 상세 보기
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
