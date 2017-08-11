import cache from '../utils/cache'
import models from '../models/index'
import { Joi, validate } from '../utils/validator'
import { BET_CONFIG, PLAYER_BET } from '../utils/cache_key'
import { transaction } from '../utils/transaction'
import debug from '../utils/debug'
const log = debug('controllers_bet=>')


/** 
 * get betconfig for redis cache
 */
let betConfig 
const initConfig = async () => {
  try {
    betConfig = await cache.client.hgetall(BET_CONFIG)
  } catch (err) {
    console.log(err)
  }
}
initConfig()


const playerBet = async (ctx, next) => {
  const body = ctx.request.body
  // 参数验证
  const schema = Joi.object().keys({
    userId: Joi.number().min(100000).required().label('用户'),
    sceneId: Joi.number().min(0).max(2).required().label('场次'),
    rateStr: Joi.string().required().required().label('选号'),
    periodNo: Joi.string().length(11).required().label('期号'),
    money: Joi.number().min(5).required().label('下注'),
  })
  try {
    await validate(body, schema)
  } catch (err) {
    log('验证下注参数错误', err.message)
    return Promise.reject(err.message)
  }
  const rateId = betConfig[body.rateStr]
  if (!rateId) {
    log('选号有误', rateStr)
    return Promise.reject('选号有误')
  }
  log(rateId)
  let user = await models.User.findOne({ where: { id: body.userId } })
  if (!user || user.userMoney - body.money < 0) {
    log('金额过低', user.userMoney - body.money)
    return Promise.reject('你的金额过低请充值')
  }

  try {
    // 写入数据 库
    const data = {
      userId: body.userId,
      sceneId: body.sceneId,
      rateId: rateId,
      periodNo: body.periodNo,
      money: body.money
    }
    log(data)
    await transaction(async (t) => {
      await models.Bet.create(data, { transaction: t })
      await models.User.update({ money: -body.money }, { transaction: t })
      return Promise.resolve(true)
    })
    // 写入缓存信息
    let globalBatInfo = await cache.getHashCache(`${PLAYER_BET}_${rateId}`)
    if (!Object.keys(globalBatInfo).length) { //第一次插入
      globalBatInfo = {
        "money": 0,
        "count": 0,
      }
    }
    globalBatInfo.money = parseFloat(globalBatInfo.money)
    globalBatInfo.count = parseInt(globalBatInfo.count)
    await cache.setHashCache(`${PLAYER_BET}__${periodNo}_{rateId}`, ['money', globalBatInfo.money + body.money, 'count', globalBatInfo.count + 1])
  } catch (err) {
    return Promise.reject('下注失败')
  }
  return Promise.resolve(true)
}

export default {
  playerBet
}