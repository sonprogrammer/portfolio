import { fuellyTechChoice, fuellyTroubleshooting } from "@/shared/config/fuelly";
import { fuellyTechnologyGroups } from "@/shared/config/fuelly/fuellyTechnologyGroup";
import { FunctionReveal } from "@/shared/ui/Function-reveal";
import { ArchitectureImgCard, ProjectHero, SectionHeader, TechChoiceCard, TechnologyCard, TroubleshootingCard } from "@/shared/ui/project-section-ui";
import { ProjectMotivation } from "@/shared/ui/ProjectMotivation/ui";
import { FuellyArchitecture } from "@/widgets/fuelly/architecture/ui";
import { FuellyPages } from "@/widgets/fuelly/pages/ui";


export default function FuellyPage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectHero
        name="Fuelly"
        projectType="Personal Project"
        description="AI 기반 식단 추천과 영양 기록, 인증 흐름을 구현한 개인 맞춤 영양 관리 서비스"
        logoSrc="/fuelly.png"
        githubUrl="https://github.com/sonprogrammer/fuelly"
        deployUrl="https://fuelly-mauve.vercel.app/"
        accentClassName="text-emerald-400"
        borderClassName="border-emerald-500/20"
      />

      <section>
        <SectionHeader
          number="01"
          title="핵심 기능"
          description="*최소한의 기능 테스트를 위해 실제 서비스와 일부 다를 수있음을 미리 알려드립니다."
        />
        <div className="px-2">
          <FunctionReveal
            title="Fuelly 기능 체험"
            description="식단을 기록하고 남은 영양 정보를 확인하며 AI 기반 식단 추천을 체험해보세요."
            theme="emerald"
          >

            <FuellyPages />
          </FunctionReveal>
          <p className="mt-3 text-center text-xs leading-5 text-white/40">
            *포트폴리오 기능 체험에서는 별도의 회원가입 없이 사용할 수 있도록
            세션 기반의 임시 로그인 방식을 사용합니다.
            실제 프로젝트의 인증 방식과는 차이가 있습니다.
          </p>
        </div>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <ProjectMotivation
        theme="emerald"
        description="식단을 관리하면서 먹은 음식과 섭취량을 계속 기억하고 하루 목표량에서 얼마나 남았는지 직접 계산해야 하는 불편을 줄이기 위해 시작했습니다."
      />

      <section>
        <SectionHeader
          number="02"
          title="서비스 아키텍처 & 데이터 흐름"
          description="AI 영양 정보 처리부터 상태 관리, 인증과 데이터 저장까지 Fuelly의 주요 데이터 흐름을 정리했습니다."
        />
        <div className="grid gap-8 px-5 md:px-10 xl:px-20 lg:grid-cols-2">
          <ArchitectureImgCard
            title="Fuelly 서비스 구조"
            description="사용자 요청부터 Next.js Route Handler, Groq AI, MongoDB로 이어지는 전체 데이터 흐름입니다."
            src="/fuellyFlow.png"
            alt="Fuelly 서비스 흐름 및 시스템 아키텍처"
          />
          <FuellyArchitecture />
        </div>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />



      <section>
        <SectionHeader
          number="03"
          title="사용 기술"
          description="Fuelly의 영양 관리 UI, 상태 관리, 인증과 AI 기능에 사용한 기술을 역할별로 정리했습니다."

        />
        <div className="grid gap-5 px-5 md:px-10 xl:px-20 sm:grid-cols-2 xl:grid-cols-4">
          {fuellyTechnologyGroups.map(group => (
            <TechnologyCard
              key={group.title}
              theme="emerald"
              {...group}
            />
          ))}
        </div>
        <TechChoiceCard data={fuellyTechChoice} colors="text-emerald-500" />
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <section className="space-y-8 pb-12">
        <SectionHeader
          number="04"
          title="트러블슈팅"
          description="AI 응답 처리와 인증 과정에서 발생한 데이터 안정성, 응답 지연 및 동시 요청 문제를 분석하고 개선했습니다."
        />

        <div className="space-y-6 px-5 md:px-10 xl:px-20 ">
          {fuellyTroubleshooting.map((item, index) => (
            <TroubleshootingCard
              key={item.title}
              number={index + 1}
              theme="emerald"
              {...item}
            />
          ))}
        </div>
      </section>

    </div>
  )
}