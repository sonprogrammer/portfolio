import assert from 'node:assert/strict'
import test from 'node:test'

import { createSocketConnectionLease } from './socketConnectionLease'

test('첫 소비자에서 연결하고 마지막 소비자가 해제될 때만 연결을 종료한다', () => {
  let connectCount = 0
  let disconnectCount = 0

  const lease = createSocketConnectionLease({
    connect: () => {
      connectCount += 1
    },
    disconnect: () => {
      disconnectCount += 1
    },
  })

  const releaseFirst = lease.acquire()
  const releaseSecond = lease.acquire()

  assert.equal(connectCount, 1)
  assert.equal(lease.getConsumerCount(), 2)

  releaseFirst()

  assert.equal(disconnectCount, 0)
  assert.equal(lease.getConsumerCount(), 1)

  releaseSecond()

  assert.equal(disconnectCount, 1)
  assert.equal(lease.getConsumerCount(), 0)
})

test('같은 소비자의 해제 함수를 여러 번 호출해도 연결 수를 중복 차감하지 않는다', () => {
  let disconnectCount = 0

  const lease = createSocketConnectionLease({
    connect: () => undefined,
    disconnect: () => {
      disconnectCount += 1
    },
  })

  const release = lease.acquire()

  release()
  release()

  assert.equal(disconnectCount, 1)
  assert.equal(lease.getConsumerCount(), 0)
})
