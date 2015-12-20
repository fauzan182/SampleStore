var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');


var sources = {
  javascript: {
    source: './lib/javascripts/application.jsx',
    distribution: './dist/javascripts'
  }
}

function compile () {
  return browserify({
    debug: true,
    extensions: ['.js', '.jsx'],
    entries: sources.javascript.source
  })
  .transform(babelify)
  .bundle()
  .pipe(source('application.js'))
  .pipe(buffer())
}

gulp.task('compile', function () {
  return compile()
  .pipe(gulp.dest(sources.javascript.distribution))
})

gulp.task('build', function () {
  return compile()
  .pipe(uglify())
  .pipe(gzip())
  .pipe(gulp.dest(sources.javascript.distribution))
})

gulp.task('watch', function() {
  gulp.watch(["./lib/javascripts/*", './lib/javascripts/*/**'], ['compile'])
})


gulp.task('default', ['compile'])
