const _ = require('lodash')
const development = require('./development')
const production = require('./production')

const env = process.env.NODE_ENV || 'development'
const configs = {
  development: development,
  production: production
}
const defaultConfig = {
  env: env,
  salt: 'zengyong',
  wechatAppid: 'wx1f58a987a5619fb6',
  wechatSecret: '263ecc320579be8c52c1fa7f000f4c5b',
  wechatMchid: '1346625101',
  wechatPayApiKey: 'deerwarwechat1234567891011121314',
  wechatNotifyUrl: 'http://wechat.deerwar.com/api/common/wechat/notify'
}

const config = _.merge(defaultConfig, configs[env])
// console.log(config)
module.exports = config
