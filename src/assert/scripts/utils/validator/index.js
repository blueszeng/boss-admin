import match from './match'
const validator = (entity, ruleset) => {
  var errors = []
  for (var rule in ruleset) {
    if (ruleset[rule] === 'true') {
      ruleset[rule] = true
    }

    if (ruleset[rule] === 'false') {
      ruleset[rule] = false
    }
    if (ruleset[rule] === false) {
      break
    }
    var ruleVal = typeof ruleset[rule] === 'boolean' ? undefined : ruleset[rule]
    errors = errors.concat(match.match(entity, rule, ruleVal))
  }
  if (errors.length) {
    return errors
  } else {
    return []
  }
}
export default {validator}
