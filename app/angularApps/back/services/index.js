'use strict';

var app = require( 'angular' ).module( 'Back' );
app.service( 'proxy', require( './proxy.service.js' ) );
app.service( 'reRoutage', require( './reRoutage.service.js' ) );
app.service( 'notify', require( './notify.service.js' ) );
app.service( 'blogPostOverViews', require( './blogPostOverViews.service.js' ) );
// app.controller('TodoCtrl', require('./todo'));
// app.controller('TodoListCtrl', require('./todo_list'));
// app.controller('ImprintCtrl', require('./imprint'));
