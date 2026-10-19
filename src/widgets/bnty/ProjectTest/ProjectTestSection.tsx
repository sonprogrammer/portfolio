import { BntyNav } from "@/features/bnty/nav/ui";
import { RoleSelection } from "@/features/bnty/role/ui/RoleSelection";
import { SocketProvider } from "@/shared/providers/SocketProvider";
import { FunctionReveal } from "@/shared/ui/Function-reveal";
import { ProjectHero, SectionHeader } from "@/shared/ui/project-section-ui";
import { BntyPages } from "@/widgets/bnty/EachPage/ui";

export function ProjectTestSection() {

    return (
        <SocketProvider>

            <>
                <ProjectHero
                    name="BNTY"
                    projectType="Personal Project"
                    description="트레이너와 회원을 연결해 QR 출석, PT 관리와 실시간 소통을 지원하는 PT 관리 서비스"
                    logoSrc="/bnty.svg"
                    githubUrl="https://github.com/sonprogrammer/BNTYpt"
                    deployUrl="https://bnty.netlify.app/"
                    period="2024.09 ~ 2024.10"
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
                            *포트폴리오 기능 체험에서는 별도의 회원가입 없이 HttpOnly 쿠키에 저장한 세션 식별자를
                            기반으로 데모 사용자를 구분합니다. 실제 프로젝트의 인증 방식과는 차이가 있습니다.
                        </p>
                        <p className="mt-3 text-center text-xs leading-5 text-white/40">
                            * 1:1 채팅 기능은 무료 실시간 서버의 월 사용량 한도에 따라 일시적으로 이용이 제한될 수 있습니다. 죄송합니다
                        </p>
                    </div>
                </section>
            </>
        </SocketProvider>
    )
}