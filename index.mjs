import { group, bench, run } from 'mitata'
import NodeFixedQueue from './fixed-queue.mjs'
import NodeFixedQueuePoolified from './fixed-queue-poolified.mjs'

const queues = [NodeFixedQueue, NodeFixedQueuePoolified]

const MAX_SIZE = 2047

group('max_size * 64 single full push + shift', () => {
  for (const QueueClass of queues) {
    bench(QueueClass.name, () => {
      const queue = new QueueClass()
      for (let i = 0; i < MAX_SIZE * 64; i++) {
        queue.push(i)
      }
      for (let i = 0; i < MAX_SIZE * 64; i++) {
        queue.shift()
      }
    })
  }
})

group('max_size * 64 intence full push + shift X64', () => {
  for (const QueueClass of queues) {
    bench(QueueClass.name, () => {
      const queue = new QueueClass()
      for (let times = 0; times < 64; times++) {
        for (let i = 0; i < MAX_SIZE * 64; i++) {
          queue.push(i)
        }
        for (let i = 0; i < MAX_SIZE * 64; i++) {
          queue.shift()
        }
      }
    })
  }
})

await run()
