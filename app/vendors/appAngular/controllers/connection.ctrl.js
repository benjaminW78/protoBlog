data = ["$scope",
'proxy',
function($scope,proxy){
    $scope.connection = function(){
    };
    $scope.proxy = proxy.send;
}];

module.exports=data;