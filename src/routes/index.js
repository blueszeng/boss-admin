import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import home from '../controllers/home'

const basename = path.basename(module.filename)
const router = Router()


fs.readdirSync(__dirname).forEach((file) => {
  if (!/\.js$/.test(file) || file === basename) {
    return;
  }
  let route = require(path.join(__dirname, file))
  router.use(route.routes(), route.allowedMethods())
})
router.get('/', home.index)

export default router
