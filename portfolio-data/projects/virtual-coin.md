---
title: Virtual Coin 프로젝트
category: project
project: virtual_coin
source_url: https://portfolio-kohl-xi-20.vercel.app/vc
---

# Virtual Coin

## 프로젝트 개요

- 약칭: VC
- 기간: 2025.03 ~ 2025.04
- 유형: 개인 프로젝트
- 설명: Upbit API를 기반으로 실시간 시세와 모의 투자 기능을 구현한 코인 투자 서비스입니다.

## 프로젝트를 시작한 이유

코인 투자를 공부하려면 실제 자금이 필요하지만, 충분한 자금 없이도 시세 흐름과 투자 과정을 경험할 방법이 필요하다고 생각했습니다. 실제 돈 없이 투자 과정을 연습할 수 있도록 모의 코인 투자 서비스를 만들었습니다.

## 포트폴리오 기능 체험 환경

- 실시간 코인 시세를 기반으로 매수·매도와 포트폴리오 변화를 체험할 수 있습니다.
- 별도의 회원가입 없이 HttpOnly Cookie에 저장한 세션 식별자를 기반으로 데모 사용자를 구분합니다.
- 이 체험용 인증 방식은 실제 프로젝트의 인증 방식과 다릅니다.
- 실시간 시세 데이터는 별도 중계 서버를 통해 제공되며 무료 호스팅의 월 사용량 한도에 따라 일시적으로 제한될 수 있습니다.

## 서비스 아키텍처와 데이터 흐름

Upbit API에서 전달되는 시세 데이터가 서버를 거쳐 클라이언트와 차트에 반영되는 흐름으로 구성했습니다.

### REST와 WebSocket 하이브리드 시세 수신

초기 시세는 Upbit REST API로 먼저 불러오고 이후 WebSocket 연결을 통해 실시간 데이터로 전환합니다.

- REST API를 이용한 초기 시세 데이터 조회
- Upbit WebSocket을 통한 실시간 시세 수신
- 초기 데이터 로딩과 실시간 업데이트의 역할 분리

### Node.js와 Express 기반 중계 서버

클라이언트에서 Upbit API를 직접 호출하지 않고 Node.js 서버를 중간 계층으로 두어 외부 API 요청을 관리했습니다.

- Node.js와 Express 기반 REST API 서버 구성
- Upbit API 요청을 서버에서 중계
- CORS와 Upbit API 요청 제한 문제를 중계 서버를 통해 해결

### 실시간 시세 데이터 시각화

수신한 코인 데이터를 React 화면에 연결하고 Lightweight Charts로 시세 변화를 시각화했습니다.

- 실시간 수신 데이터를 React UI에 반영
- Lightweight Charts 기반 캔들 차트 구현
- 시세 변경에 따른 차트 데이터 업데이트

### 서버 상태와 UI 로직의 책임 분리

서버 데이터와 클라이언트 상태의 책임을 TanStack Query와 Recoil로 분리했습니다. 반복되는 데이터 처리 로직은 Custom Hook으로 구성했습니다.

- TanStack Query를 이용한 서버 데이터 조회 및 캐싱
- 서버 데이터 조회·변경 및 반복되는 데이터 처리 로직을 Custom Hook으로 분리
- Recoil을 이용한 클라이언트 전역 상태 관리
- Axios를 통한 REST API 요청 처리

### MongoDB 기반 데이터 및 인증 관리

- MongoDB 기반 서비스 데이터 저장
- Node.js 서버에서 데이터 조회 및 변경 처리
- jsonwebtoken을 이용한 인증 토큰 생성과 검증

## 사용 기술

### Frontend

React, TypeScript, Tailwind CSS, styled-components, twin.macro, Lightweight Charts

### State and Data

TanStack Query, Recoil, Custom Hook, Axios

### Backend

Node.js, Express, MongoDB, jsonwebtoken

### Realtime

Upbit WebSocket, ws

## 기술 선택 배경

- React와 TypeScript를 기반으로 실시간으로 변하는 시세, 주문, 자산 데이터를 컴포넌트와 타입 단위로 관리했습니다.
- TanStack Query는 주문 내역, 랭킹, 사용자 정보처럼 서버에서 조회하는 데이터의 요청 상태와 캐시를 관리합니다.
- Recoil은 선택된 마켓이나 사용자 인터랙션과 같은 클라이언트 상태를 분리해 관리하기 위해 사용했습니다.
- TradingView가 제공하는 오픈소스 차트 라이브러리로 실제 거래 서비스와 유사한 캔들 차트를 구현하기 적합하다고 판단해 Lightweight Charts를 선택했습니다.
- Node.js와 Express는 Upbit API와 프론트엔드 사이에서 데이터를 중계하고 주문과 사용자 관련 REST API를 함께 처리하기 위해 선택했습니다.
- MongoDB는 사용자, 주문, 자산 등 모의투자 데이터를 저장하고 Node.js 기반 서버와 같은 JavaScript 생태계에서 빠르게 개발하기 위해 선택했습니다.
- jsonwebtoken은 로그인 후 발급되는 JWT를 생성하고 검증해 사용자 인증 상태를 서버에서 확인하기 위해 사용했습니다.
- Upbit가 표준 WebSocket API로 실시간 시세를 제공하므로 서버 수신에 ws를 사용했습니다. 클라이언트 중계에도 Room 관리 같은 Socket.IO 추가 기능이 필요하지 않아 동일하게 WebSocket을 사용했습니다.

## 트러블슈팅: WebSocket 단독 수신으로 인한 초기 시세 로딩 지연

### 문제

초기 시세 데이터를 WebSocket으로만 수신하면서 첫 화면의 코인 시세가 모두 표시되기까지 평균 약 4.68초가 소요됐습니다.

### 원인

초기 화면 렌더링이 WebSocket 연결과 첫 데이터 수신 시점에 의존해 실시간 연결이 완료될 때까지 시세 표시가 지연됐습니다.

### 해결

초기 시세는 REST API로 먼저 조회해 렌더링하고 이후 WebSocket을 백그라운드에서 연결해 실시간 데이터로 동기화하는 하이브리드 방식으로 변경했습니다.

### 결과

- Production 환경 5회 측정 기준 첫 화면 시세 로딩 4.68초에서 0.9초로 약 81% 단축
- 초기 데이터 표시와 실시간 시세 동기화의 역할 분리

## 트러블슈팅: 실시간 시세 수신으로 인한 과도한 상태 업데이트

### 문제

Upbit WebSocket에서 실시간 시세 데이터가 지속적으로 전달되면서 상태 업데이트가 빈번하게 발생했습니다.

### 원인

수신되는 WebSocket 데이터를 그대로 상태에 반영하면서 짧은 시간 동안 많은 업데이트가 발생했습니다.

### 해결

lodash의 throttle을 적용해 실시간 데이터 처리 주기를 제어하고 상태 업데이트 빈도를 제한했습니다.

### 결과

- 과도한 상태 업데이트 방지
- 실시간 데이터 업데이트 주기 제어

## 트러블슈팅: Upbit API CORS와 요청 제한

### 문제

브라우저에서 Upbit API를 직접 호출하는 과정에서 CORS 오류와 `429 Too Many Requests`가 발생했습니다.

### 원인

브라우저 요청에 Origin 헤더가 포함되면서 Upbit의 Origin 기반 요청 제한이 적용됐고 REST API와 WebSocket 모두 10초당 1회의 제한을 받았습니다.

### 해결

브라우저에서 직접 요청하는 방식 대신 Node.js 백엔드에 중계 서버를 구축해 Upbit REST API와 WebSocket 연결을 서버에서 처리하도록 변경했습니다.

### 결과

- Upbit API 요청 구조를 서버 중계 방식으로 개선
- 브라우저의 CORS 제약 해결
- Origin 기반 요청 제한 문제 해결

