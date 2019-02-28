import path from 'path'
import Koa from 'koa'
import session from 'koa-generic-session'
// import Dust from 'koa-dust'
import convert from 'koa-convert'
import json from 'koa-json'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import koaRedis from 'koa-redis'
import render from 'koa-art-template'
import config from './configs/config'
import router from './routes'
import middlewares from './middlewares'

const redisStore = koaRedis({
    url: config.redisUrl
})

const app = new Koa()
app.keys = [config.secretKeyBase]
if (config.serveStatic) {
    app.use(convert(require('koa-static')(path.join(__dirname, './public'))))
}
app.use(convert(session({
    store: redisStore,
    prefix: 'boss:sess:',
    key: 'boss.sid'
})))

app.use(bodyParser())

app.use(convert(json()))
app.use(convert(logger()))


render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.art', // 后缀名
    debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
})

// app.use(Dust(path.join(__dirname, 'views'), {
//     // stream: false,
//     compile: true,
//     cache: false,
//     ext: 'dust'
// }))
app.use(middlewares.catchError)
app.use(middlewares.addHelper)
app.use(router.routes(), router.allowedMethods())
console.log(config.port)
app.listen(config.port)