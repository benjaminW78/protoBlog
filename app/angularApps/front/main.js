'use strict';

var angular = '';
var app = '';

require('../jquery.min.js');

angular = require('angular');
app = angular.module( 'Front', [require('angular-route')]);

    require('./services');
    require('./controllers');

app.config(function($routeProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl: '/html/front/home.html',
    })

    // route for the about page
    .when('/connection', {
        templateUrl: '/html/front/connection.html',
        controller: 'connectionCtrl',
    })

    .otherwise({
        redirectTo: '/',
    });
});
