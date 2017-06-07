import _ from 'lodash'
const ctx = {
  body: {},
  query: {},
  render: async (template, valueObj) => {
    return valueObj
  },
  redirect: () => {},
  returnValue: {}
}
const next = () => {}

const getContext = (ctx, next) => {
  let cloneCtx = _.cloneDeep(ctx)
  let cloneNext = _.cloneDeep(next)
  return {
    ctx: cloneCtx,
    next: cloneNext
  }
}

export default {
  getContext: getContext.bind(null, ctx, next)
}
