'use strict';
//  create a index.js file inside every js directory and require only the path with browserify !
var app = require('angular').module('Front');
app.controller('homeCtrl', require('./home.ctrl.js'));
app.controller('connectionCtrl', require('./connection.ctrl.js'));
// app.controller('FooterCtrl', require('./footer'));
// app.controller('TodoCtrl', require('./todo'));

