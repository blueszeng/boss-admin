import OAuth from 'wechat-oauth'
import _debug from 'debug'

import config from '../configs/config'
import cache from '../utils/cache'
const log = _debug('wechat_oauth')

const wechatOAuth = new OAuth(config.wechatAppid, config.wechatSecret, (openid, callback) => {
  cache.client.hget('wechat:oauth', openid)
    .then((result) => {
      if (!result) {
        log('在缓存中获取用户(openid: %s)微信OAuth Token为空', openid)
        return callback(null, null)
      }
      return callback(null, JSON.parse(result))
    }).catch((err) => {
      log('在缓存中获取用户(openid: %s)微信OAuth Token错误: %s', openid, err)
      return callback(err)
    })
}, (openid, token, callback) => {
  cache.client.hset('wechat:oauth', openid, JSON.stringify(token))
    .then(() => {
      return callback(null, token)
    }).catch((err) => {
      log('向缓存中写入用户(openid: %s)微信OAuth Token错误: %s', openid, err)
      return callback(err)
    })
})




export default wechatOAuth