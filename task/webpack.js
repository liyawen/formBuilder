const gulp = require('gulp')
const webpack = require('webpack')
const gulpWebpack = require('gulp-webpack')
const defaultsDeep = require('merge-defaults')

const webpackConfig = require('./webpack.config')

gulp.task('webpack-watch', function () {
  return gulp.src('./src/static/index.js')
    .pipe(gulpWebpack(defaultsDeep({
      watch: true
    }, webpackConfig)))
    .pipe(gulp.dest('build'))
})