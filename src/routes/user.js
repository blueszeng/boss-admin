import Router from 'koa-router'
import users from '../controllers/user'
import csrf from '../middlewares/csrf'
const router = Router({
  prefix: '/user'
})

router.get('/', csrf, users.index)
// router.get('/sign_in', csrf, users.signIn)
router.post('/sign_in', csrf, users.login)
// router.get('/logout', users.LogOut)
 // router.get('/:id/edit', articles.checkLogin, articles.checkArticleOwner, articles.edit);

// for require auto in index.js
module.exports = router
