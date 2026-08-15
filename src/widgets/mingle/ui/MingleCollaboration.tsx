import {
  Code2,
  GitCommitHorizontal,
  MessagesSquare,
  UsersRound,
} from "lucide-react";

const collaborationItems = [
  {
    icon: MessagesSquare,
    title: "Daily Scrum",
    description:
      "매일 아침 데일리 스크럼을 진행하며 각자의 진행 상황과 당일 작업 계획, 연동이 필요한 이슈를 공유했습니다.",
  },
  {
    icon: UsersRound,
    title: "API Sync",
    description:
      "백엔드 팀원과 API 명세 및 요청·응답 데이터 변경사항을 지속적으로 공유하며 프론트엔드 연동 범위를 조율했습니다.",
  },
  {
    icon: GitCommitHorizontal,
    title: "Development Convention",
    description:
      "프로젝트 시작 전 코딩 컨벤션과 Git 커밋 메시지 규칙을 통일해 팀 내 코드 작성 기준을 맞췄습니다.",
  },
  {
    icon: Code2,
    title: "Code Review",
    description:
      "부트캠프 멘토를 통해 코드 리뷰를 진행하고 구현 방식과 코드 구조에 대한 피드백을 프로젝트에 반영했습니다.",
  },
];

export function MingleCollaboration() {
  return (
    <div className="px-4 sm:px-5 md:px-20 lg:px-10">
      <div className="overflow-hidden rounded-4xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-md sm:rounded-[2.5rem]">


        <div className="grid gap-px bg-zinc-800/80 grid-cols-3">
          <div className="bg-zinc-950/40 p-5 backdrop-blur-md sm:p-6 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
              TEAM
            </p>

            <strong className="mt-3 block text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              5명
            </strong>

            <p className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">
              최종 팀 구성
            </p>
          </div>

          <div className="bg-zinc-950/40 p-5 backdrop-blur-md sm:p-6 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-400">
              FRONTEND
            </p>

            <strong className="mt-3 block text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              3명
            </strong>

            <p className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">
              본인 포함
            </p>
          </div>

          <div className="bg-zinc-950/40 p-5 backdrop-blur-md sm:p-6 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
              BACKEND
            </p>

            <strong className="mt-3 block text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              2명
            </strong>

            <p className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm">
              API 및 서버 개발
            </p>
          </div>
        </div>


        <div className="grid gap-4 border-t border-zinc-800/80 p-5 sm:p-6 md:grid-cols-2 lg:p-8">
          {collaborationItems.map(item => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-5 backdrop-blur-md transition-colors hover:border-zinc-700 sm:p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-inner sm:size-11">
                  <Icon size={18} />
                </div>

                <h3 className="mt-4 text-base font-extrabold tracking-tight text-white sm:mt-5">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs font-medium leading-6 text-zinc-300 sm:text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>


        <div className="border-t border-zinc-800/80 bg-zinc-950/40 px-5 py-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium leading-6 text-zinc-400 sm:text-sm">
            프로젝트는 초기 6인으로 시작했으며 진행 중 팀 구성 변경 이후
            최종 5인이 개발을 이어가며 프로젝트를 완료했습니다.
          </p>
        </div>
      </div>
    </div>
  );
}