'use strict';

var gulp = require('gulp'),
    argv = require('yargs').argv,
    sass = require('gulp-sass'),
    bower = require('gulp-bower'),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create(),
    angularFilesort = require('gulp-angular-filesort'),
    es = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    proxy = require('proxy-middleware'),
    nodemon = require('gulp-nodemon'),
    config = require('./libs/config');

 var mode = argv.m || config.get('gulp:defaults:path');
 var defPath = config.get('paths:' + mode);

gulp.task('sass', function () {
  return gulp.src([defPath + '/assets/styles/scss/**/*.scss', '!' + defPath + '/assets/styles/scss/**/colors.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(defPath + '/assets/styles/css'));
});

gulp.task('inject', ['sass'], function() {
    return gulp.src(defPath + '/index.html')
        .pipe(
            inject(es.merge(
                gulp.src(defPath + '/assets/styles/css/**/*.css'),
                gulp.src(defPath + '/app/**/*.js')
                    .pipe(angularFilesort())
            )
            , {relative: true})
        )
        .pipe(
            inject(gulp.src(
                bowerFiles(),
                {base: './bower_components'}
            )
            .pipe(gulp.dest(defPath + '/assets'))
            , {name: 'bower', relative: true})
        )
        .pipe(gulp.dest(defPath));
});

gulp.task('bower-update', function() {
    return bower({ directory: './bower_components', cwd: defPath, cmd: 'update'});
});

gulp.task('serve', ['nodemon'], function() {
    var proxy = config.get('hostname') + ":" + config.get('ports:express');
    var bs_port = config.get('ports:browser_sync:' + mode);
    var bs_options = {
        proxy: proxy,
        files: [defPath + "/**/*.*"],
        //browser: "google chrome",
        port: bs_port
    }
    if(mode != config.get('gulp:defaults:path')) {
        bs_options.startPath = "/admin";
    }

    browserSync.init(null, bs_options);
});

 gulp.task('nodemon', function (cb) {
    var called = false;
    var express_run_script = config.get('express_run_script');
    return nodemon(
        {
            script: express_run_script,
            ext: 'js',
            ignore: config.get('nodemon:ignore')
        }
    ).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});

gulp.task('watch', ['bower-update', 'sass', 'inject', 'serve'], function() {
    gulp.watch(defPath + '/assets/styles/scss/**/*.scss', ['sass']);
    gulp.watch(defPath + '/assets/styles/**/*.css', ['inject']);
    gulp.watch(defPath + '/**/*.js', ['inject']);
});

gulp.task('default', ['watch'], function() {
    console.log("Mode: " + mode);
});
