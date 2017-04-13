import path from 'path'
import Koa from 'koa'
import session from 'koa-generic-session'
import Dust from 'koa-dust'
import convert from 'koa-convert'
import json from 'koa-json'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import koaRedis from 'koa-redis'

import config from './configs/config'
import router from './routes'
import middlewares from './middlewares'
import a from 'lodash'
console.log(a)

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

app.use(Dust(path.join(__dirname, 'views'), {
  // stream: false,
  compile: true,
  cache: false,
  ext: 'dust'
}))
app.use(middlewares.catchError)
app.use(middlewares.addHelper)
app.use(router.routes(), router.allowedMethods())
app.listen(config.port)
