/* jshint node: true */
'use strict';
require('coffee-script/register');

var
  gulp = require('gulp'),
  jasmine = require('gulp-jasmine'),
  reporters = require('jasmine-reporters'),
  coffee = require('gulp-coffee'),
  nodemon = require('gulp-nodemon');

// gulp.task('test', function(){
//   return gulp.src('test/**/*Spec.{js,coffee}')
//     .pipe(jasmine({
//       reporter: new reporters.TerminalReporter()
//     }));
// });

gulp.task('watch', function(){
  gulp.watch([
    'test/**/*Spec.{js,coffee}',
    'src/**/*.{js,coffee}',
    'coffee/**/*.{js,coffee}'
], ['coffee']);
});

gulp.task('coffee', function() {
  gulp.src('./coffee/**/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
  , env: { 'NODE_ENV': 'development' }
  })
})


gulp.task('default', ['coffee', 'start','watch']);
