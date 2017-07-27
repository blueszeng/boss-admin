import _ from 'lodash'
import _debug from 'debug'
const debug = _debug('utils:wrapIoRoute')

const wrapIoRoute = (fn, ...args) => {
  return async (ctx) => {
    try {
      const data = await fn.apply(ctx, [ctx, ...args])
      if ((_.isArray(data) && data.length === 2)) {
        return ctx.emit(data[0], data[1]);
      } else {
        ctx.emit('errors', "emit args error");
      }
    } catch (err) {
      ctx.emit('errors', err);
    }
  }
}


const wrapAllIoRoute = (controllerObject) => {
  for (let i in controllerObject) {
    if (_.isFunction(controllerObject[i])) {
      controllerObject[i] = wrapIoRoute(controllerObject[i])
    }
  }
}


export {
  wrapIoRoute,
  wrapAllIoRoute
}
