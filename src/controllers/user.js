import models from '../models/index'
import Uuid from 'uuid/v1'
import catche from '../services/cache'
import bcrypt from 'bcrypt'
import config from '../config/config'
// console.log(Uuid())
const index = async (ctx, next) => {
  let uuid = Uuid()
  await ctx.render('login', {uuid: uuid, csrf: ctx.csrf})
}
const signIn = async (ctx, next) => {
  console.log(config.salt, bcrypt.hashSync('123456' + config.salt, 10))
  await models.User.sync({force: false})
  await models.User.create({
    name: 'zeng',
    email: 'zaq1999@163.com',
    password: bcrypt.hashSync('123456' + config.salt, 10)
  })
  // ctx.body = userInfo
  // if (ctx.state.isUserSignIn) {
  //   return ctx.redirect('/')
  // }
  const locals = {
    nav: 'signIn'
  }
  await ctx.render('login', locals)
}

const loginOut = (ctx, next) => {
  if (!ctx.state.isUserSignIn) {
    return ctx.redirect('/')
  }
  ctx.session.userId = null
  console.log('logout successfully!')
  ctx.redirect('/')
}

const login = async (ctx, next) => {
  const body = ctx.request.body
  // body.captcha = body.getcode
  body.email = body.accounts
  console.log('dsfdsfsdfdsfds===>', body)
  if (!(body.email && body.password && body.captcha && body.uuid)) {
    const locals = {
      nav: 'signin'
    }
    return await ctx.render('user', locals)
  }
  console.log('dsfdsfsdfdsfds===>22')
  // 验证验证码
  let ccapValue = await catche.getCache(`captcha:${body.uuid}`)
  console.log('ccc==>', ccapValue, body.captcha.toUpperCase())
  if (ccapValue !== body.captcha.toUpperCase()) {
    console.log('captcha error!')
    ctx.body = 'captcha error!'
    return
    // return ctx.redirect('user')
  }
  console.log('dsfdsfsdfdsfds===>33')
  // 验证用户
  let user = await models.User.findOne({ where: { email: body.email } })
  // console.log('uere', user)
  if (user && user.authenticate(body.password)) {
    ctx.session.userId = user.id
    ctx.status = 302
    console.log('log in successfully!')
    ctx.body = 'log in successfully!'
    // ctx.redirect('')
  } else {
    const locals = {
      nav: 'signIn'
    }
    console.log('user name or password error.')
    await ctx.render('user', locals)
  }
}

export default {
  index,
  signIn,
  loginOut,
  login
}
