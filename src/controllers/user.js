import models from '../models/index'
import Uuid from 'uuid/v1'
import catche from '../utils/cache'
import bcrypt from 'bcrypt'
import config from '../configs/config'
import debug from '../utils/debug'
import {Joi, validate} from '../utils/validator'
const log = debug('controllers_user=>')

const index = async (ctx, next) => {
  let uuid = Uuid()
  await ctx.render('login', {uuid: uuid, csrf: ctx.csrf, sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg})
}
const signIn = async (ctx, next) => {
  await models.User.sync({force: false})
  await models.User.create({
    name: 'zeng',
    email: 'zaq1999@163.com',
    password: bcrypt.hashSync('123456' + config.salt, 10)
  })
  ctx.body = 'ok'
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

const login = async (ctx, next) => {
  const body = ctx.request.body
  body.email = body.accounts
 // 参数验证
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label('邮箱'),
    password: Joi.string().required().label('密码'),
    captcha: Joi.string().length(4).required().label('验证码')
  })
  const data = {
    email: body.email,
    password: body.password,
    captcha: body.captcha
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
    // ctx.status = 302
    log('log in successfully!')
     return Promise.resolve('登陆成功')
    } else {
    console.log('user name or password error.')
    return Promise.reject('用户名或密码错误')
  }
}

export default {
  index,
  signIn,
  loginOut,
  login
}
