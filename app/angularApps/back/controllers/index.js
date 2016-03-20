'use strict';
//  create a index.js file inside every js directory and require only the path with browserify !
var app = require('angular').module('Back');
app.controller('homeCtrl', require('./home.ctrl.js'));
app.controller('createBlogPostCtrl', require('./createBlogPost.ctrl.js'));
// app.controller('FooterCtrl', require('./footer'));
// app.controller('TodoCtrl', require('./todo'));
// app.controller('TodoListCtrl', require('./todo_list'));
// app.controller('ImprintCtrl', require('./imprint'));

