import test from 'ava'
import global from '../global'
import Uuid from 'uuid/v1'
import captcha from '../../src/controllers/captcha'

test('test get captcha', async t => {
  let context = global.getContext()
  context.ctx.query.uuid = Uuid()
  context.ctx.query.aa = 100
  await captcha.getCaptcha(context.ctx, context.next)
  console.log(context.ctx)
  t.notDeepEqual(context.ctx.body, {}, 'body is {}')
})
