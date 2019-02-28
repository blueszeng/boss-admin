import debug from 'debug'
if (ENV !== 'production') {
    // Enable the logger.
    debug.enable('*')
    console.log('Logging is enabled!')
} else {
    debug.disable()
}
const _debug = function(disable) {
    return debug(disable)
}

export default {
    debug: _debug
}