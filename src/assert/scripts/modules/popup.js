import toastr from 'toastr'
import '../../styles/toastr.css'

let toastrTypes = {
    'warning': (message, timeOut) => toastr.warning(message, { timeOut: timeOut }),
    'success': (message, timeOut) => toastr.success(message, { timeOut: timeOut }),
    'error': (message, timeOut) => toastr.error(message, { timeOut: timeOut })
}

// 消息框弹出
const toastrPopup = (type, message, timeOut = 1000) => {
    if (toastrTypes[type]) {
        toastrTypes[type](unescape(message), timeOut)
    }
}

export default {
    toastrPopup
}