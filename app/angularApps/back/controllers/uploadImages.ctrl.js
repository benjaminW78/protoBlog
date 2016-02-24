'use strict';
var data = ['$scope',
            '$injector',
            function($scope, $injector) {
                var proxyServ = $injector.get('proxy'),
                    moment = $injector.get('moment');

                $scope.blogPostForm = {};


                $scope.storeImages = function() {
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
