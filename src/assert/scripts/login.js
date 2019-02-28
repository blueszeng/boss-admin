// import '../styles/public.css'
import log from './modules/init'
import $ from 'jquery'

// function 方法
// 刷新验证码
const refrushCaptcha = () => {
    $('#getcode').attr('src', `/captcha?uuid=${$('#uuid').val()}&${Math.random()}`)
}

//  入口
(function main() {
    // 初始化 获取验证码
    refrushCaptcha()

    // 点击获取验证码
    $('#getcode').click((event) => {
        /* Act on the event */
        log('click getcode..')
        refrushCaptcha()
    })
})()