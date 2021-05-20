const {src,dest,watch} = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

function copyIndex(){
    return src('./src/index.html').pipe(dest('./dist'));
}
function css(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
function js(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
function img(){
    return src('./src/imgs/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
function html(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'));
}
function fnWatch(){
    watch('./src/index.html',copyIndex);
    watch('./src/sass/*.scss',css);
    watch('./src/js/*.js',js);
    watch('./src/pages/*.html',html);
}
exports.index = copyIndex;
exports.js = js;
exports.css = css;
exports.img = img;
exports.html = html;
exports.default = fnWatch;