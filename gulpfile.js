const gulp = require('gulp')
const sequence = require('run-sequence')
const shell = require('gulp-shell')

require('./task/clean')
require('./task/webpack')

gulp.task('default', function () {
  return sequence('clean', 'webpack-watch')
})