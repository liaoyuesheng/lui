/**
 *
 *
 *
 *
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var minify_css = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// 合并js
var jsArr = ['src/js/wrap-start.js.txt','src/js/select.js','src/js/wrap-end.js.txt'];

gulp.task('concat', function(){
    gulp.src(jsArr)
        .pipe(concat('lui.js'))
        .pipe(gulp.dest('dist/js'));
});

// less
gulp.task('less', function(){
    return gulp.src(['src/less/*.less','!src/less/_*.less'])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoPrefixer())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist/css'));

});

// 压缩css
gulp.task('less-cssmin', ['less'], function(){
    return gulp.src(['dist/css/*.css','!dist/css/*.min.css'])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(minify_css({advanced:false,keepSpecialComments: '*'}))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'));
});

// dist 输出
gulp.task('dist', ['concat','less-cssmin']);

// 监听
gulp.task('default', ['dist'], function () {
    gulp.watch(['src/js/**'], ['concat']);
    gulp.watch(['src/less/**'], ['less-cssmin']);
});
