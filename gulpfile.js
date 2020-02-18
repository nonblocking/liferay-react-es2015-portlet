'use strict';

const { task, src, series, dest, watch } = require('gulp');
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


function jsBuild() {
    return browserify('src/main/javascript/boot.jsx', { debug: true })
        .transform(babelify, { presets: ['@babel/env', '@babel/preset-react'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify({ mangle: false }))
        .pipe(dest('src/main/webapp/js'))
};

function jsCheck() {
    return src('src/main/javascript/**/*.js*')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

function sassCompile() {
    return src('src/main/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('src/main/webapp/css'))
        .pipe(livereload());
};

task('sass-watch', function () {
    watch('src/main/sass/**/*.scss', sassCompile);
});

task('dist', series(sassCompile, jsCheck, jsBuild));

function server(done) {
    livereload({ start: true });
    connect.server({
        root: 'src/main/webapp',
        port: 9000
    });

    src('src/main/webapp/index.html')
        .pipe(open({ uri: 'http://localhost:9000' }));
    
    done();
}

task('watch', function () {
    watch('src/main/sass/**/*.scss', sassCompile);
    watch('src/main/javascript/**/*.*', series(jsCheck, jsWatch, server));
});


function jsWatch(done) {
    const bundler = watchify(browserify('src/main/javascript/boot.jsx', { debug: true })
        .transform(babelify, { presets: ['@babel/env', '@babel/preset-react'] }))
        .on('update', function () {
            console.log('Re-Bundling JavaScript...');
            rebundle();
        });

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) { console.error(err); this.emit('end'); })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(dest('src/main/webapp/js'))
            .pipe(livereload());
    }

    rebundle();

    done();
}
