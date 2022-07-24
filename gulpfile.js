'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var gulpConnect   = require('gulp-connect');
var gulpConcat    = require('gulp-concat');
var gulpHtmlmin   = require('gulp-htmlmin');    // minify Html
var gulpMinifyCss = require('gulp-minify-css'); // minify Css
var gulpUglify    = require('gulp-uglify');     // minify Js   
var imagemin      = require('gulp-imagemin');

// --- minify HTML ---
gulp.task('minify-html', async function () {
    gulp.src('./src/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(gulpConnect.reload());
}); 

// --- compile SASS --
gulp.task('compile-sass', async function () {   
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpMinifyCss({
            compatibility: 'ie8',
            processImport: false
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(gulpConnect.reload());
});

// -- minify js ---
gulp.task('minify-js', async function () {
    gulp
        .src([
            './src/js/*.js',
        ])
        .pipe(gulpUglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(gulpConnect.reload());
});

// -- plugin js ---
gulp.task('compile-js-plugin', async function () {
    gulp
        .src([
            './node_modules/jquery/dist/jquery.js', // jquery
            './node_modules/bootstrap/dist/js/bootstrap.bundle.js', // bootstrap
            './node_modules/typed.js/lib/typed.js', // typed.js
            './node_modules/gsap/dist/gsap.js', // gsap.js
            './node_modules/gsap/dist/ScrollTrigger.js', // gsap.js
        ])
        // .pipe(gulpConcat('bundle.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(gulpConnect.reload());
});

gulp.task('imagemin', async function() {
    var imgSrc = './src/images/*.{svg,webp}',
    imgDst = 'public/images';
    
    gulp.src(imgSrc)
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 100, progressive: true}),
        imagemin.optipng({optiminzationLevel: 10})
    ]))
    .pipe(gulp.dest(imgDst))
    .pipe(gulpConnect.reload());
});

gulp.task('others', async function() {
    gulp
        .src(['src/**/*', '!./src/*.html', '!./src/sass**/*', '!./src/js**/*', '!./src/images/**/*'])
        .pipe(gulp.dest('public'))
        .pipe(gulpConnect.reload());
});

// -- Watchin All Task --
gulp.task('watch', async function () {
    gulp.watch('./src/*.html', gulp.series('minify-html'));
    gulp.watch('./src/sass/*.scss', gulp.series('compile-sass'));
    gulp.watch('./src/js/*.js', gulp.series('minify-js'));
    gulp.watch('./src/images/*.{svg,webp}', gulp.series('imagemin'));
    // gulp.watch(['src/**/*'], gulp.series('others'));
});

// -- Run Server --
gulp.task('server', async function(){
    gulpConnect.server({
        root: "public",
        livereload: true
    });
});

gulp.task('build', gulp.series(
    'minify-html', 
    'compile-sass', 
    'minify-js', 
    'compile-js-plugin', 
    'imagemin', 
    // 'others'
));

gulp.task('default', gulp.series('build', 'watch', 'server'));