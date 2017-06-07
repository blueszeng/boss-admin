
import Router from 'koa-router'
import home from '../controllers/home'
import wrapRoute from '../utils/wrapRoute'

const router = Router({
  prefix: '/'
})

router.get('about', wrapRoute(home.about))

module.exports = router
