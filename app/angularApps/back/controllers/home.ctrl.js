'use strict';
var data = ['$scope',
            '$injector',
            function($scope, $injector) {
                var proxyServ = $injector.get('proxy'),
                    reRoutageServ = $injector.get('reRoutage'),
                    blogPostOverViews = $injector.get('blogPostOverViews');

                $scope.loginForm = {};
                $scope.blogPosts = blogPostOverViews.getBlogPostList().then(function(data){ $scope.blogPosts = data});
                $scope.connection = function() {
                    var opts = {
                            method: 'get',
                            url: '/login',
                            getParams: $scope.loginForm,
                        },
                        successCb = function(resData) {
                            if (resData.status === 200) {
                                reRoutageServ.do(resData.data);
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts).then(successCb, errorCb);
                };
            }];

module.exports = data;
