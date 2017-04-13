import validator from 'validator'
import _ from 'lodash/core'
const isRegExp = _.isRegExp
const isNull = _.isNull
const isUndefined = _.isUndefined
const isFunction = _.isFunction
const reduce = _.reduce

var rules = {
  'isBoolean': {
    fn: function (x) {
      return typeof x === 'boolean'
    },
    defaultErrorMessage: 'Value was not a boolean.',
    expectedTypes: ['json', 'ref']
  },
  'isNotEmptyString': {
    fn: function (x) {
      return x !== ''
    },
    defaultErrorMessage: 'Value was an empty string.',
    expectedTypes: ['json', 'ref', 'string']
  },
  'isInteger': {
    fn: function (x) {
      return typeof x === 'number' && (parseInt(x) === x)
    },
    defaultErrorMessage: 'Value was not an integer.',
    expectedTypes: ['json', 'ref', 'number']
  },
  'isNumber': {
    fn: function (x) {
      return typeof x === 'number'
    },
    defaultErrorMessage: 'Value was not a number.',
    expectedTypes: ['json', 'ref']
  },
  'isString': {
    fn: function (x) {
      return typeof x === 'string'
    },
    defaultErrorMessage: 'Value was not a string.',
    expectedTypes: ['json', 'ref']
  },
  'max': {
    fn: function (x, val) {
      if (typeof x !== 'number') { throw new Error('Value was not a number.') }
      return x <= val
    },
    defaultErrorMessage: function (x, val) { return 'Value was greater than the configured maximum (' + val + ')' },
    expectedTypes: ['json', 'ref', 'number']
  },
  'min': {
    fn: function (x, val) {
      if (typeof x !== 'number') { throw new Error('Value was not a number.') }
      return x >= val
    },
    defaultErrorMessage: function (x, val) { return 'Value was less than the configured minimum (' + val + ')' },
    expectedTypes: ['json', 'ref', 'number']
  },
  'isAfter': {
    fn: validator.isAfter,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function (x, val) { return 'Value was before the configured time (' + val + ')' },
    ignoreEmptyString: true
  },
  'isBefore': {
    fn: validator.isBefore,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function (x, val) { return 'Value was after the configured time (' + val + ')' },
    ignoreEmptyString: true
  },
  'isCreditCard': {
    fn: validator.isCreditCard,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid credit card.',
    ignoreEmptyString: true
  },
  'isEmail': {
    fn: validator.isEmail,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid email address.',
    ignoreEmptyString: true
  },
  'isHexColor': {
    fn: validator.isHexColor,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid hex color.',
    ignoreEmptyString: true
  },
  'isIn': {
    fn: validator.isIn,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function (x, val) { return 'Value was not in the configured whitelist (' + val.join(', ') + ')' },
    ignoreEmptyString: true
  },
  'isIP': {
    fn: validator.isIP,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid IP address.',
    ignoreEmptyString: true
  },
  'isNotIn': {
    fn: function (x, arrayOrString) {
      return !validator.isIn(x, arrayOrString)
    },
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function (x, val) { return 'Value was in the configured blacklist (' + val.join(', ') + ')' },
    ignoreEmptyString: true
  },
  'isURL': {
    fn: function (x, opt) {
      return validator.isURL(x, opt === true ? undefined : opt)
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid URL.',
    ignoreEmptyString: true
  },
  'isUUID': {
    fn: validator.isUUID,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid UUID.',
    ignoreEmptyString: true
  },

  'minLength': {
    fn: function (x, min) {
      if (typeof x !== 'string') { throw new Error('Value was not a string.') }
      return validator.isLength(x, min)
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: function (x, val) { return 'Value was shorter than the configured minimum length (' + val + ')' },
    ignoreEmptyString: true
  },
  'maxLength': {
    fn: function (x, max) {
      if (typeof x !== 'string') { throw new Error('Value was not a string.') }
      return validator.isLength(x, 0, max)
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: function (x, val) { return 'Value was longer than the configured maximum length (' + val + ')' },
    ignoreEmptyString: true
  },

  'regex': {
    fn: function (x, regex) {
      if (!isRegExp(regex)) {
        throw new Error('This rule expects a regular expression to be configured, but instead got the ' + typeof regex + ' `' + regex + '`.')
      }
      return validator.matches(x, regex)
    },
    defaultErrorMessage: function (x, val) { return 'Value did not match the configured regular expression (' + val + ')' },
    expectedTypes: ['json', 'ref', 'string'],
    ignoreEmptyString: true
  },
  'custom': {
    fn: function (x, fn) {
      return fn(x)
    },
    expectedTypes: ['json', 'ref', 'string', 'number', 'boolean'],
    defaultErrorMessage: 'Value failed custom validation.'
  }
}
const rulesList = reduce(rules, function createRule (memo, rule, ruleName) {
  var wrappedRule = function (x) {
    if (isNull(x) || isUndefined(x)) {
      return 'Got invalid value `' + x + '`!'
    }
    if (x === '' && rule.ignoreEmptyString) {
      return false
    }
    var passed
    try {
      passed = rule.fn.apply(rule, arguments)
    } catch (e) {
      return e.message
    }

    if (passed) { return false }
    return isFunction(rule.defaultErrorMessage) ? rule.defaultErrorMessage.apply(rule, arguments) : rule.defaultErrorMessage
  }

  wrappedRule.expectedTypes = rule.expectedTypes

  memo[ruleName] = wrappedRule

  return memo
}, {})

export default {
  rules: rulesList
}
