interface SocketConnectionLeaseOptions {
  connect: () => void
  disconnect: () => void
}

export function createSocketConnectionLease({
  connect,
  disconnect,
}: SocketConnectionLeaseOptions) {
  let consumerCount = 0

  return {
    acquire() {
      let released = false

      if (consumerCount === 0) {
        connect()
      }

      consumerCount += 1

      return () => {
        if (released) {
          return
        }

        released = true
        consumerCount = Math.max(consumerCount - 1, 0)

        if (consumerCount === 0) {
          disconnect()
        }
      }
    },

    getConsumerCount() {
      return consumerCount
    },
  }
}
