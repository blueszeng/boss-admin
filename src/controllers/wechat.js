import Api from '../services/wechat/api'
import models from '../models/index'
import moment from 'moment'
import _debug from 'debug'
import { middleware } from 'wechat-pay'
const log = _debug('controllers:wechat=>')

/**
 * 获取支付信息
 */
const payParams = async (ctx, next) => {
  try {
    const validateSchema = Joi.object().keys({
      money: Joi.number().integer().min(1).max(20000).required().label('金额')
    })
    await validate(ctx.request.body, validateSchema)
    const userId = ctx.state.userId
    const data = {
      userId: userId,
      sdcustomno: moment().valueOf(),
      money: ctx.request.body,
      state: 0
    }
    let wechatInfo = await models.Wechatstrategy.findOne({ where: { userId: userId } })
    await models.Order.create(data)
    const payargs = await Api.getPayargsParams({ orderNo, money, openid: wechatInfo.openid, requestIp: ctx.request.ip })
    if (payargs.err) {
      return Promise.reject('获取预支付信息失败')
    }
    payargs.orderNo = orderNo
    return Promise.resolve({ payargs })

  } catch (err) {
    return Promise.reject('获取预支付信息失败')
  }
}

/**
 * 查询订单
 */
const orders = async (ctx, next) => {
  const { query } = ctx.request
  const validateSchema = Joi.object().keys({
    offset: Joi.number().default(0).min(0).label('数据起始位置'),
    limit: Joi.number().default(10).min(1).label('每页显示条数')
  })
  const { offset, limit } = await validate(query, validateSchema)
  const userId = ctx.state.userId
  const ret = await models.Order.find({ where: { userId: userId } }, { offset: offset, limit: limit })
  return Promise.resolve(ret)
}

/**
 * 支付回调
 */
const pay = async (ctx, next) => {
  try {
    const orderId = await (new Promise((resolve, reject) => {
      middleware(initConfig).getNotify().done((message, req, res, next) => {
        log('pay: %s', JSON.stringify(message))
        const orderId = message.out_trade_no
        if (message.result_code === 'SUCCESS') {
          resolve(orderId)
        } else {
          resolve(null)
        }
      })(ctx.req, ctx.res, () => { })
    }))
    if (orderId) {
      // 更新帐单
      const orderInfo = await models.Order.findOne({ where: { sdcustomno: orderId } })
      const user = await models.User.findOne({ where: { id: body.userId } })
      const ret = await transaction(async (t) => {
        await models.Order.update({ state: 1 }, { where: { id: orderInfo.id } }, { transaction: t })
        await models.User.update({ money: user.money + orderInfo.money }, { where: { id: orderInfo.userId } }, { transaction: t })
        return Promise.resolve(true)
      })
      if (ret === true) {
        ctx.body = 'success'
      } else {
        ctx.body = 'failure'
      }
    } else {
      ctx.body = 'failure'
    }
  } catch (e) {
    ctx.body = 'failure'
  } finally {
    ctx.state = 200
  }
}

export default {
  pay,
  payParams,
  orders
}
