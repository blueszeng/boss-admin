import '../styles/public.css'
import $ from 'jquery'
import log from './modules/init'
import dialog from 'art.dialog'
// 刷新验证码
const refrushCaptcha = () => {
  $('#getcode').attr('src', `/captcha?uuid=${$('#uuid').val()}&${Math.random()}`)
}

// 入口
(function main () {
  refrushCaptcha()
  dialog({
    title: '欢迎',
    content: '欢迎使用 arbbtDialog 对话框组件isisiSUB！'
  }).show()
  $('#getcode').click((event) => {
    /* Act on the event */
    log('click...........')
    refrushCaptcha()
  })
})()
