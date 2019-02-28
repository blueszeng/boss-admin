import models from '../models/index'
import Uuid from 'uuid/v1'
import catche from '../services/cache'
import bcrypt from 'bcrypt'
import config from '../configs/config'
import debug from '../utils/debug'
import { Joi, validate } from '../utils/validator'
const log = debug(__filename)
const index = async(ctx, next) => {
    let uuid = Uuid()
    await ctx.render('login', { uuid: uuid, csrf: ctx.csrf, sysStatus: ctx.query.sysStatus, sysMsg: ctx.query.sysMsg })
}
const signIn = async(ctx, next) => {
    await models.User.create({
        name: 'zeng',
        email: 'zaq19999@163.com',
        password: bcrypt.hashSync('123456' + config.salt, 10)
    })
    await ctx.render('login', {})
}

const loginOut = (ctx, next) => {
    if (!ctx.state.isUserSignIn) {
        return ctx.redirect('/')
    }
    ctx.session.userId = null
    log('logout successfully!')
    ctx.redirect('/')
}

const login = async(ctx, next) => {
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
        log('captcha is null!')
        log(err)
        const locals = {
            sysStatus: 'error',
            sysMsg: escape(err.message)
        }
        return ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
    // 验证码验证
    let ccapValue = await catche.getCache(`captcha:${body.uuid}`)
    if (ccapValue !== body.captcha.toUpperCase()) {
        log('captcha error!')
        const locals = {
            sysStatus: 'error',
            sysMsg: escape('验证码错误')
        }
        return ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
    // 用户登录验证
    let user = await models.User.findOne({ where: { email: body.email } })
    if (user && user.authenticate(body.password)) {
        ctx.session.userId = user.id
        ctx.status = 302
        log('log in successfully!')
        const locals = {
            sysStatus: 'success',
            sysMsg: escape('登陆成功')
        }
        return ctx.redirect(`/?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    } else {
        console.log('user name or password error.')
        const locals = {
            sysStatus: 'error',
            sysMsg: escape('用户名或密码错误')
        }
        return ctx.redirect(`/user?sysStatus=${locals.sysStatus}&sysMsg=${locals.sysMsg}`)
    }
}

export default {
    index,
    signIn,
    loginOut,
    login
}