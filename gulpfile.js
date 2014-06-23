'use strict';

var gulp = require('gulp')
    , $ = require('gulp-load-plugins')()
    , browserSync = require('browser-sync')
    , runSequence = require('run-sequence')
    , del = require('del')
    , dist = 'dist'
    , src = {
          index: 'app/index.html'
        , robots: 'app/robots.txt'
        , scripts: 'app/scripts/**/*.js'
        , styles: 'app/styles/**/*.css'
        , html: 'app/**/*.html'
        , images: 'app/images/**/*'
    }
    , dst = {
          scripts: 'dist/scripts'
        , styles: 'dist/styles'
        , images: 'dist/images'
    }
    , reload = browserSync.reload
;

gulp.task('jshint', function () {
    return gulp.src(src.scripts)
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size())
        .pipe(reload({stream: true}))
    ;
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('images', function () {
    return gulp.src(src.images)
        .pipe($.cache($.imagemin({progressive: true, interlaced: true})))
        .pipe(gulp.dest(dst.images))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size({title: 'images'}))
    ;
});

gulp.task('styles', function () {
    return gulp.src(src.styles)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(dst.styles))
        .pipe(reload({stream: true}))
        .pipe($.size({title: 'styles'}));
    ;
});

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}))
    ;
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: ['app', '.tmp']
        },
        notify: false
    });
    gulp.watch(src.html, reload);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(['.tmp/styles/**/*.css'], reload);
    gulp.watch(src.scripts, ['jshint']);
    gulp.watch(src.images, ['images']);
});

gulp.task('default', ['clean'], function (cb) {
    runSequence('styles', ['jshint', 'html', 'images'], cb);
});
