import { mungImplementation, mungpassTechChoice, mungTechnologyGroup } from "@/shared/config/mungpass";
import { mungTroubleshooting } from "@/shared/config/mungpass/mungTroubleShooting";
import { FunctionReveal } from "@/shared/ui/Function-reveal";
import { ImplementationCard, ProjectHero, SectionHeader, TechChoiceCard, TechnologyCard, TroubleshootingCard } from "@/shared/ui/project-section-ui";
import { ProjectMotivation } from "@/shared/ui/ProjectMotivation/ui";
import { MungpassArchitecture } from "@/widgets/mungpass/architecture/ui";
import { MungpassPages } from "@/widgets/mungpass/pages/all/ui";

export default function MungpassPage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectHero
        name="Mungpass"
        projectType="Personal Project"
        description="회원·사장님·관리자를 연결하는 반려동물 시설 O2O · B2B 운영 플랫폼"
        logoSrc="/mungpass.png"
        githubUrl="https://github.com/sonprogrammer/Mungpass"
        deployUrl="https://mungpass.vercel.app"
        period="2026.01 ~ 2026.05"
        accentClassName="text-orange-400"
        borderClassName="border-orange-500/20"
      />


      <section>
        <SectionHeader
          number="01"
          title="핵심 기능"
          description="*최소한의 기능 테스트를 위해 실제 서비스와 일부 다를 수있음을 미리 알려드립니다."
        />
        <div className="px-2">
          <FunctionReveal
            title="MungPass 기능 체험"
            description="일반 사용자, 사장님, 관리자 역할을 전환하며 역할별 주요 기능과 서비스 흐름을 직접 체험해보세요."
            theme="orange"
          >
            <MungpassPages />
          </FunctionReveal>
          <p className="mt-3 text-center text-xs leading-5 text-white/40">
            *기능 체험에서는 별도의 회원가입 없이 사용할 수 있도록
            Supabase Anonymous Sign-Ins를 적용했습니다.
          </p>
        </div>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <ProjectMotivation
        theme="orange"
        description="애견카페를 운영하는 지인이 수기 관리와 고객 이용 시간 관리에서 겪는 불편을 듣고 오프라인에서 이루어지던 이용 과정을 디지털화하기 위해 시작했습니다."
      />



      <section>
        <SectionHeader
          number="02"
          title="서비스 아키텍처 & 데이터 흐름"
          description="역할별 사용자 흐름부터 인증, QR 이용 처리, 데이터 저장과 실시간 동기화까지 MungPass의 전체 서비스 구조를 정리했습니다."
        />

        <MungpassArchitecture />
      </section>

      <div className="border mx-20 border-gray-500 my-10" />


      <section className="space-y-8">
        <SectionHeader
          number="03"
          title="핵심 구현"
          description="O2O 서비스의 주요 사용자 흐름과 운영 기능을 실제 구현 단위로 정리했습니다."
        />

        <div className="grid gap-6 px-5 md:px-10 xl:px-20 lg:grid-cols-2">
          {mungImplementation.map((item, index) => (
            <ImplementationCard
              key={item.title}
              number={index + 1}
              theme="orange"
              {...item}
            />
          ))}
        </div>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <section>
        <SectionHeader
          number="04"
          title="사용 기술"
          description="MungPass의 역할별 UI, 상태 관리, 인증과 데이터 처리 및 실시간 기능에 사용한 기술을 역할별로 정리했습니다."
        />
        <div className="grid gap-5 px-5 md:px-10 xl:px-20  sm:grid-cols-2 xl:grid-cols-4">
          {mungTechnologyGroup.map(group => (
            <TechnologyCard
              key={group.title}
              theme="orange"
              {...group}
            />
          ))}
        </div>
        <TechChoiceCard data={mungpassTechChoice} colors="text-orange-500" />
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <section className="space-y-8 pb-12">
        <SectionHeader
          number="05"
          title="트러블슈팅"
          description="서비스 확장 과정에서 발생한 코드 복잡도와 AI API 반복 호출 문제를 구조적으로 개선했습니다."
        />

        <div className="space-y-6 px-5 md:px-10 xl:px-20 ">
          {mungTroubleshooting.map((item, index) => (
            <TroubleshootingCard
              key={item.title}
              number={index + 1}
              theme="orange"
              {...item}
            />
          ))}
        </div>
      </section>


    </div>
  )
}