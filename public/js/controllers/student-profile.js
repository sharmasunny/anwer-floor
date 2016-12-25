angular.module('mean.system').controller('StudentProfileController', ['$scope', 'Global','$ProfileService', function ($scope, Global, $ProfileService) {
    $scope.global = Global;

    $ProfileService.get(1, function (response) {
    	console.log(response);
    });
    
}]);

