import debug from 'debug'
const log = debug('app:log')
if (ENV !== 'production') {
  // Enable the logger.
  debug.enable('*')
  log('Logging is enabled!')
} else {
  debug.disable()
}
export default log
