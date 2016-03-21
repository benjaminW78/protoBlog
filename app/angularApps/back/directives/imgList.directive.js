'use strict';
var data = function($injector){
    var proxyServ = $injector.get('proxy');
    var $uibModal = $injector.get('$uibModal');

    return {restrict: 'E',
            link:
            function(scope) {
                    scope.imgSelected={};
                    scope.imgArray;
                    scope.getAllFiles = function ($) {
                       var opts = {
                            method: 'get',
                            url: '/api/images'
                        },
                        successCb = function(resData) {
                            if (resData.status === 200) {
                                scope.imgArray=resData.data.kapsule;
                                scope.open('lg');
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                        proxyServ.send(opts).then(successCb,errorCb);
                    };
                    scope.doSelect= function(img){
                            scope.imgSelected = null;
                            scope.imgSelected = img;
                            scope.ok();
                    }
                    scope.open = function (size) {

                        var modalInstance = $uibModal.open({
                            bindToController: true,
                            scope:scope,
                            templateUrl: 'myModalContent.html',
                            animation: false,
                            size: size,
                            resolve: {
                                imgArray: function () {
                                  return scope.imgArray;
                                }
                            }
                        });
                        scope.ok = function () {
                            modalInstance.close();
                        };
                        scope.cancel = function () {
                            modalInstance.dismiss('cancel');
                        };
                    };
            },
            templateUrl: '/html/back/directives/imgList.directive.html',
    };
};

module.exports = data;
