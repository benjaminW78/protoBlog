'use strict';
var data = [ '$scope',
    '$injector',
    function ( $scope, $injector ) {
        var proxyServ = $injector.get( 'proxy' ),
            $ = $injector.get( '$' ),
            $routeParams = $injector.get( '$routeParams' ),
            moment = $injector.get( 'moment' );

        $scope.blogPostForm = {};

        (function () {
            var opts = {
                    method: 'get',
                    url   : '/api/categories',
                },
                successCb = function ( resData ) {
                    resData.data.kapsule.categories[ 0 ][ "selected" ] = "selected";
                    $scope.categories = resData.data.kapsule.categories;
                },
                errorCb = function ( resData ) {
                    console.log( resData, 'ERROR' );
                };
            proxyServ.send( opts ).then( successCb, errorCb );
        })();

        (function () {
            var opts = {
                    method: 'get',
                    url   : '/api/postStatus',
                },
                successCb = function ( resData ) {
                    resData.data.kapsule.postStatus[ 0 ][ "selected" ] = 'selected';
                    $scope.postStatus = resData.data.kapsule.postStatus;
                },
                errorCb = function ( resData ) {
                    console.log( resData, 'ERROR' );
                };
            proxyServ.send( opts ).then( successCb, errorCb );
        })();

        (function () {
            var opts = {
                    method: 'get',
                    url   : '/api/blogPosts/' + $routeParams.blogPostId
                },
                successCb = function ( resData ) {
                    if ( resData.status === 200 ) {
                        resData.data.kapsule.map( function ( element, index, array ) {
                            for ( var x in element ) {
                                element[ x ] = decodeURI( element[ x ] );
                            }
                            array[ index ] = element;
                        } );
                        $scope.blogPostForm = resData.data.kapsule[ 0 ];
                    }
                },
                errorCb = function ( resData ) {
                    console.log( resData, 'ERROR' );
                };
            proxyServ.send( opts ).then( successCb, errorCb );
        })();

        $scope.insertSelectedImages = function () {
            var cursorPos = $( 'textarea[name="content"]' ).prop( "selectionStart" );
            var v = $( 'textarea[name="content"]' ).val();
            var textBefore = v.substring( 0, cursorPos );
            var textAfter = v.substring( cursorPos, v.length );
            var selectedImgElement = '';
            for ( var obj in $scope.imgSelected ) {
                selectedImgElement += '<img src="/api/images/' + $scope.imgSelected[ obj ].oid + '">';
            }
            $( 'textarea[name="content"]' ).val( textBefore + selectedImgElement + textAfter );
        };

        $scope.$watch( 'imgSelected.length', function ( newValue, oldValue ) {
            if ( newValue !== oldValue ) {
                $scope.insertSelectedImages();
            }
        } );

        $scope.createUpdateBlogPost = function () {
            console.log( $scope.blogPostForm );
            $scope.blogPostForm.timeStamp = moment();
            var objClone = $.extend( objClone, $scope.blogPostForm );
            ;
            for ( var i in objClone ) {
                if ( i !== 'timeStamp' )
                    objClone[ i ] = escape( objClone[ i ] );
            }
            var opts = {
                    method: ($routeParams.blogPostId === 'post_put') ? 'post' : 'put',
                    url   : '/api/blogPosts' + (($routeParams.blogPostId === 'post_put') ? '' : '/' + $routeParams.blogPostId ),
                    data  : objClone,
                },
                successCb = function ( resData ) {
                    console.log( resData );
                    if ( resData.status === 200 && $routeParams.blogPostId === 'post_put' ) {
                        $routeParams.blogPostId = resData.data.kapsule.id;
                    }
                },
                errorCb = function ( resData ) {
                    console.log( resData, 'ERROR' );
                };
            proxyServ.send( opts ).then( successCb, errorCb );
        };
    } ];

module.exports = data;
