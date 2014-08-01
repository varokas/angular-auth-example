var gulp = require('gulp');
var bower = require('gulp-bower');
var rimraf = require('gulp-rimraf');
var deploy = require("gulp-gh-pages");
var deploy = require("gulp-gh-pages");

gulp.task('default', function() {
  bower()
    .pipe(gulp.dest('bower_components/'));

  rimraf('./lib');

  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('lib/jquery'));
  gulp.src('bower_components/angular/angular.min.js')
    .pipe(gulp.dest('lib/angular'));
});
