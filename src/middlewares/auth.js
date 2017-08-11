import jwt from 'jsonwebtoken'
import _debug from 'debug'
import moment from 'moment'
import { secretKeyBase } from '../configs/config'
import { createToken } from '../services/auth/login'
import pathToRegExp from 'path-to-regexp'
const log = _debug('backend:middleware:auth')


const setUnauthrization = (ctx) => {
  const reqId = ctx.state ? (ctx.state.reqId || '') : ''
  ctx.status = 401
  ctx.body = { reqId, message: '未授权的访问' }
}

const allowPassPathAndMethod = (path, method) => {
  const allowedPathMethods = [
    { path: '/api/auth/loginLocal', method: 'POST' },
    { path: '/api/auth/loginWechat', method: 'POST' }
  ]
  let isAllowed = false
  for (let allowedPathMethod of allowedPathMethods) {
    let regexp = pathToRegExp(allowedPathMethod.path, [])
    if (regexp.test(path) && allowedPathMethod.method === method) {
      isAllowed = true
      break
    }
  }
  return isAllowed
}
export default async (ctx, next) => {

  const headers = ctx.headers
  const authorization = headers['authorization']
  const userAgent = headers['user-agent']
  const path = ctx.request.path
  const method = ctx.method
  let isAuthed = false
  if (authorization) {
    const parts = authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      const token = parts[1]
      try {
        const user = jwt.verify(token, secretKeyBase)
        if (user && user.userAgent === userAgent) {
          isAuthed = true
          ctx.state = ctx.state || {}
          ctx.state['userId'] = user.userId
          // 判断是否需要续期TOKEN
          if (user.renewTime < moment().unix()) {
            const newToken = createToken(user.userId, userAgent, user.days)
            ctx.response.set('x-boss-admin-token', newToken)
          }
        }
      } catch (err) {
        debug(`TOKEN 认证错误: ${s}`)
      }
    }
  }
  if (!isAuthed && !allowPassPathAndMethod(path, method)) {
    setUnauthrization(ctx)
  } else {
    await next()
  }
}