import Router from 'koa-router'
import home from '../controllers/home'

const router = Router({
    prefix: '/'
})
router.get('about', home.about)

module.exports = router