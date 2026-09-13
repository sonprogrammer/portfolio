---
title: Fuelly 프로젝트
category: project
project: fuelly
source_url: https://portfolio-kohl-xi-20.vercel.app/fuelly
---

# Fuelly

## 프로젝트 개요

- 기간: 2025.12 ~ 2026.01
- 유형: 개인 프로젝트
- 설명: AI 기반 식단 추천과 영양 기록, 인증 흐름을 구현한 개인 맞춤 영양 관리 서비스입니다.

## 프로젝트를 시작한 이유

식단을 관리하면서 먹은 음식과 섭취량을 계속 기억하고 하루 목표량에서 얼마나 남았는지 직접 계산해야 하는 불편을 줄이기 위해 프로젝트를 시작했습니다.

## 포트폴리오 기능 체험 환경

- 식단 기록, 남은 영양 정보 확인, AI 기반 식단 추천을 체험할 수 있습니다.
- 별도의 회원가입 없이 HttpOnly Cookie에 저장한 세션 식별자를 기반으로 데모 사용자를 구분합니다.
- 이 체험용 인증 방식은 실제 프로젝트의 인증 방식과 다릅니다.

## 서비스 아키텍처와 데이터 흐름

사용자 요청부터 Next.js Route Handler, Groq AI, MongoDB로 이어지는 데이터 흐름을 구성했습니다.

### AI 기반 영양 정보 처리

AI 응답의 형식 편차로 발생하는 파싱 오류를 줄이기 위해 응답 형식을 구조화하고 서버에서 데이터를 가공했습니다.

- Groq AI API를 이용한 영양 정보 생성
- JSON Object 응답 형식으로 응답 구조 통일
- 서버에서 AI 응답을 파싱해 구조화된 영양 정보로 반환

### jose 기반 JWT 인증

Next.js Middleware에서도 인증 토큰을 검증할 수 있도록 jose를 사용하고 Access Token과 Refresh Token의 역할과 저장 위치를 분리했습니다.

- jose를 이용한 JWT 생성과 검증
- Access Token을 브라우저 영구 저장소가 아닌 메모리에서 관리
- Refresh Token을 HttpOnly Cookie로 관리
- Next.js Middleware에서 토큰을 검증해 보호 라우트 접근 제어

### 서버 상태와 UI 로직의 책임 분리

서버에서 조회되는 데이터와 클라이언트 전역 상태의 책임을 TanStack Query와 Zustand로 분리했습니다. 반복되는 데이터 처리 로직은 Custom Hook으로 구성했습니다.

- TanStack Query 기반 Custom Hook으로 서버 데이터 조회·변경 및 캐싱 관리
- Zustand를 이용한 클라이언트 전역 상태 관리
- 반복되는 상태와 비즈니스 로직을 Custom Hook으로 분리
- 컴포넌트의 UI 책임과 데이터 처리 책임 구분

### Axios Interceptor 기반 토큰 재발급

Access Token 만료 시 Refresh Token을 이용해 토큰을 재발급하고 여러 요청이 동시에 실패하는 상황을 Queue로 제어했습니다.

- Axios Interceptor를 이용한 인증 요청 처리
- Access Token 만료 시 Refresh Token 기반 재발급
- 토큰 재발급 로직을 공통 인증 흐름으로 통합
- Queue를 이용한 동시 재발급 요청 제어

### MongoDB 기반 서비스 데이터 관리

- MongoDB를 이용한 사용자와 식단 데이터 저장
- 서버를 통한 사용자와 식단 데이터 조회 및 변경
- 클라이언트와 서버 간 식단·영양 데이터 동기화

## 사용 기술

### Frontend

Next.js, React, TypeScript, Tailwind CSS, Recharts

### State and Data

TanStack Query, Zustand, Custom Hook, Axios

### Backend and Auth

Route Handler, MongoDB, jose, JWT, HttpOnly Cookie

### AI

Groq API, Llama 3.3, JSON Object

## 기술 선택 배경

- Next.js는 프론트엔드 화면과 Route Handler 기반 서버 API를 한 프로젝트에서 구성할 수 있어 별도 백엔드 서버 없이 인증, 식단, AI API를 통합하기 위해 선택했습니다.
- TanStack Query는 식단 기록과 영양 정보처럼 서버에서 관리되는 데이터의 조회와 캐시를 담당합니다.
- Zustand는 전역 UI와 클라이언트 상태를 관리하도록 책임을 분리했습니다.
- 서버 데이터 조회·변경과 반복되는 비즈니스 로직은 Custom Hook으로 분리해 컴포넌트가 UI 표현에 집중하도록 했습니다.
- MongoDB는 사용자별 식단 기록과 영양 데이터를 문서 형태로 유연하게 저장하고 JavaScript 기반 개발 환경과 자연스럽게 연결할 수 있어 선택했습니다.
- JWT를 HttpOnly Cookie에 저장해 클라이언트 JavaScript의 직접 접근을 제한했습니다.
- Next.js의 다양한 서버 런타임과 호환되고 공식 인증 가이드에서도 사용되는 jose를 JWT 생성과 검증 라이브러리로 선택했습니다.
- Groq API는 개발 당시 무료로 사용할 수 있어 비용 부담 없이 AI 영양 추천 기능을 구현하기 위해 선택했습니다.
- AI 응답을 JSON Object 형태로 제한해 일관된 데이터 구조로 처리했습니다.

## 트러블슈팅: AI 응답 형식 편차로 인한 파싱 오류

### 문제

AI가 반환하는 응답 형식이 일정하지 않아 영양 정보를 파싱하는 과정에서 오류가 발생할 수 있었습니다.

### 원인

자연어 기반 AI 응답은 동일한 요청에서도 데이터의 형식이나 구조가 달라질 수 있어 클라이언트에서 안정적으로 처리하기 어려웠습니다.

### 해결

Groq의 JSON Object 응답 형식을 적용하고 서버에서 AI 응답을 파싱해 필요한 영양 정보 구조로 변환한 뒤 클라이언트에 반환했습니다.

### 결과

- AI 응답 형식 편차로 인한 파싱 오류 가능성 감소
- 클라이언트에서 일관된 형태의 영양 데이터 처리

## 트러블슈팅: AI 응답 지연에 따른 사용자 대기 경험

### 문제

AI 식단 분석과 추천 과정에서 약 2~3초의 응답 대기 시간이 발생했습니다.

### 원인

AI 모델의 추론이 완료된 이후 결과를 받을 수 있어 일반적인 API 요청보다 응답 시간이 길었습니다.

### 해결

AI 요청 상태에 따라 Skeleton UI와 로딩 인터랙션을 표시해 사용자가 현재 처리 상태를 인지하도록 구성했습니다.

### 결과

- AI 처리 중 사용자에게 명확한 진행 상태 제공
- 2~3초의 AI 응답 대기 시간에 대한 체감 UX 개선

## 트러블슈팅: 동시 요청 환경에서 토큰 재발급 중복

### 문제

Access Token이 만료된 상태에서 여러 API 요청이 동시에 발생하면 각각의 요청에서 토큰 재발급 로직이 실행됐습니다.

### 원인

인증 재발급 흐름이 각 요청 단위로 처리되면서 같은 시점에 여러 Refresh 요청이 중복으로 발생할 수 있었습니다.

### 해결

Axios Instance와 Interceptor에 Access Token 주입과 토큰 재발급 로직을 통합했습니다. 재발급 중에는 이후 요청을 Queue에서 대기시키고 새 Access Token 발급이 완료되면 대기 중인 요청을 새 토큰으로 재시도하도록 구성했습니다.

### 결과

- 17개 API 훅의 인증 및 토큰 재발급 로직 공통화
- 동시 요청 환경에서 중복 Refresh 요청 방지
- 재발급 완료 후 대기 요청을 새 Access Token으로 일괄 재시도
