'use strict';
var data = ['$scope',
            '$injector',
            function($scope, $injector) {
                var proxyServ = $injector.get('proxy'),
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


                $scope.createBlogPost = function() {
                    console.log($scope.blogPostForm);
                    $scope.blogPostForm.timeStamp = moment();
                    var opts = {
                            method: 'post',
                            url: '/api/blogPosts',
                            data: $scope.blogPostForm,
                        },
                        successCb = function(resData) {
                            if (resData.status === 200) {
                                console.log(resData);
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts).then(successCb, errorCb);
                };
            }];

module.exports = data;
