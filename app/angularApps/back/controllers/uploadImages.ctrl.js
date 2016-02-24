'use strict';
var data = ['$scope',
            '$injector',
            function($scope, $injector) {
                var proxyServ = $injector.get('proxy'),
                    Upload = $injector.get('Upload'),
                    $timeout = $injector.get('$timeout'),
                    moment = $injector.get('moment');

                $scope.uploadFiles = function (files) {
                    $scope.files = files;
                    if (files && files.length) {
                        Upload.upload({
                            url: '/api/uploadImages',
                            data: {
                                files: files
                            }
                        }).then(function (response) {
                            $timeout(function () {
                                $scope.result = response.data;
                            });
                        }, function (response) {
                            if (response.status > 0) {
                                $scope.errorMsg = response.status + ': ' + response.data;
                            }
                        }, function (evt) {
                            $scope.progress = 
                                Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        });
                    }
                };
}];
module.exports = data;
