var babel = require('rollup-plugin-babel')
var rollup = require('rollup')
rollup.rollup({
  entry: 'src/public/javascript/main.js',
  plugins: [
    babel({
    })]
}).then(function (bundle) {
  console.log('32423423')
  bundle.write({
    format: 'iife',
    moduleName: 'main',
    dest: 'src/task/bundle.js'
  })
}).catch(function (err) {
  console.log('err', err)
})
