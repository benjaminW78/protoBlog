'use strict';

var angular = '';
var app = '';

require('../jquery.min.js');

angular = require('angular');
app = angular.module( 'Back', [require('angular-route')]);

require('./services');
require('./controllers');

app.config(function($routeProvider) {
    $routeProvider

    // route for the private home page
    .when('/', {
        templateUrl: '/html/back/home.html',
        controller: 'homeCtrl',
    })
    .otherwise({
        redirectTo: '/',
    });
});
