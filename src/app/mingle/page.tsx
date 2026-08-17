import { ProjectHero, SectionHeader } from "@/shared/ui/project-section-ui";
import { MingleArchitecture, MingleCollaboration, MingleImplementation, MingleTechnology, MingleTroubleshooting } from "@/widgets/mingle/ui";


export default function MinglePage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectHero
        name="Mingle"
        projectType="Team Project"
        role="Frontend"
        description="플레이리스트 공유 SNS 서비스"
        logoSrc="/mingle.svg"
        githubUrl="https://github.com/sonprogrammer/mingle"
        period='2023.11 ~ 2023.11'
        accentClassName="text-violet-400"
        borderClassName="border-violet-500/20"
      />
      <section className="">
        <SectionHeader
          number="01"
          title="핵심 기능"
          description="팀 프로젝트에서 제가 담당한 프론트엔드 기능을 중심으로 정리했습니다."
        />

        <MingleImplementation />
      </section>

      <div className="mx-20 my-10 border border-gray-500" />

      <section className="">
        <SectionHeader
          number="02"
          title="서비스 아키텍처 & 데이터 흐름"
          description="서버 데이터 캐싱과 API 요청 구조를 중심으로 프론트엔드 데이터 흐름을 구성했습니다."
        />

        <MingleArchitecture />
      </section>

      <div className="mx-20 my-10 border border-gray-500" />

      <section className="">
        <SectionHeader
          number="03"
          title="사용 기술"
          description="프론트엔드 구현과 서버 상태 관리, API 통신에 사용한 기술입니다."
        />

        <MingleTechnology />
      </section>

      <div className="mx-20 my-10 border border-gray-500" />

      <section className="">
        <SectionHeader
          number="04"
          title="트러블슈팅"
          description="외부 API 연동 과정에서 발생한 CORS 문제를 요청 구조 분석을 통해 해결했습니다."
        />

        <MingleTroubleshooting />
      </section>

      <div className="mx-20 my-10 border border-gray-500" />

      <section className="">
        <SectionHeader
          number="05"
          title="협업 경험"
          description="5인 팀에서 프론트엔드 개발자로 참여하며 팀 단위 개발 프로세스를 경험했습니다."
        />

        <MingleCollaboration />
      </section>
    </div>
  );
}