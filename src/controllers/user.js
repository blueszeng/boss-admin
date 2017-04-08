import models from '../models/index'
import Uuid from 'uuid/v1'
import catche from '../services/cache'
import bcrypt from 'bcrypt'
import config from '../config/config'
// console.log(Uuid())
const index = async (ctx, next) => {
  let uuid = Uuid()
  console.log('query===>', ctx.query)
  await ctx.render('login', {uuid: uuid, csrf: ctx.csrf, sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg})
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
  if (!(body.email && body.password && body.captcha && body.uuid)) {
    const locals = {
      sysStatus: 'error',
      sysMsg: escape('信息不能为空')
    }
    // ctx.redirect('/user?ab=cd')
    // console.log()
    ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    return

    // return await ctx.render('user', locals)
  }
  // 验证验证码
  let ccapValue = await catche.getCache(`captcha:${body.uuid}`)
  console.log('ccc==>', ccapValue, body.captcha.toUpperCase())
  if (ccapValue !== body.captcha.toUpperCase()) {
    console.log('captcha error!')
    ctx.body = 'captcha error!'
    const locals = {
      sysStatus: 'error',
      sysMsg: escape('验证码错误')
    }
    return ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    // return ctx.redirect('user')
  }
  // 验证用户
  let user = await models.User.findOne({ where: { email: body.email } })
  // console.log('uere', user)
  if (user && user.authenticate(body.password)) {
    ctx.session.userId = user.id
    ctx.status = 302
    console.log('log in successfully!')
    const locals = {
      sysStatus: 'success',
      sysMsg: escape('登陆成功')
    }
    return ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    // ctx.body = 'log in successfully!'
    // ctx.redirect('')
  } else {
    const locals = {
      sysStatus: 'error',
      sysMsg: escape('用户名或密码错误')
    }
    console.log('user name or password error.')
    return ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
  }
}

export default {
  index,
  signIn,
  loginOut,
  login
}
