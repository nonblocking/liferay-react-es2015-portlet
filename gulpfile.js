'use strict';

const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const open = require('gulp-open');

gulp.task('js-check', function() {
    return gulp.src('src/main/javascript/**/*.js*')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('js-build', [ 'js-check' ], function() {
    browserify('src/main/javascript/boot.jsx', { debug: true })
        .transform(babelify, { presets: [ 'es2015', 'react' ] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('src/main/webapp/js'))
});

gulp.task('js-watch', [ 'js-check' ], function() {
    const bundler = watchify(browserify('src/main/javascript/boot.jsx', { debug: true })
        .transform(babelify, { presets: [ 'es2015', 'react' ] }))
        .on('update', function() {
            console.log('Re-Bundling JavaScript...');
            rebundle();
        });

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulp.dest('src/main/webapp/js'))
            .pipe(livereload());
    }

    rebundle();

});

gulp.task('sass-compile', function() {
    return gulp.src('src/main/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/main/webapp/css'))
        .pipe(livereload());
});

gulp.task('sass-watch', [ 'sass-compile'], function() {
    gulp.watch('src/main/sass/**/*.scss', [ 'sass-compile' ]);
});

gulp.task('watch', [ 'sass-watch', 'js-watch' ], function() {
    livereload({ start: true });
    connect.server({
        root: 'src/main/webapp',
        port: 9000
    });

    gulp.src('src/main/webapp/index.html')
        .pipe(open({ uri: 'http://localhost:9000' }));
});

gulp.task('dist', [ 'sass-compile', 'js-build' ], function() {});

gulp.task('default', [ 'watch' ], function() {});

