import { Payment } from 'wechat-pay'
import config from '../configs/config'
import path from 'path'
import fs from 'fs'

export const initConfig = {
  appId: config.wechatAppid,
  mchId: config.wechatMchid,
  notifyUrl: config.wechatNotifyUrl,
  partnerKey: config.wechatPayApiKey,
  pfx: fs.readFileSync(path.resolve(__dirname, '../apiclient_cert.p12'))
}

export const payment = new Payment(initConfig)
