import wrapper from 'co-redis'
import redis from '../configs/redis'
const redisClient = wrapper(redis)
let redisAvailable = false
redisClient.on('error', (_error) => {
  console.log('connect error===>')
  redisAvailable = false
})

redisClient.on('end', () => {
  console.log('connect end===>')
  redisAvailable = false
})

redisClient.on('connect', () => {
  console.log('connect redis===>')
  redisAvailable = true
})
const setCache = async function (key, value, tty) {
  if (!redisAvailable) {
    return
  }
  if (value === null) {
    return
  }
  value = JSON.stringify(value)
  if (tty) {
    await redisClient.setex(key, tty, value)
  }
  await redisClient.set(key, value)
}

const getCache = async function (key) {
  if (!redisAvailable) {
    return null
  }
  let data = await redisClient.get(key)
  if (data) {
    data = JSON.parse(data.toString())
  }
  return data
}
const cleanCache = async function (key) {
  if (!redisAvailable) {
    return
  }
  await redisClient.del(key)
  // console.log('clean', key)
}
export default {
  setCache,
  getCache,
  cleanCache
}
