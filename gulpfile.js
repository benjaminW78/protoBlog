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
var pathJs = appPath+"angularApps/";
var pathPubJs = appPath+"public/js/";
var pathHtml = appPath+"angularViews/";
var pathStyles = appPath+"styles/";
var pathPubStyles = appPath+"public/css/";
var pathPubHtml = appPath+"public/html/";


// Uses browserify node.js package
function bundle(browserified, fileDir) {
    // gulp.src([pathJs+"/"+fileDir+'**/*.js'])
    // .pipe(eslint({configFile:".eslintrc.js"}))
    // .pipe(eslint.result(function (result) {
    //     // Called for each ESLint result.
    //     if(result.errorCount!==0){
    //         console.log('ESLint result: ' + result.filePath);
    //         for (var i in result.messages){
    //             if(result.messages[i].severity === 2){
    //                 console.log(result.messages[i]);
    //                 console.log('');
    //             }
    //         }
    //         console.log('# Errors: ' + result.errorCount);
    //     }
    // }));
    fileDir =fileDir.substring(0, fileDir.length - 1);
    var filename = 'app.'+fileDir+'.js';

    browserified
    .bundle()
    .pipe(source(filename))
    .pipe(gulp.dest(pathPubJs+fileDir));
}

function browserifyTask(env,fileDir) {
  return function() {
    var browserified = browserify({
      basedir: appPath,
      debug: (env==="dev")?true:false,
      entries: [pathJs+fileDir+"main.js"],
      cache: {},
      packageCache: {}
    });
    if (env === 'prod') {
      browserified.transform({global: true}, 'uglifyify');
    }
    if (env === 'dev') {
        browserified = watchify(browserified);// Englob browserify inside whatchify
        browserified.on('log',function (err) {
            gutil.log(err.toString());
            this.emit('end');
        }); // output build logs to terminal

        browserified.on('update', function(event){
            console.log("rebuild js",event);
            bundle(browserified, fileDir);
            this.emit('end');
        });
    }
    // browserified.transform(stringify(['.html']));
    bundle(browserified, fileDir);
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
gulp.task('browserify-dev-front', browserifyTask('dev','front/'));
gulp.task('browserify-dev-back', browserifyTask('dev','back/'));

gulp.task('dev',["clean:js",'browserify-dev-front','browserify-dev-back','watch-html','watch-css']);
