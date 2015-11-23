'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var stringify = require('stringify');
var del = require('del');
var eslint = require('gulp-eslint');

var appPath = __dirname+"/app/";
var pathJs = appPath+"vendors/";
var pathPubJs = appPath+"public/js/";
var pathHtml = appPath+"views/";
var pathStyles = appPath+"styles/";
var pathPubStyles = appPath+"public/css/";
var pathPubHtml = appPath+"public/html/";


// Uses browserify node.js package
function bundle(browserified, env) {
    gulp.src([pathJs+'/appAngular/**/*.js'])
    .pipe(eslint({configFile:".eslintrc.js"}))
    .pipe(eslint.result(function (result) {
        // Called for each ESLint result.
        if(result.errorCount!==0){
            console.log('ESLint result: ' + result.filePath);
            for (var i in result.messages){
                if(result.messages[i].severity === 2){
                    console.log(result.messages[i]);
                    console.log('');
                }
            }
            console.log('# Errors: ' + result.errorCount);
        }
    }));
    browserified
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(pathPubJs));
}

function browserifyTask(env) {
  return function() {
    var file = path.resolve(pathJs+"appAngular/main.js");
    var browserified = browserify({
      basedir: appPath,
      debug: (env==="dev")?true:false,
      entries: [pathJs+"appAngular/main.js"],
      cache: {},
      packageCache: {}
    });

    if (env === 'prod') {
      browserified.transform({global: true}, 'uglifyify');
    }
    if (env === 'dev') {
        browserified = watchify(browserified);// Englob browserify inside whatchify
        browserified.on('log', gutil.log); // output build logs to terminal

        browserified.on('update', function(event){
            console.log("rebuild js",event);
            bundle(browserified, env);
        });
    }

    // browserified.transform(stringify(['.html']));
    bundle(browserified, env);
  };
}


gulp.task('clean:html', function () {
  return del([
    pathPubHtml+'**/*',
  ]);
});

gulp.task('clean:js', function () {
  return del([
    pathPubJs+'**/*',
  ]);
});

gulp.task('clean:css', function () {
  return del([
    pathPubStyles+'**/*',
  ]);
});
gulp.task('esLinter', function () {
  return del([
    pathPubStyles+'**/*',
  ]);
});


gulp.task('watch-html', function(){
    gulp.watch(pathHtml+'**/*',['deploy-html']);
});
gulp.task('deploy-html',['clean:html'],function(){
    return gulp.src(pathHtml+'**/*.html')
    .pipe(gulp.dest(pathPubHtml));
});


gulp.task('watch-css', function(){
    gulp.watch(pathStyles+'**/*',['deploy-css']);
});
gulp.task('deploy-css',function(){
    return gulp.src(pathStyles+'**/*.css')
    .pipe(gulp.dest(pathPubStyles));
});


// Calls browserify function
gulp.task('browserify-dev',['clean:js'], browserifyTask('dev'));

gulp.task('dev',['browserify-dev','watch-html','watch-css']);
