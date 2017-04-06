import catche from '../services/cache'
import captcha from '../utils/captcha'
// import jetpack from 'fs-jetpack'
// let tPath = jetpack.path('src/public/', 'temp')
// tPath = `${tPath}/${newUuid}.jpg`
// let publicPath = `temp/${newUuid}.jpg`
// jetpack.remove(tPath)
// jetpack.write(tPath, ary.image)
const genCaptcha = async (uuid) => {
  await catche.cleanCache(`captcha:${uuid}`)
  let ary = captcha.getCaptcha()
  await catche.setCache(`captcha:${uuid}`, ary.text, 120)
  return ary.image
}

export default {
  genCaptcha
}
