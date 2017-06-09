import log4js from 'log4js'
import moment from 'moment'
import Hashids from 'hashids'
import path from 'path'
import _ from 'lodash'
import { secretKeyBase } from '../configs/config'
const logAppenders = []
// logAppenders.push({
//   type: 'console'
// })

logAppenders.push({
  type: 'file', filename: 'logs/bossadmin.log', category: 'bossadmin'
})

log4js.configure({
  appenders: logAppenders
})
const logger = log4js.getLogger('bossadmin')

// 初始化hash算法
const hashids = new Hashids(secretKeyBase, 8)
// 当前进程id
const processId = process.pid

export default async (ctx, next) => {
  const start = moment()
  const headers = ctx.headers
  const requestIP = headers['x-forwarded-for'] || headers['X-Real-IP'] || ctx.ip || '0.0.0.0'
  const requestMethod = ctx.method
  const requestHeaders = JSON.stringify(headers)
  const requestUrl = ctx.request.path
  const requestQuery = JSON.stringify(ctx.request.query)
  const requestBody = JSON.stringify(ctx.request.body)
  const startUnixtime = start.valueOf()
  let requestId = ''
  if (requestUrl.startsWith('/api/')) {
    // 根据当前进程号，unix时间戳，1-3位随机数组合生成hashid
    requestId = hashids.encode([processId, startUnixtime, _.random(0, 999)])
    ctx.state = ctx.state || {}
    ctx.state['reqId'] = requestId
  }
  await next()
  const responseHeaders = JSON.stringify(ctx.response.headers || [])
  const responseBody = JSON.stringify(ctx.body || {})
  const responseStatus = ctx.status
  const ms = moment().valueOf() - startUnixtime
  logger.info(`[${start.format('YYYY-MM-DD HH:mm:ss')}] [${requestIP}] [${requestMethod}] [${requestUrl}] [${responseStatus}] [${ms}ms]
                Request Id: ${requestId}
                Request Headers: ${requestHeaders}
                Request Query: ${requestQuery}
                Request Body: ${requestBody}
                Response Headers: ${responseHeaders}
                Response Body: ${responseBody}`)
}
