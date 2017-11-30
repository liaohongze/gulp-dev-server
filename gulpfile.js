var gulp = require('gulp');
var jshint = require('gulp-jshint');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var stylelint = require('stylelint');
var syntax_scss = require('postcss-scss')
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// var processors = [
//   stylelint('./.stylelintrc'),
//   reporter({
//     clearMessages: true,
//     throwError: true
//   })
// ]

gulp.task('sass', function() {
  gulp.src('app/scss/*.scss')
    .pipe(postcss([
      stylelint(),
      reporter()
    ], {syntax: syntax_scss}))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'Firefox >= 20'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }));
});

gulp.task('jshint', function() {
  gulp.src('./app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(reload({ stream:true }));
});

gulp.task('default', ['sass', 'jshint'], function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['jshint']);
  gulp.watch('app/js/img/*.*', ['sass', 'jshint']);
  gulp.watch("app/*.html").on('change', reload);
  gulp.watch("app/page/*.html").on('change', reload);
});