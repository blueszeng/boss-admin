import debug from 'debug'
const log = debug('app:log')
import $ from 'jquery'
import popup from './popup'
if (ENV !== 'production') {
  // Enable the logger.
  debug.enable('*')
  log('Logging is enabled!')
} else {
  debug.disable()
}
if ($('#sysmsg').attr('msg') && $('#sysmsg').attr('status')) {
  popup.toastrPopup($('#sysmsg').attr('status'), $('#sysmsg').attr('msg'))
}
export default log
