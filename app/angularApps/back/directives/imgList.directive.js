'use strict';
var data = function($injector){
    var proxyServ = $injector.get('proxy');
    var $uibModal = $injector.get('$uibModal');
    return {restrict: 'E',
            link:
            function(scope) {
                    scope.imgArray;
                    scope.getAllFiles = function ($) {
                       var opts = {
                            method: 'get',
                            url: '/api/images'
                        },
                        successCb = function(resData) {
                            if (resData.status === 200) {
                                scope.imgArray=resData.data.kapsule;
                                scope.open("lg");
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts).then(successCb,errorCb);

                    $scope.open = function (size) {

                        var modalInstance = $uibModal.open({
                          animation: $scope.animationsEnabled,
                          size: size,
                          resolve: {
                            items: function () {
                              return $scope.items;
                            }
                          }
                        });

                        modalInstance.result.then(function (selectedItem) {
                          $scope.selected = selectedItem;
                        }, function () {
                          $log.info('Modal dismissed at: ' + new Date());
                        });
                    };
                };
            },
            templateUrl: '/html/back/directives/imgList.directive.html',
    };
};

module.exports = data;
