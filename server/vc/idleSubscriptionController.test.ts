import assert from 'node:assert/strict'
import test from 'node:test'

import { createIdleSubscriptionController } from './idleSubscriptionController'

test('첫 구독자에서 시작하고 마지막 구독자 이탈 후 유예 시간이 지나면 중지한다', () => {
  let startCount = 0
  let stopCount = 0
  let scheduledCallback: (() => void) | null = null

  const controller = createIdleSubscriptionController({
    idleDelayMs: 30_000,
    start: () => {
      startCount += 1
    },
    stop: () => {
      stopCount += 1
    },
    schedule: callback => {
      scheduledCallback = callback
      return 1
    },
    cancel: () => {
      scheduledCallback = null
    },
  })

  controller.addSubscriber()
  controller.addSubscriber()

  assert.equal(startCount, 1)
  assert.equal(controller.getSubscriberCount(), 2)

  controller.removeSubscriber()
  assert.equal(scheduledCallback, null)

  controller.removeSubscriber()
  assert.notEqual(scheduledCallback, null)

  const runScheduledStop = scheduledCallback as unknown as () => void
  runScheduledStop()

  assert.equal(stopCount, 1)
  assert.equal(controller.getSubscriberCount(), 0)
})

test('유예 시간 안에 새 구독자가 들어오면 중지를 취소하고 기존 연결을 재사용한다', () => {
  let startCount = 0
  let stopCount = 0
  let scheduledCallback: (() => void) | null = null

  const controller = createIdleSubscriptionController({
    idleDelayMs: 30_000,
    start: () => {
      startCount += 1
    },
    stop: () => {
      stopCount += 1
    },
    schedule: callback => {
      scheduledCallback = callback
      return 1
    },
    cancel: () => {
      scheduledCallback = null
    },
  })

  controller.addSubscriber()
  controller.removeSubscriber()
  controller.addSubscriber()

  assert.equal(scheduledCallback, null)
  assert.equal(startCount, 1)
  assert.equal(stopCount, 0)
  assert.equal(controller.getSubscriberCount(), 1)
})
