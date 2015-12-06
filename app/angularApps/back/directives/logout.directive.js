'use strict';

var data = function() {
        return {
            restrict: 'E',
            controller: [
            '$scope',
            '$injector',
            function($scope,$injector) {
                var proxyServ = $injector.get('proxy'),
                    reRoutageServ = $injector.get('reRoutage');
                  $scope.logOut = function(urlParam) {
                    console.log(arguments)
                        var opts = {
                            method: 'get',
                            url:urlParam ,
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
            }],
            templateUrl: '/html/back/directives/logout.directive.html',
        };
    }   ;

module.exports = data;
