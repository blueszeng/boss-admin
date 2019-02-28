import debug from './debug'
import popup from './popup'
import $ from 'jquery'
const log = debug.debug('app:log')

if ($('#sysmsg').attr('msg') && $('#sysmsg').attr('status')) {
    popup.toastrPopup($('#sysmsg').attr('status'), $('#sysmsg').attr('msg'))
}
export default log