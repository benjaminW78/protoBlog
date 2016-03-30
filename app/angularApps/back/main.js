'use strict';

var angular = '';
var app = '';

require( '../jquery.min.js' );
require( 'bootstrap-notify' )
angular = require( 'angular' );
app = angular.module( 'Back', [ require( "ng-file-upload" ), require( 'angular-route' ), require( 'angular-ui-bootstrap' ) ] );

app.constant( "moment", require( "moment-timezone" ) );
app.constant( "notify", require( "bootstrap-notify" ) );
app.constant( "$", require( '../jquery.min.js' ) );

require( './services' );
require( './controllers' );
require( './directives' );

app.config( function ( $routeProvider ) {
    $routeProvider

    // route for the private home page
        .when( '/', {
            templateUrl: '/html/back/home.html',
            controller : 'homeCtrl',
        } )
        .when( '/createBlogPost/:blogPostId', {
            templateUrl: '/html/back/createBlogPost.html',
            controller : 'createBlogPostCtrl',
        } )
        .when( '/uploadImages', {
            templateUrl: '/html/back/uploadImages.html'
        } )
        .otherwise( {
            redirectTo: '/',
        } );
} );
