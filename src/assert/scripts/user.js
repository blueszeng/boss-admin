import '../styles/public.css'
import $ from 'jquery'
import log from './modules/log'

// 刷新验证码
const refrushCaptcha = () => {
  $('#getcode').attr('src', `/captcha?uuid=${$('#uuid').val()}&${Math.random()}`)
}

(function main () {
  console.log('refffffff========>')
  refrushCaptcha()
  $('#getcode').click((event) => {
    /* Act on the event */
    log('click..........')
    refrushCaptcha()
  })
})()
