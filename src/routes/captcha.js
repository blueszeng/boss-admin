
import Router from 'koa-router'
import captcha from '../controllers/captcha'

const router = Router({
  prefix: '/captcha'
})

router.get('/', captcha.getCaptcha)

module.exports = router
