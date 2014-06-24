var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var qunit  = require('gulp-qunit');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
    return gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(concat('jquery.revealing.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.revealing.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js',   ['lint', 'scripts']);
    gulp.watch('src/*.scss', ['styles']);
});

gulp.task('qunit', function() {
    return gulp.src('./test/test-runner.html')
        .pipe(qunit())
        .on('error', function(err) {
            errorCode = 1;
            process.emit('exit', [errorCode]);
        });
});

process.on('exit', function (errorCode) {
    process.exit(errorCode);
});

gulp.task('build', ['scripts', 'styles']);
gulp.task('test', ['lint', 'build', 'qunit']);
gulp.task('default', ['lint', 'build', 'watch']);