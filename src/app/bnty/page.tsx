
import { techChoice, technologyGroups, troubleshootingItems } from "@/shared/config/bnty";
import { ArchitectureImgCard, SectionHeader, TechChoiceCard, TechnologyCard, TroubleshootingCard } from "@/shared/ui/project-section-ui";
import { ProjectMotivation } from "@/shared/ui/ProjectMotivation/ui";
import { BntyArchitecture } from "@/widgets/bnty/architecture/ui";
import { BntyFeatures } from "@/widgets/bnty/features/ui/BntyFeatures";
import { ProjectTestSection } from "@/widgets/bnty/ProjectTest/ProjectTestSection";


export default function BntyPage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectTestSection />

      <div className="border mx-20 border-gray-500 my-10" />


      <ProjectMotivation
        theme="blue"
        description="트레이너로 근무하며 PT 횟수를 수기로 관리하는 과정에서 회원과 트레이너 모두 잔여 횟수를 명확하게 확인하기 어렵고 개인정보 및 수기 관리의 불편을 경험했습니다. 이러한 관리 과정을 개선하기 위해 시작했습니다."
      />

      <section>
        <SectionHeader
          number="02"
          title="주요 기능"
          description="기능을 선택하면 상세 내용을 확인할 수 있습니다."
        />
        <div className='px-5 md:px-10 xl:px-20'>
          <BntyFeatures />
        </div>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />


      <section className="">
        <SectionHeader
          number="03"
          title="서비스 아키텍처 & 데이터 흐름"
          description="BNTY의 사용자 흐름부터 REST API, 실시간 통신, 데이터 저장까지 전체 서비스 구조를 정리했습니다."
        />
        <div className="grid gap-8 px-5 lg:grid-cols-2 md:px-10 xl:px-20">
          <ArchitectureImgCard
            title='BNTY 서비스 구조'
            description="트레이너와 회원의 상호작용부터 서버, 데이터베이스, 실시간 통신까지의 전체 흐름입니다."
            src="/bntyF.png"
            alt="BNTY 서비스 흐름 및 시스템 아키텍쳐"
          />


          <BntyArchitecture />
        </div>

      </section >

      <div className="border mx-20 border-gray-500 my-10" />

      <section >
        <SectionHeader
          number="04"
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
          number="05"
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