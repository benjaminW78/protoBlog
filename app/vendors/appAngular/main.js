require('../jquery.min.js');


var angular = require('angular'),
app = angular.module("Blog",[
    require('angular-route')
]);

require('./services');
require('./controllers');

app.config(function($routeProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : '/html/home.html',
    })

    // route for the about page
    .when('/connection', {
        templateUrl : '/html/connection.html',
        controller:'connectionCtrl'
    })
});