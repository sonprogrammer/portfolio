---
title: 손영진 포트폴리오 개요
category: overview
source_url: https://portfolio-kohl-xi-20.vercel.app/
---

# 손영진 포트폴리오 개요

## 한 줄 소개

손영진은 복잡한 데이터 흐름을 구조와 사용자 경험으로 연결하는 프론트엔드 개발자입니다.

O2O, 실시간 데이터, AI, 인증처럼 서로 다른 문제를 직접 구현하며 서비스 구조와 상태 흐름을 설계하고 성능과 사용자 경험을 개선해왔습니다.

## 핵심 성과

- MungPass: AI 분석 재조회 시간을 약 97% 단축했습니다.
- Fuelly: 17개 API 훅에 흩어져 있던 인증 및 토큰 재발급 로직을 공통화했습니다.
- Virtual Coin: 첫 화면 시세 로딩을 4.68초에서 0.9초로 줄여 약 81% 단축했습니다.
- BNTY: Lighthouse 5회 측정 기준 LCP를 8.0초에서 1.1초로 줄여 약 86% 개선했습니다.

## AI에 대한 관점

AI를 개발자의 대체재가 아니라 설계와 구현 역량을 확장하는 도구로 활용합니다. 변화하는 AI 시대를 위협으로 보기보다 새로운 도구를 빠르게 학습하고 기존 역량과 결합해 더 나은 결과를 만드는 기회로 바라봅니다.

## 프로젝트 요약

### MungPass

- 기간: 2026.01 ~ 2026.05
- 유형: 개인 프로젝트, 대표 프로젝트
- 설명: 회원·사장님·관리자를 연결하는 애견카페 O2O·B2B 운영 플랫폼입니다.
- 구현 범위: QR 체크인, 실시간 이용 현황, 매출 관리, 관리자 운영 환경, AI 매출 분석을 하나의 서비스 흐름으로 구현했습니다.
- 핵심 기술: Next.js, Supabase, FSD, Supabase Realtime, Refine
- 핵심 결과: AI 분석 재조회 시간 약 97% 단축, 동일 날짜의 AI API 호출 약 67% 절감

### Fuelly

- 기간: 2025.12 ~ 2026.01
- 유형: 개인 프로젝트
- 설명: AI 기반 개인 맞춤 영양 관리 서비스입니다.
- 구현 범위: AI 응답 정형화, JWT 인증, Access/Refresh Token 분리, Axios 기반 토큰 재발급 Queue를 구현했습니다.
- 핵심 기술: Next.js, Groq, jose, TanStack Query
- 핵심 결과: 17개 API 훅의 인증 로직 공통화

### Virtual Coin

- 기간: 2025.03 ~ 2025.04
- 유형: 개인 프로젝트
- 설명: Upbit API 기반 실시간 모의 코인 투자 서비스입니다.
- 구현 범위: REST와 WebSocket을 결합해 초기 시세 로딩과 실시간 데이터 동기화의 책임을 분리했습니다.
- 핵심 기술: React, WebSocket, Recoil, TanStack Query
- 핵심 결과: 초기 시세 로딩 4.68초에서 0.9초로 단축

### BNTY

- 기간: 2024.09 ~ 2024.10
- 유형: 개인 프로젝트
- 설명: 트레이너와 회원을 연결하는 PT 관리 서비스입니다.
- 구현 범위: QR 기반 출석과 PT 관리, Socket.IO 1:1 채팅, 한글 IME 중복 전송 대응을 구현했습니다.
- 핵심 기술: React, Socket.IO, MongoDB, TanStack Query
- 핵심 결과: LCP 8.0초에서 1.1초로 개선

### Mingle

- 기간: 2023.11 ~ 2023.11
- 유형: 5인 팀 프로젝트
- 설명: 음악을 중심으로 사용자와 플레이리스트를 연결하는 서비스입니다.
- 역할: 프론트엔드 개발자로 참여했습니다.
- 구현 범위: TanStack Query 기반 서버 데이터 관리, Recoil 상태 관리, 외부 API 연동을 경험했습니다.
- 핵심 기술: React, TypeScript, TanStack Query, Recoil
- 핵심 결과: 공통 Axios 인증 헤더로 발생한 OpenWeather API의 CORS 및 Preflight 문제를 해결했습니다.

