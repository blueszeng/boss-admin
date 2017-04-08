// Import styles (automatically injected into <head>).
import '../styles/main.css'

// Import a couple modules for testing.
import $ from 'jquery'

// Import a logger for easier debugging.
import debug from 'debug'
const log = debug('app:log')

// The logger should only be enabled if we’re not in production.
if (ENV !== 'production') {
  // Enable the logger.
  debug.enable('*')
  log('Logging is enabled!')

  // Enable LiveReload
  // document.write(
  //   '<script src="http://' + ('localhost').split(':')[0] +
  //   ':35729/livereload.js?snipver=1"></' + 'script>'
  // )
} else {
  debug.disable()
}
// $.ajax({
//   url: `/captcha?uuid=${$('#imgs').attr('uuid')}`,
//   type: 'GET',
//   async: true,
//   timeout: 5000,
//   dataType: 'binary',
//   success: (data, textStatus) => {
//     console.log(data)
//     $('#imgs').attr('src', data)
//   },
//   error: (err, textStatus) => {
//     console.log(err)
//   }
// })
// Run some functions from our imported modules.
const refrushCaptcha = () => {
  $('#imgs').attr('src', `/captcha?uuid=${$('#imgs').attr('uuid')}&${Math.random()}`)
}
refrushCaptcha()
$('#imgs').click((event) => {
  /* Act on the event */
  log('click..........')
  refrushCaptcha()
})

// Print the results on the page.
// printTarget.innerText =
