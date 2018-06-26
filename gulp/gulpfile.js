"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const nano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const notify = require("gulp-notify");
const jshint = require("gulp-jshint");
const plugins = require("gulp-load-plugins")();
const server = require("browser-sync").create();


gulp.task("sass", function () {
  return gulp.src(["assets/sass/app.scss"])
    .pipe(sass())
    .on("error", notify.onError(function (err) {
      return {
        title: "Styles",
        message: err.message
      };
    }))
    .pipe(autoprefixer())
    .pipe(nano())
    .pipe(gulp.dest("./public/css"));
  
});

gulp.task("scripts", function () {
  return gulp.src([
    "bower_components/jquery/dist/jquery.js",
    "assets/scripts/app.js"
  ])
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./public/js"));
});
// Styles
gulp.task("watch-build", function () {
  gulp.watch("assets/sass/**/**/*.scss", ["sass"]);
  gulp.watch("../*.html").on("change", server.reload)
  gulp.watch("assets/scripts/**/**/*.js", ["scripts"]);
  
});
gulp.task("default", ["sass"]);
gulp.task("watch", ["default", "watch-build"]);
