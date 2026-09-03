
import { vcTechChoice, vcTroubleShooting } from "@/shared/config/vc";
import { vcTechnologyGroup } from "@/shared/config/vc/vcTechnoloyGroup";
import { SocketProvider } from "@/shared/providers/SocketProvider";
import { VcFunctionReveal } from "@/shared/ui/Function-reveal/VCFunctionReveal";
import { ArchitectureImgCard, ProjectHero, SectionHeader, TechChoiceCard, TechnologyCard, TroubleshootingCard } from "@/shared/ui/project-section-ui";
import { ProjectMotivation } from "@/shared/ui/ProjectMotivation/ui";
import { VcArchitecture } from "@/widgets/vc/architecture/ui";
import { VcPages } from "@/widgets/vc/pages/ui";
import { VcTop } from "@/widgets/vc/vc-top";


export default function VcPage() {
  return (
    <div className="flex flex-col gap-10">
      <ProjectHero
        name="Virtual Coin(VC)"
        projectType="Personal Project"
        description="Upbit API를 기반으로 실시간 시세와 모의 투자 기능을 구현한 코인 투자 서비스"
        logoSrc="/vc.svg"
        githubUrl="https://github.com/sonprogrammer/VirtualCoin"
        deployUrl="https://virtualcoinn.onrender.com/"
        period="2025.03 ~ 2025.04"
        accentClassName="text-red-400"
        borderClassName="border-red-500/20"
      />
      <section>
        <SocketProvider>
        <SectionHeader
          number="01"
          title="핵심 기능"
          description="*최소한의 기능 테스트를 위해 실제 서비스와 일부 다를 수 있음을 미리 알려드립니다."
        />
        <div className="px-2">
          <VcFunctionReveal>
            <div className="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-neutral-700 bg-neutral-900 p-4 shadow-2xl shadow-black/40 sm:rounded-[36px] sm:p-6 md:rounded-[50px] md:p-8">
              <div className="mb-6 w-full min-w-0 sm:mb-8 md:mb-10">
                <VcTop />
              </div>

              <div className="w-full min-w-0 max-w-full overflow-hidden">
                <VcPages />
              </div>
            </div>
          </VcFunctionReveal>
          
          <p className="mt-3 text-center text-xs leading-5 text-white/40">
            *포트폴리오 기능 체험에서는 별도의 회원가입 없이 사용할 수 있도록 HttpOnly 쿠키의 세션 식별자를
            기반으로 데모 사용자를 구분합니다. 실제 프로젝트의 인증 방식과는 차이가 있습니다.
          </p>
          <p className="mt-3 text-center text-xs leading-5 text-white/40">
            * VC의 실시간 시세 데이터는 별도 중계 서버를 통해 제공되며 무료 호스팅의 월 사용량 한도 초과 시 기능 체험이 일시적으로 제한될 수 있습니다. 죄송합니다.
          </p>

        </div>
        </SocketProvider>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <ProjectMotivation
        theme="red"
        description="코인 투자를 공부하려면 실제 자금이 필요하지만 충분한 자금 없이도 시세 흐름과 투자 과정을 경험할 수 있는 방법이 필요하다고 생각했습니다. 실제 돈 없이 투자 과정을 연습할 수 있도록 모의 코인 투자 서비스를 만들었습니다."
      />

      <section>
        <SectionHeader
          number="02"
          title="서비스 아키텍처 & 데이터 흐름"
          description="Upbit API에서 전달되는 시세 데이터가 서버를 거쳐 클라이언트와 차트에 반영되는 전체 흐름을 정리했습니다."

        />
        <div className="grid gap-8 px-5 md:px-10 xl:px-20 lg:grid-cols-2">
          <ArchitectureImgCard
            title="Virtual Coin 서비스 구조"
            description="Upbit의 실시간 시세 데이터를 서버에서 수신하고 클라이언트에 중계해 차트, 호가, 현재가에 반영하는 전체 데이터 흐름입니다."
            src="/vcFlow.png"
            alt="Virtual Coin 실시간 시세 수신 및 서비스 아키텍처"
          />
          <VcArchitecture />
        </div>
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <section>
        <SectionHeader
          number="03"
          title="사용 기술"
          description="Virtual Coin의 실시간 시세 처리, 상태 관리, 백엔드와 데이터 시각화에 사용한 기술을 역할별로 정리했습니다."

        />
        <div className="grid gap-5 px-5 md:px-10 xl:px-20 sm:grid-cols-2 xl:grid-cols-4">
          {vcTechnologyGroup.map(group => (
            <TechnologyCard
              key={group.title}
              theme="red"
              {...group}
            />
          ))}
        </div>
        <TechChoiceCard data={vcTechChoice} colors="text-red-500" />
      </section>

      <div className="border mx-20 border-gray-500 my-10" />

      <section>
        <SectionHeader
          number="04"
          title="트러블슈팅"
          description="실시간 시세 처리 과정에서 발생한 초기 로딩 지연, 렌더링 부하 및 외부 API 연동 문제를 분석하고 개선했습니다."

        />

        <div className="space-y-6 px-5 md:px-10 lg:px-20">
          {vcTroubleShooting.map((item, index) => (
            <TroubleshootingCard
              key={item.title}
              number={index + 1}
              theme="red"
              {...item}
            />
          ))}
        </div>

      </section>

    </div>
  )
}