import Router from 'koa-router'
import users from '../controllers/auth'
import csrf from '../middlewares/csrf'
import { wrapAllRoute } from '../utils/wrapRoute'
wrapAllRoute(users)

const router = Router({
  prefix: '/auth'
})

router.post('/loginLocal', users.loginLocal)
router.get('/signIn', users.signIn)
// router.get('/:id/edit', articles.checkLogin, articles.checkArticleOwner, articles.edit);

module.exports = router
