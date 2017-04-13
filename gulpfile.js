var rollup = require('gulp-rollup-mep')
var gulp = require('gulp')
var babel = require('rollup-plugin-babel')
var eslint = require('rollup-plugin-eslint')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var replace = require('rollup-plugin-replace')
var uglify = require('rollup-plugin-uglify')
var postcss = require('rollup-plugin-postcss')
var simplevars = require('postcss-simple-vars')
var nested = require('postcss-nested')
var cssnext = require('postcss-cssnext')
var cssnano = require('cssnano')
var cache = {}

gulp.task('watch', function () {
  gulp.watch('src/assert/scripts/**/*', ['rollup'])
})
gulp.task('rollup', function () {
  return gulp.src('src/assert/scripts/*.js')
  .pipe(
    rollup({ plugins: [
      postcss({
        plugins: [
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false }),
          cssnano()
        ],
        extensions: [ '.css' ]
      }),
      resolve({
        jsnext: true,
        browser: true,
        main: true
      }),
      commonjs(),
      eslint({
        exclude: [
          'src/assert/styles/**'
        ]
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            'es2015',
            {
              'modules': false
            }
          ]
        ],
        plugins: [
          'external-helpers'
        ],
        babelrc: false
      }),
      replace({
        // exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      (process.env.NODE_ENV === 'production' && uglify())
    ]}), cache, function (bundle, filePath) {
      // cache[filePath] = bundle
    })
    .pipe(gulp.dest('src/public/js'))
})
