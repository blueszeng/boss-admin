import Koa from 'koa'
import xtplApp from 'xtpl/lib/koa'
import Router from 'koa-router'
const app = new Koa()
var router = new Router()
// uses async arrow functions
xtplApp(app, {
  views: './views'
})
app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})
router.get('/', async (ctx, next) => {
  console.log('get===>', ctx.render)
  await ctx.render('index.xtpl', {title: 'zengyonguang'})
})
app.use(router.routes())
app.listen(3000)
