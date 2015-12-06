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
                  $scope.logOut = function(el) {
                    console.log(arguments);
                        var opts = {
                            method: 'get',
                            url:"" ,
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
                  };
            }],
            templateUrl: '/html/back/directives/logout.directive.html',
        };
    }   ;

module.exports = data;
