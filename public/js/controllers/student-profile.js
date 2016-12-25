angular.module('mean.system').controller('StudentProfileController', ['$scope', 'Global','$ProfileService', function ($scope, Global, $ProfileService) {
    $scope.global = Global;


    $ProfileService.get(1, function (response) {
    	console.log(response);
    });
    

    $scope.user = {
    	title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua et dolore magna aliqua consectetur adipisicing elit Ut enim ad minim veniam'
 	};


}]);


  