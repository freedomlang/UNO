'use strict'

/**
 * gulpfile.js
 *
 * Available tasks:
 *  'default'                    : Runs all the pre-setup tasks.
 *  'soft-clean'                 : Only clean js, css and html files.
 *  'heavy-clean'                : Cleans the entire dist folder.
 *  'serve'                      : Runs the default task aswell as the watch task.
 *
 * Modules:
 *  gulp                         : The streaming build system.
 *  pump                         : Prevent pipe breaking caused by errors from gulp plugins.
 *  gulp-sass                    : Sass plugin for Gulp.
 *  gulp-sourcemaps              : Source map support for Gulp.js.
 *  gulp-cssnano                 : Minify CSS with cssnano.
 *  gulp-util                    : Utilities for gulp plugins.
 *  gulp-uglify                  : minify the js
 *  gulp-rename                  : rename files
 *  gulp-file-include            : separate the html files 「public compoments」
 *  gulp-autoprefixer            : add prefix for the css
 *  browser-sync                 : auto reflash the browser
 */

var gulp = require('gulp'),
    cached = require('gulp-cached'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create(),
    pump = require('pump'),
    fs = require('fs-extra'),
    filter = require('gulp-filter');
/**
 * Config Variables
 *
 * Seperated into categories. 
 */

var base = {
    dist: "dist/",
    src: "src/",
    test: "test/"
};

var css = {
    src: "src/scss/main.scss",
    dist: "dist/css/",
    test: "test/css/",
    watch: 'dist/css/**/*.css',
    sourcemaps: "maps/"
};

var js = {
    src: "src/js/**/*.js",
    test: "test/js/",
    dest: "dist/js/",
    watch: "test/js/**/*.js",
    sourcemaps: "maps/"
};

var html = {
    src: "src/**/*.html",
    test: 'test/',
    dest: "dist/",
    build: 'src/build'
};

gulp.task('sass', function() {
    return gulp.src(css.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 5 version'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano()) // 压缩 CSS
        .pipe(sourcemaps.write('.')) // 
        .pipe(gulp.dest(css.dist)) // 输出到 dist/css 目录下，此时每个文件都有压缩（*.min.css）和未压缩(*.css)两个版本
        .pipe(browserSync.reload({ stream: true })); // 使用无刷新 browserSync 注入 CSS
});


/**
 * CSS Tasks
 *
 * sass                           : Compile our SCSS/SASS files directly into CSS.
 * clean-css                      : Clean our css files and vendor files out of the dist folder.
 */

gulp.task('script', function() {
    pump([
            gulp.src(js.src),
            cached('script'),
            sourcemaps.init(),
            uglify(),
            rename({ suffix: '.min' }),
            sourcemaps.write('.'),
            gulp.dest(js.dest)
        ],
        function(err) {
            if (err != undefined) {
                var colors = gutil.colors;
                console.log('\n');
                gutil.log(colors.red('Error!'));
                gutil.log('fileName: ' + colors.red(err.cause.filename));
                gutil.log('lineNumber: ' + colors.red(err.cause.line));
                gutil.log('message: ' + err.cause.message);
                console.log('\n');
            }
        }
    );
});

// copy lib files
gulp.task('libs', function() {
    fs.copy('./src/libs', './test/libs', function(err) {
        if (err) return console.error(err)
        console.log("success!")
    });
    fs.copy('./src/img', './test/img', function(err) {
        if (err) return console.error(err)
        console.log("success!")
    });
})

// html 编译 html 文件
gulp.task('html', function() {
    const f = filter(['*', '!src/build']);
    gulp.src(html.src)
        .pipe(f)
        .pipe(fileinclude())
        // .pipe(plumber())
        .pipe(gulp.dest(html.test));
    console.log('reloaded');
})

gulp.task('watch',['script'], function() {
    browserSync.init(null,{
        open: false,
        proxy: "http://localhost",

    });
});

gulp.task('default', ['watch']);
