data = ["$scope"
function($scope){
    console.log("FDPPPPP")
    $scope.connection = function(){
        console.log(this);
    };
}];

module.exports=data;