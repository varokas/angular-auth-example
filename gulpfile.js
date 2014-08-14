var gulp = require('gulp');
var bower = require('gulp-bower');
var rimraf = require('gulp-rimraf');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var bg = require("gulp-bg");

var karmaConf = {
  browsers: ['PhantomJS'],
  frameworks: ['jasmine'],
  files: [
    'lib/**/*.js',
    'js/**/*.js',
    'testlib/**/*.js',
    'test/**/*.spec.js'
  ],
  singleRun: true
};


gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('bower_components/'));
});

gulp.task('lib', function() {
  rimraf('./lib');

  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('lib/jquery'));
  gulp.src('bower_components/angular/angular.min.js')
    .pipe(gulp.dest('lib/angular'));

  rimraf('./testlib');

  gulp.src('bower_components/angular-mocks/angular-mocks.js')
    .pipe(gulp.dest('testlib/angular-mocks'));
})

gulp.task('test', function (done) {
  karma.start(karmaConf, done);
});

gulp.task("sample-server", bg("node", "app.js"));

gulp.task('spec', function () {
  gulp.src('spec/server_spec.js')
      .pipe(jasmine());
});
