import wechatOAuth from '../../stores/wachat_oauth'
import _debug from 'debug'

const log = _debug('boss-admin:service:wechat:oauth')
/**
 * [async 根据微信oauth授权回调后的code换取access_token以及openid]
 * @param  {[String]} code [微信oauth授权回调后的code]
 * @return {[Promise]}      [微信用户在本公众号的openid]
 */
const getOpenid = async (code) => {
  return new Promise((resolve, reject) => {
    wechatOAuth.getAccessToken(code, (err, result) => {
      if (err) {
        log('根据微信oauth回调的code换取accessToken错误: %s', err)
        return reject('微信授权认证错误')
      }
      return resolve(result.data.openid)
    })
  })
}

/**
 * [async 根据用户openid获取用户微信的基本信息]
 * @param  {[type]} openid [description]
 * @return {[type]}        [description]
 */
const getUserWechatProfile = async (openid) => {
  return new Promise((resolve, reject) => {
    wechatOAuth.getUser(openid, (err, result) => {
      if (err) {
        log('根据用户微信的openid(%s)获取基本信息错误: %s', openid, err)
        return reject('获取用户微信基本信息错误')
      }
      return resolve(result)
    })
  })
}

export { getOpenid, getUserWechatProfile }



