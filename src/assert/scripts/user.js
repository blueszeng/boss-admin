import '../styles/public.css'
import log from './modules/init'
import $ from 'jquery'
// import validator from './utils/validator'
import 'jquery-validation'
const jQuery = $
// 刷新验证码
const refrushCaptcha = () => {
  $('#getcode').attr('src', `/captcha?uuid=${$('#uuid').val()}&${Math.random()}`)
}

// 入口
(function main () {
  refrushCaptcha()
  // dialog({
  //   title: '欢迎',
  //   content: '欢迎使用 arbbtDialog 对话框组件!222'
  // }).show()
  $('#getcode').click((event) => {
    /* Act on the event */
    log('click............')
    // log($('#myform').validate)
    refrushCaptcha()
  })
  console.log($('#myform').validate)
  // let status = validator.validator(8, {
  //   isInteger: true,
  //   // isNotEmptyString: true,
  //   min: 3,
  //   max: 5
  // })
  $('#myform').validate(
    {
      debug: true,
      rules: {
        accounts: {
          required: true,
          minlength: 10,
          remote: 'emails.action'
        },
        password: {
          required: true,
          minlength: 5
        },
        captcha: {
          required: true,
          minlength: 4,
          equalTo: '#1234'
        }
      },
      messages: {
        accounts: {
          required: '用户名不能为空',
          minlength: jQuery.validator.format('必须输入 {0} 个字符'),
          remote: jQuery.validator.format('{0} 已经存在')
        },
        password: {
          required: '密码不能为空',
          minlength: jQuery.validator.format('必须输入 {0} 个字符')
        },
        captcha: {
          required: '验证码不能为空',
          minlength: jQuery.validator.format('必须输入 {0} 个字符')
        }
      }
    }
  )
})()
