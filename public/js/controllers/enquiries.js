angular.module('mean.system').controller('EnquiriesController', ['$scope', '$state', '$EnquiryService', '$SessionService', 'Global', function ($scope, $state, $EnquiryService, $SessionService, Global) {
    $scope.global = Global;

    $scope.getProfileEnquiries = function() {
        $scope.authUser = $SessionService.user();
        $EnquiryService.get(function(response) {
            if (Object.keys(response.result).length > 0) {
                console.log('success',response.result);
                $scope.enquiries = response.result;
            };
        })
    }

    $scope.getProfileEnquiries();
}]);