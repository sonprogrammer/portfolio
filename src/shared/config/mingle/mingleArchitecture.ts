
import { ArchitectureItem } from "@/shared/model/types";
import {
  CloudSun,
  Database,
  RefreshCw,
  Split,
} from "lucide-react";

export const mingleArchitecture: ArchitectureItem[] = [
  {
    icon: Database,
    title: "React Query 기반 서버 데이터 관리",
    description:
      "조회 빈도가 높은 서버 데이터를 React Query를 통해 관리하고 캐싱해 불필요한 네트워크 요청을 줄였습니다.",
    points: [
      "플레이리스트 등 조회 데이터 서버 상태로 관리",
      "React Query 캐시를 통한 반복 요청 최소화",
      "데이터 변경 이후 필요한 상태를 UI에 동기화",
    ],
  },
  {
    icon: RefreshCw,
    title: "Recoil 기반 클라이언트 상태 관리",
    description:
      "서버에서 조회하는 데이터와 프론트엔드 내부에서 사용하는 상태를 구분해 관리했습니다.",
    points: [
      "Recoil을 이용한 클라이언트 상태 관리",
      "React Query 서버 상태와 클라이언트 상태 역할 분리",
      "상태 변경 결과를 사용자 화면에 반영",
    ],
  },
  {
    icon: Split,
    title: "API 성격에 따른 Axios 요청 분리",
    description:
      "내부 API와 외부 API의 인증 요구사항이 다른 점을 고려해 Axios 요청 구조를 분리했습니다.",
    points: [
      "내부 API 요청에 Authorization 인증 헤더 적용",
      "외부 API 요청에는 인증 헤더가 포함되지 않도록 분리",
      "API 성격에 따라 요청 책임을 명확하게 구성",
    ],
  },
  {
    icon: CloudSun,
    title: "OpenWeather API 기반 외부 데이터 연동",
    description:
      "외부 날씨 데이터를 서비스의 플레이리스트 데이터와 연결해 날씨에 따른 음악 큐레이션 기능을 구현했습니다.",
    points: [
      "OpenWeather API를 통한 날씨 데이터 조회",
      "날씨 데이터를 플레이리스트 조회 조건에 활용",
      "외부 API와 서비스 API 요청 흐름 분리",
    ],
  },
];