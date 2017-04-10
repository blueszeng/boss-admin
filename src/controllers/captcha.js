import common from '../common'
const getCaptcha = async (ctx, next) => {
  let uuid = ctx.query.uuid || 123
  let image = await common.genCaptcha(uuid)
  ctx.body = image
}

export default {
  getCaptcha
}
