# 손영진 포트폴리오 RAG 원본 데이터

이 디렉터리는 손영진의 공개 포트폴리오 내용을 RAG(Retrieval-Augmented Generation)에 활용할 수 있도록 Markdown으로 정리한 원본 데이터입니다.

## 데이터 기준

- 기준 사이트: https://portfolio-kohl-xi-20.vercel.app/
- 수집일: 2026-09-13
- 사이트에 공개된 프로젝트 설명, 기술 선택 이유, 트러블슈팅, 학습 방식, 교육 및 자격 정보를 기준으로 작성했습니다.
- 애니메이션 숫자는 프로젝트 상세 페이지에서 확인한 최종 수치를 사용했습니다.
- 내비게이션 문구, 로딩 문구처럼 지원자 정보 검색에 도움이 되지 않는 UI 텍스트는 제외했습니다.

## 문서 구성

- `overview.md`: 지원자 핵심 소개와 프로젝트 요약
- `profile.md`: 학력, 교육, 자격, 자기계발
- `learning.md`: 학습 방식, 개발 과정, 엔지니어링 원칙
- `ai-workflow.md`: AI 활용 관점과 역할 기반 에이전트 실험
- `projects/mingle.md`: Mingle 팀 프로젝트
- `projects/bnty.md`: BNTY 개인 프로젝트
- `projects/virtual-coin.md`: Virtual Coin 개인 프로젝트
- `projects/fuelly.md`: Fuelly 개인 프로젝트
- `projects/mungpass.md`: MungPass 개인 프로젝트

## 청킹 권장 방식

각 파일의 `##` 제목을 기본 청크 경계로 사용합니다. 한 섹션이 길면 `###` 제목을 추가 경계로 사용하되, 문제·원인·해결·결과는 한 청크 안에 함께 유지하는 것을 권장합니다.

파일 경로로 기본 메타데이터를 추론할 수 있습니다.

- `projects/*.md` → `category: project`
- `learning.md` → `category: learning`
- `ai-workflow.md` → `category: ai_workflow`
- `profile.md` → `category: profile`
- `overview.md` → `category: overview`

## 답변 생성 원칙

- 문서에 있는 사실만 바탕으로 답합니다.
- 수치가 필요하면 해당 프로젝트의 측정 조건과 함께 설명합니다.
- 질문과 관련된 프로젝트 또는 문서 출처를 답변에 표시합니다.
- 문서에 근거가 없으면 추측하지 않고 포트폴리오에서 확인되지 않는다고 답합니다.

