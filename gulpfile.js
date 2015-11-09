'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var path = require('path');


var appPath = __dirname+"app/";
var pathJs = appPath+"vendors/";
var pathPubJs = appPath+"public/js/";
var pathHtml = appPath+"views/";
console.log(appPath,pathJs,pathHtml);
// Uses browserify node.js package
function bundle(browserified, env) {
  console.log(browserified);
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
      entries: pathJs+"appAngular/main.js",
      cache: {},
      packageCache: {},
      fullPaths: appPath,
    });

    if (env === 'prod') {
      browserified.transform({global: true}, 'uglifyify');
    }
    if (env === 'dev') {
       browserified = watchify(browserified);
       browserified.on('update', function(){
        bundle(browserified, env);
      });
    }

    bundle(browserified, env);
  }
}

// Calls browserify function
gulp.task('browserify-dev', browserifyTask('dev'));
