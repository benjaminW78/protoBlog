'use strict';

var app = require( 'angular' ).module( 'Back' );
app.directive( 'btnLogout', require( './logout.directive.js' ) );
app.directive( 'formUploadImages', require( './uploadImages.directive.js' ) );
app.directive( 'imgList', require( './imgList.directive.js' ) );
