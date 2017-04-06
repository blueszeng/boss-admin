import models from '../models'
const catchError = async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    let status = err.status || 500
    if (status < 0) {
      status = 500
    }
    ctx.status = status
    ctx.state = {
      status: status,
      currentUser: null
    }
    if (status === 500) {
      console.log('server error', err, ctx)
    }
    await ctx.render('error/error', {})
  }
}

const addHelper = async (ctx, next) => {
  let currentUser = null
  if (ctx.session.userId) {
    currentUser = await models.User.findById(ctx.session.userId)
  }
  if (!ctx.state) {
    ctx.state = {}
  }
//  ctx.state.csrf = ctx.csrf
  ctx.state.currentUser = currentUser
  ctx.state.isUserSignIn = (currentUser != null)
  await next()
}

export default {
  catchError,
  addHelper
}
