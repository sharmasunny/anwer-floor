angular.module('mean.system').controller('StudentProfileController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.user = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua et dolore magna aliqua consectetur adipisicing elit Ut enim ad minim veniam'
  };
}]);