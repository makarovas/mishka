let gulp = require('gulp');
let sass = require('gulp-sass');
let nano = require('gulp-cssnano');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');


gulp.task('sass', function () {
  return gulp.src(['assets/sass/app.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(nano())
    .pipe(gulp.dest('./public/css'));
  
});

gulp.task('scripts', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'assets/scripts/app.js'
  ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch-build', function () {
  gulp.watch('assets/sass/**/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/**/**/*.js', ['scripts']);
  
});
gulp.task('default', ['sass']);
gulp.task('watch', ['default', 'watch-build']);
