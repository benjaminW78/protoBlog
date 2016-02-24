'use strict';

var data = function() {
        return {
            restrict: 'E',
            controller: [
            '$scope',
            '$injector',
            function($scope,$injector) {
                var proxyServ = $injector.get('proxy');
                (function() connection{
                    var opts = {
                            method: 'get',
                            url: '/api/blogPosts',
                        },
                        successCb = function(resData) {
                            if (resData.status === 200) {
                                $scope.blogPosts = resData.data;
                                // $scope.blogPosts=$scope.blogPosts.map(function(data,index,array){
                                //     // data.creation_date = moment(data.creation_date).format('Do MMMM  YYYY, h:mm:ss');
                                // });
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts, successCb, errorCb);
                })();
            }],
            templateUrl: '/html/front/directives/blogPostsSum.directive.html'
        };
    };

module.exports = data;
