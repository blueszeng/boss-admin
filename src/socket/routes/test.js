import captcha from '../../controllers/captcha'
import { wrapIoRoute } from '../../utils/wrapIoRoute'

module.exports = {
  "newMessage": wrapIoRoute(captcha.test)
}