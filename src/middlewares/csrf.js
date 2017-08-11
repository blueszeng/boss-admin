import CSRF from 'koa-csrf'
import compose from 'koa-compose'
module.exports = compose([
  new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: false
  }), async (ctx, next) => {
    if ([ 'GET', 'POST' ].includes(ctx.method)) {
      if (ctx.method === 'GET') {
        ctx.state.csrf = ctx.csrf
      }
      await next()
    }
  }])
