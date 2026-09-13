---
title: MungPass 프로젝트
category: project
project: mungpass
source_url: https://portfolio-kohl-xi-20.vercel.app/mungpass
---

# MungPass

## 프로젝트 개요

- 기간: 2026.01 ~ 2026.05
- 유형: 개인 프로젝트, 대표 프로젝트
- 설명: 회원·사장님·관리자를 연결하는 애견카페 O2O·B2B 운영 플랫폼입니다.

## 프로젝트를 시작한 이유

애견카페를 운영하는 지인이 수기 관리와 고객 이용 시간 관리에서 겪는 불편을 듣고, 오프라인에서 이루어지던 이용 과정을 디지털화하기 위해 프로젝트를 시작했습니다.

## 포트폴리오 기능 체험 환경

- 일반 사용자, 사장님, 관리자 역할을 전환하며 역할별 주요 기능과 서비스 흐름을 체험할 수 있습니다.
- 별도의 회원가입 없이 사용할 수 있도록 Supabase Anonymous Sign-Ins를 적용했습니다.

## 서비스 아키텍처와 데이터 흐름

Next.js와 Supabase를 중심으로 Auth, PostgreSQL, RLS, Realtime, Gemini API가 연결되는 서비스 구조를 설계했습니다.

### QR 기반 O2O 서비스 데이터 흐름

QR 체크인으로 생성된 오프라인 이용 데이터를 온라인 서비스와 연결하고 실시간 운영 화면까지 이어지도록 구성했습니다.

- 키오스크의 QR 체크인으로 시설 이용 데이터 생성
- 이용 기록을 Supabase에 저장
- Supabase Realtime으로 사장님과 회원 화면에 이용 현황을 즉시 반영

### FSD 기반 프론트엔드 아키텍처

증가하는 코드 복잡도를 관리하기 위해 FSD(Feature-Sliced Design)를 적용해 기능과 책임을 레이어별로 분리했습니다.

- 비즈니스 기능 단위로 모듈과 Slice 분리
- 레이어 간 단방향 의존성 구조 적용
- 반복되는 상태와 비즈니스 로직을 Custom Hook으로 분리
- TanStack Query 기반 Custom Hook으로 서버 데이터 조회·변경 로직 관리

### 역할 기반 인증과 접근 제어

Supabase Auth로 사용자를 식별하고 역할에 따라 접근 가능한 데이터와 기능을 분리했습니다.

- Supabase Auth 기반 로그인 및 사용자 식별
- 인증 사용자 정보를 서비스 데이터와 연결
- RLS를 이용한 데이터 접근 권한 제어

### Supabase 데이터 관리와 실시간 동기화

관계형 데이터는 PostgreSQL 기반 Supabase에서 관리하고 즉시 반영이 필요한 데이터에는 Realtime을 적용했습니다.

- 사용자, 반려견, 매장, 상품, 이용 기록 관계형 데이터 관리
- 문의방과 메시지를 연결한 1:1 문의 구조 구성
- Realtime 이벤트와 TanStack Query 캐시 동기화

## 핵심 구현: O2O 이용 흐름

회원의 매장 탐색부터 QR 입장, 이용 기록, 매장 운영까지 이어지는 사용자 흐름을 설계했습니다.

- 애견카페 검색과 상세 정보 조회
- 회원과 반려견 정보를 기반으로 한 QR 입장 처리
- 체크인 결과를 이용 기록 데이터에 연결
- Supabase Realtime으로 사장님 화면의 현재 이용 현황을 새로고침 없이 반영

## 핵심 구현: B2B 운영 대시보드

사장님이 매장 상품, 이용 고객, 예상·확정 매출, 월별 통계를 한 화면에서 확인할 수 있는 관리 환경을 구현했습니다.

- 카테고리별 상품 등록 및 관리
- 현재 이용 중인 회원과 반려견 현황 제공
- 예상 매출, 확정 매출, 월별 매출 데이터 제공
- Recharts를 활용한 매출 통계 시각화
- Gemini AI API를 통한 매출 분석

## 핵심 구현: 운영 관리와 데이터 자동화

관리자 기능과 서비스 운영 과정에서 반복되는 데이터 처리를 자동화하고 역할별 접근 범위를 분리했습니다.

- Refine 기반 매장 입점 승인·반려 및 회원 데이터 관리
- 회원가입 시 사용자 프로필 자동 생성
- 매장 심사 상태 변경에 따른 관련 데이터 처리
- RLS를 통한 회원·사장·관리자별 데이터 접근 제어

## 핵심 구현: 서버 상태와 로직 분리

반복되는 로직과 서버 상태 처리를 Custom Hook으로 분리해 컴포넌트가 UI 표현에 집중하도록 구조화했습니다.

- 여러 컴포넌트에서 반복되는 상태 및 비즈니스 로직을 Custom Hook으로 분리
- TanStack Query 기반 Custom Hook으로 데이터 조회·변경 로직 관리
- 서버 상태와 컴포넌트 UI 로직의 책임 분리
- 공통 로직 재사용으로 컴포넌트별 중복 코드 최소화

## 사용 기술

### Frontend

Next.js, React, TypeScript, Tailwind CSS, Refine, Ant Design

### State and Data

TanStack Query, Zustand, Custom Hook

### Backend and Database

Supabase, Supabase Auth, PostgreSQL, RLS, PostgreSQL Trigger, Route Handler, Server Action

### Service, Realtime, AI

Supabase Realtime, Kakao Maps API, qrcode.react, Recharts, Gemini API

## 기술 선택 배경

- 실제 서비스로의 확장 가능성을 고려해 데이터 구조, 상태 관리, 권한 처리, 유지보수성을 함께 고려했습니다.
- Supabase는 별도의 백엔드 서버를 처음부터 구축하지 않고 Database, Auth, Storage 등을 사용할 수 있는 BaaS라는 점에 관심을 가져 도입했습니다. 서비스 기능 구현에 집중하면서 백엔드 데이터 흐름까지 직접 경험하려는 목적도 있었습니다.
- 기존에는 MongoDB 기반 프로젝트를 주로 개발했기 때문에 PostgreSQL 기반 Supabase를 선택해 관계형 데이터 모델링과 SQL까지 경험 범위를 넓혔습니다.
- 회원, 사장님, 관리자처럼 역할별 데이터 접근 범위가 달라 Supabase Auth와 RLS를 함께 사용해 인증뿐 아니라 데이터베이스 계층에서도 접근 권한을 제어했습니다.
- 매장 이용 현황처럼 변경을 즉시 반영해야 하는 기능은 별도 WebSocket 서버보다 기존 Supabase 환경과 자연스럽게 연결되는 Supabase Realtime을 사용했습니다.
- TanStack Query는 매장, 상품, 이용 내역처럼 서버에서 관리되는 데이터의 요청과 캐시를 담당합니다.
- Zustand는 역할 선택이나 UI와 관련된 클라이언트 상태를 관리하도록 책임을 분리했습니다.
- 서버 데이터 조회·변경 로직은 TanStack Query 기반 Custom Hook으로 구성해 컴포넌트가 UI 표현에 집중하도록 했습니다.

## 트러블슈팅: AI 매출 분석 중복 호출과 응답 시간

### 문제

사장님이 같은 날 매출 현황을 확인할 때마다 Gemini API를 호출하면 동일한 분석이 반복 생성되고 불필요한 응답 대기 시간과 API 비용이 발생했습니다.

### 원인

매출 분석 결과를 조회할 때마다 새롭게 생성하는 구조여서 동일 날짜의 반복 조회도 별도의 AI API 요청으로 처리됐습니다.

### 해결

AI 매출 분석 결과를 DB에 저장하고 같은 날짜에는 저장된 결과를 재사용하도록 구성해 Gemini API가 하루에 한 번만 호출되도록 제한했습니다.

### 결과

- Chrome DevTools Network 탭 5회 측정 기준 신규 AI 분석 평균 10.16초에서 DB 조회 평균 0.27초로 단축
- 반복 조회 응답 시간 약 97% 단축
- 동일 날짜의 중복 AI 분석 요청 방지
- AI API 호출 약 67% 절감

## 트러블슈팅: 재사용 컴포넌트의 캐시 잔상과 렌더링 타이밍

### 문제

지도 API와 BottomSheet 컴포넌트를 여러 페이지에서 재사용할 때 이전 매장의 데이터가 잠시 남거나 새 데이터와 UI 렌더링 시점이 일치하지 않았습니다.

### 원인

상위 데이터의 ID만 변경되고 컴포넌트가 언마운트되지 않으면서 내부 Hook과 로컬 상태가 이전 데이터 기준으로 유지됐습니다.

### 해결

컴포넌트에 매장 ID 기반의 고유한 `key`를 부여해 대상이 변경될 때 컴포넌트와 내부 Hook이 새롭게 초기화되도록 구성했습니다.

### 결과

- 이전 매장 데이터가 남는 캐시 잔상 제거
- 지도와 BottomSheet 데이터 정합성 확보
- 매장 변경 시 내부 상태를 새 데이터 기준으로 초기화

## 트러블슈팅: Next.js 사전 렌더링과 Hydration 오류

### 문제

Vercel 빌드 과정에서 `useSearchParams` 관련 사전 렌더링 오류가 발생했습니다. 새로고침 직후에는 Zustand Persist 데이터가 복구되기 전에 UI가 렌더링돼 사용자 정보가 비어 보였습니다.

### 원인

`useSearchParams`는 런타임에 의존하는 클라이언트 Hook이므로 정적 렌더링 과정에서 CSR Bailout을 발생시켰습니다. 서버에서는 `localStorage`에 접근할 수 없어 서버 렌더링 시점과 클라이언트 Rehydration 완료 시점 사이에도 차이가 있었습니다.

### 해결

쿼리 스트링을 사용하는 로직을 별도 클라이언트 컴포넌트로 분리하고 상위에서 Suspense로 감쌌습니다. Zustand Persist에는 `onRehydrateStorage`를 적용해 저장소 복구 완료 여부를 관리하고 Hydration 완료 이후에만 관련 UI를 렌더링했습니다.

### 결과

- `useSearchParams`로 인한 Vercel 빌드 오류 해결
- CSR 전환이 필요한 컴포넌트 경계 명확화
- 새로고침 직후 사용자 데이터 깜빡임 방지
- 서버와 클라이언트 초기 상태 불일치 해결

## 트러블슈팅: Refine QueryClient 분리로 인한 캐시 불일치

### 문제

매장 검색 요청은 정상 실행됐지만 TanStack Query Devtools에 쿼리가 표시되지 않거나 특정 상황에서 캐시 데이터와 실제 화면 상태가 일치하지 않았습니다.

### 원인

Refine 내부에서 별도의 QueryClient가 사용되면서 애플리케이션 최상단 Provider의 QueryClient와 캐시 저장소가 분리됐습니다. 데이터 Hook과 Devtools가 서로 다른 캐시 인스턴스를 참조했습니다.

### 해결

애플리케이션 최상단에서 생성한 QueryClient 인스턴스를 Refine 설정에도 명시적으로 주입해 모든 데이터 Hook과 Devtools가 하나의 캐시 저장소를 공유하도록 수정했습니다.

### 결과

- TanStack Query 캐시 저장소 단일화
- 데이터 Hook과 Devtools의 조회 상태 일치
- 매장 검색 결과와 UI 상태의 정합성 확보
