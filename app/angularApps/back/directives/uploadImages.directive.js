'use strict';
var data = function () {
    return {
        restrict   : 'E',
        controller : [ '$scope',
            '$injector',
            function ( $scope, $injector ) {
                var proxyServ = $injector.get( 'proxy' ),
                    Upload = $injector.get( 'Upload' ),
                    $timeout = $injector.get( '$timeout' ),
                    notify = $injector.get( 'notify' ),
                    moment = $injector.get( 'moment' );

                $scope.uploadFiles = function ( files ) {
                    $scope.files = files;
                    if ( files && files.length ) {
                        Upload.upload( {
                            url : '/api/images',
                            type: 'post',
                            data: {
                                files      : files,
                                description: 'img'
                            }
                        } ).then( function ( response ) {
                            $timeout( function () {
                                $scope.result = response.data;
                            } );
                        }, function ( response ) {
                            if ( response.status > 0 ) {
                                $scope.errorMsg = response.status + ': ' + response.data;
                            }
                        }, function ( evt ) {
                            $scope.progress =
                                Math.min( 100, parseInt( 100.0 * evt.loaded / evt.total ) );
                        } );
                    }
                };
            } ],
        templateUrl: '/html/back/directives/uploadImages.directive.html',
    };
};

module.exports = data;
