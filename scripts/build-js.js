const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

gulp.src([
    "./src/client/js/main.js"
])
    .pipe(concat("index.js"))
    .pipe(minify())
    .pipe(gulp.dest("./public/scripts"))