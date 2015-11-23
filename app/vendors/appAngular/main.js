'use strict';

var angular = '';
var app = '';

require('../jquery.min.js');

angular = require('angular');
app = angular.module( 'Blog', [require('angular-route')]);

require('./services');
require('./controllers');

app.config(function($routeProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl: '/html/home.html',
    })

    // route for the about page
    .when('/connection', {
        templateUrl: '/html/connection.html',
        controller: 'connectionCtrl',
    })
    // route for the about page
    .when('/admin/home', {
        templateUrl: '/html/admin/home.html',
        controller: 'connectionCtrl',
    })
    .otherwise({
        redirectTo: '/',
    });
});
