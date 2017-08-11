import jwt from 'jsonwebtoken'
import moment from 'moment'
import { transaction } from '../../utils/transaction'
import db from '../../models'
import lottery from '../../common/lottery'
import MysqlError from '../../utils/error/MysqlError'

const createToken = (userId, userAgent, days) => {
  return jwt.sign({
    userId,
    userAgent,
    days,
    renewTime: moment().add(1, 'h').unix()
  }, SECRETKEY, {
      expiresIn: `${days}d`
    })
}

const registerWechat = async (openid) => {
  const wechatProfile = await getUserWechatProfile(openid)
  // 开始保存事务
  let userInfo = await transaction(async (t) => {
    let user = await db.User.create({ money: 0, commission: 0 }, { transaction: t })
    const userId = john.get({ plain: true }).id
    await db.Wechatstrategy.create({ userId: userId, openid: openid, unionId: wechatProfile.unionid }, { transaction: t })
    return Promise.resolve({
      openid,
      userId
    })
  })
  return Promise.resolve(userInfo)
}


/**
 * [async 根据微信oauth授权回调的code换取用户openid，判断用户是否已在系统中，已经存在直接返回用户信息对象，否则创建用户的微信认证策略以及调用微信api获取用户的头像，昵称等资料保存并返回用户信息对象]
 * @param  {[String]} code [微信oauth授权回调的code]
 * @return {[Object]}      [用户基本信息对象]
 */
const loginOrRegisterWechat = async (openid) => {
  const wechatProfile = await getUserWechatProfile(openid)
  let user = null
  if (wechatProfile.unionid) {
    user = await db.Wechatstrategy.findOne({ where: { unionid: wechatProfile.unionid } })
  } else {
    user = await db.Wechatstrategy.findOne({ where: { openid: openid } })
  }
  if (!user) {
    user = await registerWechat(openid)
  }
  let lotteryInfo = await lottery.getLotteryInfo()
  lotteryInfo.user = user
  return Promise.resolve(lotteryInfo)
}

export {
  createToken,
  loginOrRegisterWechat
}