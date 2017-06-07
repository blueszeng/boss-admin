
const about = async (ctx, next) => {
  return Promise.resolve("zzzzzz")
}

const index = async (ctx, next) => {
  if (!ctx.state.isUserSignIn) {
    return ctx.redirect('/user')
  }
  //  await ctx.render('login', {title: 'zengyonguang'})
}

export default {
  about,
  index
}
