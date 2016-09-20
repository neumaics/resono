const gulp = require('gulp');
const childProcess = require('child_process');
const electron = require('electron-prebuilt');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('default', function() { });

gulp.task('run', ['scripts'], function () {
  childProcess.spawn(electron, ['.'], { stdio: 'inherit' });
});

gulp.task('scripts', () => {
  return gulp.src('app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
