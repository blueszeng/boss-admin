import models from '../models/index'
import Uuid from 'uuid/v1'
import catche from '../utils/cache'
import bcrypt from 'bcrypt'
import config from '../configs/config'
import debug from '../utils/debug'
import { Joi, validate } from '../utils/validator'
import { createToken } from '../services/auth/login'
const log = debug('controllers_user=>')

const index = async (ctx, next) => {
  let uuid = Uuid()
  await ctx.render('login', { uuid: uuid, csrf: ctx.csrf, sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg })
}
const signIn = async (ctx, next) => {
  // await models.User.sync({force: false})
  // await models.User.create({
  //   name: 'zeng',
  //   email: 'zaq1999@163.com',
  //   password: bcrypt.hashSync('123456' + config.salt, 10)
  // })
  return "ok"
  // const locals = {
  //   nav: 'signIn'
  // }
  // await ctx.render('login', locals)
}

const loginOut = (ctx, next) => {
  if (!ctx.state.isUserSignIn) {
    return ctx.redirect('/')
  }
  ctx.session.userId = null
  log('logout successfully!')
  ctx.redirect('/')
}

const loginLocal = async (ctx, next) => {
  const body = ctx.request.body
  body.email = body.accounts
  // 参数验证
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label('邮箱'),
    password: Joi.string().required().label('密码'),
    captcha: Joi.string().length(4).required().label('验证码'),
    rememberMe: Joi.boolean().optional().label('记住我')
  })
  const data = {
    email: body.email,
    password: body.password,
    captcha: body.captcha,
    rememberMe: body.rememberMe
  }
  try {
    await validate(data, schema)
  } catch (err) {
    log('captcha is null!', err.message)
    return Promise.reject(err.message)
  }
  // 验证码验证
  let ccapValue = await catche.getCache(`captcha:${body.uuid}`)
  console.log(body.uuid, ccapValue, body.captcha.toUpperCase());
  if (ccapValue !== body.captcha.toUpperCase()) {
    log('captcha error!')
    return Promise.reject('验证码错误')
  }
  // 用户登录验证
  let user = await models.User.findOne({ where: { email: body.email } })
  if (user && user.authenticate(body.password)) {
    ctx.session.userId = user.id
    log('log in successfully!')
    const token = createToken(user.id, ctx.headers['user-agent'], rememberMe ? 7 : 1)
    ctx.response.set('x-boss-admin-token', token)
    return Promise.resolve(user)
  } else {
    console.log('user name or password error.')
    return Promise.reject('用户名或密码错误')
  }
}

export default {
  index,
  signIn,
  loginOut,
  loginLocal
}
