const gulp = require('gulp');
const childProcess = require('child_process');
const electron = require('electron-prebuilt');
const babel = require('gulp-babel');
const less = require('gulp-less');
const path = require('path');
const clean = require('gulp-clean');

gulp.task('default', function() { });

gulp.task('run', ['scripts', 'less'], function () {
  childProcess.spawn(electron, ['.'], { stdio: 'inherit' });
});

gulp.task('scripts', ['clean'], () => {
  return gulp.src('app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('less', ['clean'], function () {
  return gulp.src('./app/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.watch('app/**/*', ['clean', 'scripts', 'less']);
