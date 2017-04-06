const _ = require('lodash')
const development = require('./development')
const production = require('./production')

const env = process.env.NODE_ENV || 'development'
const configs = {
  development: development,
  production: production
}
const defaultConfig = {
  env: env,
  salt: 'zengyong'
}

const config = _.merge(defaultConfig, configs[env])
console.log(config)
module.exports = config
