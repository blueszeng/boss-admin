import rules from './rules'
const match = function (data, ruleName, args) {
  var self = this
  if (Array.isArray(args) && ruleName !== 'len') {
    args = [args]
  }
  if (!Array.isArray(args)) {
    args = [args]
  }
  args.unshift(data)
  var rule = rules.rules[ruleName]
  if (!rule) {
    throw new Error('Unknown rule: ' + ruleName)
  }
  var errorMessage = rule.apply(self, args)
  if (errorMessage) { return [{rule: ruleName, message: errorMessage}] }
  return []
}

export default {
  match
}
