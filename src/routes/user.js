import Router from 'koa-router'
import users from '../controllers/user'
import csrf from '../middlewares/csrf'
import { wrapAllRoute } from '../utils/wrapRoute'
wrapAllRoute(users)

const router = Router({
  prefix: '/user'
})

router.post('/sign_in', users.login)
router.get('/sign', users.signIn)
// router.get('/:id/edit', articles.checkLogin, articles.checkArticleOwner, articles.edit);

module.exports = router
