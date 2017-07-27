import common from '../common'

const getCaptcha = async (ctx, next) => {
  let uuid = ctx.query.uuid || 123
  let image = await common.genCaptcha(uuid)
  return Promise.resolve(image)
}


// io message 
const test = async (ctx, next) => {
  console.log(ctx.data)
  return Promise.resolve(["newMessage",{name: "zengyongaung"}])
}


export default {
  getCaptcha,
  test
}
