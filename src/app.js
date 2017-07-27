import path from 'path'
import Koa from './extendlib/koa.io' // extend socket.io 
import session from 'koa-generic-session'
import convert from 'koa-convert'
import json from 'koa-json'
import cors from 'koa-cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import koaRedis from 'koa-redis'

import config from './configs/config'
import router from './routes'
import middlewares from './middlewares'
import crypto from './utils/crypto'
import ioRoute from './socket/routes'

const redisStore = koaRedis({
  url: config.redisUrl
})
const app = new Koa()

app.use(convert(cors()));
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
app.use(middlewares.logMiddleware)
app.use(middlewares.authMiddleware)
app.use(router.routes(), router.allowedMethods())
console.log('listen port:', config.port)
app.listen(config.port)

app.io.use(async function (ctx, next) {
  //on connect  
  // add decrypt , encrypt func
  ctx.decrypt = crypto.decryptCipher
  ctx.encrypt = crypto.encryptCipher
  await next();
  // disconnect
});

ioRoute(app.io); // add socket route

// app.io.route("newMessage", async (ctx, next) => {
//   console.log(ctx.data)
//   ctx.emit("newMessage", ctx.data)
// })