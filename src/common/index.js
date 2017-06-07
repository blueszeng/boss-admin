import catche from '../services/cache'
import captcha from '../utils/captcha'
// import jetpack from 'fs-jetpack'

const genCaptcha = async (uuid) => {
  await catche.cleanCache(`captcha:${uuid}`)
  let ary = captcha.getCaptcha()
  await catche.setCache(`captcha:${uuid}`, ary.text, 120)
  return ary.image
}

export default {
  genCaptcha
}
