'use strict';
var data = ['$scope',
            '$injector',
            function($scope, $injector) {
                var proxyServ = $injector.get('proxy'),
                    $ = $injector.get('$'),
                    $routeParams = $injector.get('$routeParams'),
                    moment = $injector.get('moment');

                $scope.blogPostForm = {};

                (function(){
                    var opts = {
                            method: 'get',
                            url: '/api/categories',
                        },
                        successCb = function(resData) {
                            resData.data.kapsule.categories[0]["selected"] = "selected";
                            $scope.categories=resData.data.kapsule.categories;
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts).then(successCb, errorCb);
                })();

                (function(){
                    var opts = {
                            method: 'get',
                            url: '/api/postStatus',
                        },
                        successCb = function(resData) {
                            console.log(resData.data.kapsule.postStatus[0])
                            resData.data.kapsule.postStatus[0]["selected"] = 'selected';
                            $scope.postStatus=resData.data.kapsule.postStatus;
                            console.log($scope.postStatus);
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts).then(successCb, errorCb);
                })();

                $scope.insertSelectedImages =function(){
                    var cursorPos = $('textarea[name="content"]').prop("selectionStart");
                    var v = $('textarea[name="content"]').val();
                    var textBefore = v.substring(0,  cursorPos);
                    var textAfter  = v.substring(cursorPos, v.length);
                    $('textarea[name="content"]').val(textBefore + '<img src="/api/images/'+$scope.imgSelected.oid+'">' + textAfter);
                };

               $scope.$watch('imgSelected',function(newValue,oldValue){
                     if ( newValue &&oldValue && newValue.oid !== oldValue.oid ) {
                        $scope.insertSelectedImages();
                     }
                });

                $scope.createUpdateBlogPost = function() {
                    console.log($scope.blogPostForm);
                    $scope.blogPostForm.timeStamp = moment();
                    var objClone = $.extend( objClone, $scope.blogPostForm); ;
                    for (var i in objClone){
                        if(i!=='timeStamp')
                        objClone[i] = escape(objClone[i]);
                    }
                    var opts = {
                            method:  ($routeParams.blogPostId === 'post_put')?'post':'put',
                            url: '/api/blogPosts'+(($routeParams.blogPostId === 'post_put')?'':'/'+$routeParams.blogPostId ),
                            data: objClone,
                        },
                        successCb = function(resData) {
                            console.log(resData);
                            if (resData.status === 200 && $routeParams.blogPostId === 'post_put' ) {
                                $routeParams.blogPostId = resData.data.kapsule.id;
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts).then(successCb, errorCb);
                };
            }];

module.exports = data;
