'use strict';


var app = require('angular').module('Back');
app.service('proxy', require('./proxy.service.js'));
app.service('reRoutage', require('./reRoutage.service.js'));
// app.controller('FooterCtrl', require('./footer'));
// app.controller('TodoCtrl', require('./todo'));
// app.controller('TodoListCtrl', require('./todo_list'));
// app.controller('ImprintCtrl', require('./imprint'));
