import Router from 'koa-router'
import users from '../controllers/user'
import csrf from '../middlewares/csrf'
import wrapRoute from '../utils/wrapRoute'
const router = Router({
  prefix: '/user'
})

router.post('/sign_in', wrapRoute(users.login))
// router.get('/logout', users.LogOut)
// router.get('/:id/edit', articles.checkLogin, articles.checkArticleOwner, articles.edit);

module.exports = router
