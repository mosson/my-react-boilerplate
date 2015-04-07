"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var server = require("gulp-webserver");

gulp.task("browserify", function () {
  browserify({
    "entries": ['./src/main.js'],
    "transform": [
        ["reactify", {
          "es6": false,
          "harmony": false
        }]
    ]
  })
    .bundle()
    .pipe(source("main.js"))
    .pipe(gulp.dest("./dist"))
});

gulp.task("server", function () {
  gulp.src("./dist")
    .pipe(server({
      livereload      : {
        enable: true
      },
      directoryListing: false,
      open            : false
    }))
});

gulp.task("build", ["browserify"]);

gulp.task("watch", ["server"], function () {
  gulp.watch("./src/**/*.js", ['build']);
});