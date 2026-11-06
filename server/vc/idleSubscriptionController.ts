interface IdleSubscriptionControllerOptions<TimerHandle> {
  idleDelayMs: number
  start: () => void
  stop: () => void
  schedule: (
    callback: () => void,
    delayMs: number,
  ) => TimerHandle
  cancel: (handle: TimerHandle) => void
}

export function createIdleSubscriptionController<TimerHandle>({
  idleDelayMs,
  start,
  stop,
  schedule,
  cancel,
}: IdleSubscriptionControllerOptions<TimerHandle>) {
  let subscriberCount = 0
  let active = false
  let idleTimer: TimerHandle | null = null

  function cancelIdleStop() {
    if (idleTimer === null) {
      return
    }

    cancel(idleTimer)
    idleTimer = null
  }

  return {
    addSubscriber() {
      cancelIdleStop()
      subscriberCount += 1

      if (!active) {
        active = true
        start()
      }
    },

    removeSubscriber() {
      if (subscriberCount === 0) {
        return
      }

      subscriberCount -= 1

      if (subscriberCount > 0 || !active || idleTimer !== null) {
        return
      }

      idleTimer = schedule(() => {
        idleTimer = null

        if (subscriberCount > 0 || !active) {
          return
        }

        active = false
        stop()
      }, idleDelayMs)
    },

    shutdown() {
      cancelIdleStop()
      subscriberCount = 0

      if (!active) {
        return
      }

      active = false
      stop()
    },

    getSubscriberCount() {
      return subscriberCount
    },
  }
}
