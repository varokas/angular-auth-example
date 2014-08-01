var gulp = require('gulp');
var bower = require('gulp-bower');
var rimraf = require('gulp-rimraf');
var jasmine = require('gulp-jasmine');


gulp.task('default', function() {
  bower()
    .pipe(gulp.dest('bower_components/'));

  rimraf('./lib');

  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('lib/jquery'));
  gulp.src('bower_components/angular/angular.min.js')
    .pipe(gulp.dest('lib/angular'));
});

gulp.task('test', function () {
    return gulp.src('test/**/*.js')
        .pipe(jasmine());
});
