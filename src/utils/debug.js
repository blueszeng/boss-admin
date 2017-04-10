import debug from 'debug'
import config from '../configs/config'
console.log(config.env)
if (config.env !== 'production') {
  // Enable the logger.
  debug.enable('*')
  console.log('Logging is enabled!')
} else {
  debug.disable()
}
module.exports = (disable) => {
  return debug(disable)
}
