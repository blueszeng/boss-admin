
import Router from 'koa-router'
import captcha from '../controllers/captcha'
import { wrapRoute } from '../utils/wrapRoute'

const router = Router({
  prefix: '/captcha'
})

router.get('/', wrapRoute(captcha.getCaptcha))

module.exports = router
