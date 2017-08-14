
import Router from 'koa-router'
import wechat from '../controllers/wechat'
import { wrapRoute } from '../utils/wrapRoute'

const router = Router({
  prefix: '/wechat'
})

router.post('pay', wrapRoute(wechat.pay))
router.post('payParams', wrapRoute(wechat.pay))
router.get('orders', wrapRoute(wechat.pay))

module.exports = router
