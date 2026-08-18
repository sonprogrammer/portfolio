import { BntyNav } from "@/features/bnty/nav/ui";
import { RoleSelection } from "@/features/bnty/role/ui/RoleSelection";
import { techChoice, technologyGroups, troubleshootingItems } from "@/shared/config/bnty";
import { FunctionReveal } from "@/shared/ui/Function-reveal";
import { ArchitectureImgCard, ProjectHero, SectionHeader, TechChoiceCard, TechnologyCard, TroubleshootingCard } from "@/shared/ui/project-section-ui";
import { ProjectMotivation } from "@/shared/ui/ProjectMotivation/ui";
import { BntyArchitecture } from "@/widgets/bnty/architecture/ui";
import { BntyPages } from "@/widgets/bnty/EachPage/ui";


export default function BntyPage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectHero
        name="BNTY"
        projectType="Personal Project"
        description="트레이너와 회원을 연결해 QR 출석, PT 관리와 실시간 소통을 지원하는 PT 관리 서비스"
        logoSrc="/bnty.svg"
        githubUrl="https://github.com/sonprogrammer/BNTYpt"
        deployUrl="https://bnty.netlify.app/"
        period= "2024.09 ~ 2024.10"
        accentClassName="text-blue-400"
        borderClassName="border-blue-500/20"
      />
      <section>
        <SectionHeader
          number="01"
          title="핵심 기능"
          description="*최소한의 기능 테스트를 위해 실제 서비스와 일부 다를 수 있음을 미리 알려드립니다."
        />

        <div className="px-0 sm:px-2">
          <FunctionReveal
            title="BNTY 기능 체험"
            description="트레이너와 회원 역할을 전환하며 BNTY의 주요 기능과 데이터 흐름을 직접 체험해보세요."
            theme="blue"
            coldStartNotice
          >
            <div className="w-full min-w-0 rounded-[28px] border border-neutral-700 bg-neutral-900 p-4 shadow-2xl shadow-black/40 sm:rounded-[36px] sm:p-6 md:rounded-[50px] md:p-8">


              <div className="mb-2 mt-3 flex justify-center sm:mt-5">
                <RoleSelection />
              </div>

              <div className="mb-6 flex justify-center overflow-x-auto sm:mb-8 md:mb-10">
                <BntyNav />
              </div>
              <div className="min-w-0">

                <BntyPages />
              </div>
            </div>

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
        theme="blue"
        description="트레이너로 근무하며 PT 횟수를 수기로 관리하는 과정에서 회원과 트레이너 모두 잔여 횟수를 명확하게 확인하기 어렵고 개인정보 및 수기 관리의 불편을 경험했습니다. 이러한 관리 과정을 개선하기 위해 시작했습니다."
      />


      <section className="">
        <SectionHeader
          number="02"
          title="서비스 아키텍처 & 데이터 흐름"
          description="BNTY의 사용자 흐름부터 REST API, 실시간 통신, 데이터 저장까지 전체 서비스 구조를 정리했습니다."
        />
        <div className="grid gap-8 px-5 lg:grid-cols-2 md:px-10 xl:px-20">
          <ArchitectureImgCard 
            title='BNTY 서비스 구조'
            description="트레이너와 회원의 상호작용부터 서버, 데이터베이스, 실시간 통신까지의 전체 흐름입니다."
            src="/Bntyflow.png"
            alt="BNTY 서비스 흐름 및 시스템 아키텍쳐"
          />
        

          <BntyArchitecture />
        </div>

      </section >

      <div className="border mx-20 border-gray-500 my-10" />

      <section >
        <SectionHeader
          number="03"
          title="사용 기술"
          description="BNTY의 화면 구성, 데이터 관리, 백엔드와 실시간 통신에 사용한 기술을 역할별로 정리했습니다."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 px-5 md:px-10 xl:px-20">
          {technologyGroups.map((group) => (
            <TechnologyCard key={group.title} theme="blue" {...group} />
          ))}
        </div>

          <TechChoiceCard data={techChoice} colors="text-blue-500" />

      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <section className="space-y-8 pb-12">
        <SectionHeader
          number="04"
          title="트러블슈팅"
          description="채팅 개발 과정에서 발생한 문제 및 초기 로딩 속도 저하 문제를 분석하고 구조적으로 개선했습니다."
        />

        <div className="space-y-6 px-5 md:px-10 lg:px-20">
          {troubleshootingItems.map((item, index) => (
            <TroubleshootingCard
              key={item.title}
              number={index + 1}
              theme="blue"
              {...item}
            />
          ))}
        </div>
      </section>
    </div >
  )
}