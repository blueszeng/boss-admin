import cache from '../../utils/cache'
import { COUNTER, DRAWLOTTERY_QUEUE } from '../../utils/cache_key'

const getLotteryInfo = async () => {
  let counter, drawLyValue = []
  try {
    let drawLyQueue = await cache.client.lrange(DRAWLOTTERY_QUEUE, 0, 5)
    const multi = cache.client.multi()
    multi.get(COUNTER)
    for (let val of drawLyQueue) {
      multi.hgetall(val)
    }
    let value = await multi.exec()
    counter = value[0]
    for (let i = 1; i <= drawLyQueue.length; i++) {
      drawLyValue.push(value[i])
    }
    Promise.resolve({
      counter,
      drawLyValue
    })
  } catch (err) {
    Promise.reject(err)
  }
}

export default {
  getLotteryInfo
}
