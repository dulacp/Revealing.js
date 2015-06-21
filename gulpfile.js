var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var qunit  = require('gulp-qunit');
var header = require('gulp-header');
var clean = require('gulp-clean');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' *',
  ' * Copyright (c) <%= year %> <%= pkg.author.name %>',
  ' * LICENSED <%= pkg.licenses.map(function(l){ return l.type; }).join(" ") %>',
  ' */',
  ''].join('\n');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
    return gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
        .pipe(gulp.dest('examples/assets'))
        .pipe(minify({keepBreaks:true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(concat('revealing.js'))
        .pipe(header(banner, { pkg: pkg, year: (new Date()).getFullYear() }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('examples/assets'))
        .pipe(rename('revealing.min.js'))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg, year: (new Date()).getFullYear() }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js',   ['lint', 'scripts']);
    gulp.watch('src/*.scss', ['styles']);
});

process.on('exit', function (errorCode) {
    process.exit(errorCode);
});

gulp.task('clean', function () {
    return gulp.src(['dist'], { read: false }).pipe(clean());
});


gulp.task('build', ['clean', 'scripts', 'styles']);
gulp.task('default', ['lint', 'build', 'watch']);