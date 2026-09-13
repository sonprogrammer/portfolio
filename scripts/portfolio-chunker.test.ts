import assert from 'node:assert/strict'
import test from 'node:test'

import { createPortfolioChunks } from './portfolio-chunker'

test('마크다운을 ## 제목 단위로 나눈다', () => {
  const markdown = `---
title: VC 프로젝트
category: project
project: virtual_coin
source_url: https://example.com/vc
---

# Virtual Coin

## 프로젝트 개요

모의 코인 투자 서비스입니다.

## 성능 최적화

REST 선조회와 WebSocket을 결합했습니다.

### 측정 결과

초기 로딩 속도가 개선됐습니다.
`

  const chunks = createPortfolioChunks(
    markdown,
    'projects/virtual-coin.md',
  )

  assert.equal(chunks.length, 2)
  assert.equal(chunks[0].heading, '프로젝트 개요')
  assert.equal(chunks[1].heading, '성능 최적화')
  assert.match(chunks[1].content, /### 측정 결과/)
  assert.equal(chunks[1].project, 'virtual_coin')
})