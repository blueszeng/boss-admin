import common from '../common'
const getCaptcha = async (ctx, next) => {
  let uuid = ctx.query.uuid || 123
  let image = await common.genCaptcha(uuid)
  return Promise.resolve(image)
}

export default {
  getCaptcha
}
