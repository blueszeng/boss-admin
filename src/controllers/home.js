import menuConfig from '../configs/menu'
import generate from '../utils/menu'
import util from '../utils/util'
import models from '../models/index'

const about = async(ctx, next) => {
    await ctx.render('login', { title: 'zengyonguang' })
}

const index = async(ctx, next) => {
    if (!ctx.state.isUserSignIn) {
        return ctx.redirect('/user')
    }
    let menu = { str: "" }
    generate.generateMenu(menuConfig, menu)
    let user = await models.User.findOne({ where: { id: ctx.session.userId } })
    if (user === null) {
        return ctx.redirect('/user')
    }
    let userData = {
        id: user.id,
        name: user.name,
        email: user.email,
    }
    await ctx.render('index', util.extendMsgStatus(ctx, { user: userData, 'menu': menu.str }))
}
export default {
    about,
    index
}