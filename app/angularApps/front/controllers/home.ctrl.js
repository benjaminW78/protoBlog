'use strict';
var data = ['$scope',
            '$injector',
            function($scope, $injector) {
                var proxyServ = $injector.get('proxy'),
                    jquery = $injector.get('notify'),
                    reRoutageServ = $injector.get('reRoutage');

                $scope.imgBase64=''
                $scope.getImage = function(img_uid,jquery) {
                    var opts = {
                            method: 'get',
                            url: '/api/images/'+img_uid
                        },
                        successCb = function(resData) {
                            if (resData.status === 200) {
                                $scope.imgBase64=resData.data.kapsule.fileStream;
                                console.log(resData.data.kapsule.fileStream)
                               jquery('#testConnard').after('<img src="data:'+resData.data.kapsule.data_type+';base64,'+ $scope.imgBase64+'"/>');
                            }
                        },
                        errorCb = function(resData) {
                            console.log(resData, 'ERROR');
                        };
                    proxyServ.send(opts, successCb, errorCb);
                };
                // $scope.getImage(73794,jquery);
            }];

module.exports = data;
