'use strict';

var angular = '';
var app = '';

require('../jquery.min.js');

angular = require('angular');
app = angular.module( 'Back', [require('angular-route')]);
app.constant("moment", require("moment-timezone"));

require('./services');
require('./controllers');
require('./directives');


app.config(function($routeProvider) {
    $routeProvider

    // route for the private home page
    .when('/', {
        templateUrl: '/html/back/home.html',
        controller: 'homeCtrl',
    })
    .when('/createBlogPost', {
        templateUrl: '/html/back/createBlogPost.html',
        controller: 'createBlogPostCtrl',
    })
    .otherwise({
        redirectTo: '/',
    });
});
