import Router from 'koa-router'
import bet from '../controllers/bet'

import { wrapAllRoute } from '../utils/wrapRoute'
wrapAllRoute(bet)

const router = Router({
  prefix: '/bet'
})

router.post('/playerBet', bet.playerBet)
module.exports = router
