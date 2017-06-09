// TODO: 翻译
export default {
  root: 'value',
  key: '"{{!key}}" ',
  messages: {
    wrapArrays: true
  },
  any: {
    unknown: '是不允许的',
    invalid: '包含一个无效的值',
    empty: '不允许是空的',
    required: '{{key}}必须提供',
    allowOnly: '必须是一个 {{valids}}',
    default: '在运行默认方法时抛出一个错误'
  },
  alternatives: {
    base: '不匹配任何被允许的替代方案'
  },
  array: {
    base: '{{key}}必须是数组类型',
    includes: 'at position {{pos}} does not match any of the allowed types',
    includesSingle: 'single value of "{{!key}}" does not match any of the allowed types',
    includesOne: 'at position {{pos}} fails because {{reason}}',
    includesOneSingle: 'single value of "{{!key}}" fails because {{reason}}',
    includesRequiredUnknowns: 'does not contain {{unknownMisses}} required value(s)',
    includesRequiredKnowns: 'does not contain {{knownMisses}}',
    includesRequiredBoth: 'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
    excludes: 'at position {{pos}} contains an excluded value',
    excludesSingle: 'single value of "{{!key}}" contains an excluded value',
    min: 'must contain at least {{limit}} items',
    max: 'must contain less than or equal to {{limit}} items',
    length: 'must contain {{limit}} items',
    ordered: 'at position {{pos}} fails because {{reason}}',
    orderedLength: 'at position {{pos}} fails because array must contain at most {{limit}} items',
    sparse: 'must not be a sparse array',
    unique: 'position {{pos}} contains a duplicate value'
  },
  boolean: {
    base: '{{key}}必须是布尔类型'
  },
  binary: {
    base: 'must be a buffer or a string',
    min: 'must be at least {{limit}} bytes',
    max: 'must be less than or equal to {{limit}} bytes',
    length: 'must be {{limit}} bytes'
  },
  date: {
    base: '{{key}}必须是几毫秒或有效的日期字符串',
    min: '{{key}}必须大于或等于{{limit}}',
    max: '{{key}}必须小于或等于{{limit}}',
    isoDate: '{{key}}必须是有效的ISO 8601日期',
    timestamp: {
      javascript: '{{key}}必须是有效的时间戳或毫秒数',
      unix: '{{key}}必须是有效的时间戳或秒数'
    },
    ref: 'references "{{ref}}" which is not a date'
  },
  function: {
    base: 'must be a Function',
    arity: 'must have an arity of {{n}}',
    minArity: 'must have an arity greater or equal to {{n}}',
    maxArity: 'must have an arity lesser or equal to {{n}}'
  },
  object: {
    base: '{{key}}必须是引用类型',
    child: 'child "{{!key}}" fails because {{reason}}',
    min: 'must have at least {{limit}} children',
    max: 'must have less than or equal to {{limit}} children',
    length: 'must have {{limit}} children',
    allowUnknown: 'is not allowed',
    with: 'missing required peer "{{peer}}"',
    without: 'conflict with forbidden peer "{{peer}}"',
    missing: 'must contain at least one of {{peers}}',
    xor: 'contains a conflict between exclusive peers {{peers}}',
    or: 'must contain at least one of {{peers}}',
    and: 'contains {{present}} without its required peers {{missing}}',
    nand: '!!"{{main}}" must not exist simultaneously with {{peers}}',
    assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
    rename: {
      multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
      override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists'
    },
    type: 'must be an instance of "{{type}}"'
  },
  number: {
    base: '{{key}}必须是数字类型',
    min: '{{key}}的值必须大于或者等于{{limit}}',
    max: '{{key}}的值必须小于或者等于{{limit}}',
    less: 'must be less than {{limit}}',
    greater: 'must be greater than {{limit}}',
    float: 'must be a float or double',
    integer: 'must be an integer',
    negative: 'must be a negative number',
    positive: 'must be a positive number',
    precision: 'must have no more than {{limit}} decimal places',
    ref: 'references "{{ref}}" which is not a number',
    multiple: 'must be a multiple of {{multiple}}'
  },
  string: {
    base: '{{key}}必须是文本类型',
    min: '{{key}}的长度必须大于{{limit}}个字符',
    max: '{{key}}的长度必须小于{{limit}}个字符',
    length: '{{key}}的长度必须是{{limit}}个字符',
    alphanum: 'must only contain alpha-numeric characters',
    token: 'must only contain alpha-numeric and underscore characters',
    regex: {
      base: '{{key}}必须符合正则表达式: {{pattern}}',
      name: '{{key}}必须是{{name}}'
    },
    email: '{{key}}必须是有效的电子邮件',
    uri: '{{key}}必须是一个有效的uri',
    uriCustomScheme: 'must be a valid uri with a scheme matching the {{scheme}} pattern',
    isoDate: 'must be a valid ISO 8601 date',
    guid: 'must be a valid GUID',
    hex: 'must only contain hexadecimal characters',
    hostname: 'must be a valid hostname',
    lowercase: 'must only contain lowercase characters',
    uppercase: 'must only contain uppercase characters',
    trim: 'must not have leading or trailing whitespace',
    creditCard: 'must be a credit card',
    ref: 'references "{{ref}}" which is not a number',
    ip: 'must be a valid ip address with a {{cidr}} CIDR',
    ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
  }
}
