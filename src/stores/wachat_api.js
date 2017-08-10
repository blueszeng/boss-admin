import API from 'wechat-api'
import _debug from 'debug'

import config from '../configs/config'
import cache from '../utils/cache'
const log = _debug('wechat_oauth')

const wechatApi = new API(config.wechatAppid, config.wechatSecret, (callback) => {
  cache.client.get('wechat:api')
    .then((result) => {
      if (!result) {
        log('在缓存中微信Api Token为空')
        return callback(null, null)
      }
      return callback(null, JSON.parse(result))
    }).catch((err) => {
      log('在缓存中获取微信Api Token错误: %s', err)
      return callback(err)
    })
}, (openid, token, callback) => {
  cache.client.setex('wechat:api', 3600, JSON.stringify(token))
    .then(() => {
      return callback(null, token)
    }).catch((err) => {
      log('向缓存中写入微信Api Token错误: %s', err)
      return callback(err)
    })
})


/**
 * [registerTicketHandle 注册微信JSAPI TicketHandler]
 * 微信目前有四套Token系统，注意不要混淆:
 * 1) 主动调用微信api的access_token（同微信主动通知服务器接收消息后主动调用api的access_token）
 * 2) 主动调用微信js api的ticket
 * 3) 微信用户oauth授权后每个openid对应的access_token
 * 4) 微信卡券的access_token
 */
wechatApi.registerTicketHandle((type, callback) => {
  cache.client.hget('wechat:jsticket', type)
    .then((result) => {
      if (!result) {
        log('在缓存中获取(type: %s)微信JSApi Ticket为空', type)
        return callback(null, null)
      }
      return callback(null, JSON.parse(result))
    }).catch((err) => {
      log('在缓存中获取(type: %s)微信JSApi Ticket错误: %s', type, err)
      return callback(err)
    })
}, (type, ticket, callback) => {
  cache.client.hset('wechat:jsticket', type, JSON.stringify(ticket))
    .then(() => {
      return callback(null, ticket)
    }).catch((err) => {
      log('向缓存中写入(type: %s)微信JSApi Ticket错误: %s', type, err)
      return callback(err)
    })
})


export default wechatApi