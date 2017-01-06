angular.module('mean.system').controller('EnquiriesController', ['$scope', '$state', '$log', '$uibModal', '$EnquiryService', '$SessionService', 'Global', function ($scope, $state, $log, $uibModal, $EnquiryService, $SessionService, Global) {
    $scope.global = Global;

    $scope.getProfileEnquiries = function() {
        $scope.authUser = $SessionService.user();
        $EnquiryService.get(function(response) {
            if (Object.keys(response.result).length > 0) {
                var now = moment();
                $scope.enquiries = response.result;
                console.log('enquiries>>',$scope.enquiries)
                $scope.enquiries_length = $scope.enquiries.length;
                for (var i=0; i<$scope.enquiries.length; i++){
                	var then = moment($scope.enquiries[i].createdAt);
                	var duration = moment.duration(now.diff(then))
                	var days = parseInt(duration.asDays());
				 	var months = parseInt(duration.asMonths());
				 	var hours = parseInt(duration.asHours());
				 	var minutes = parseInt(duration.asMinutes());
				 	if(minutes < 60){
				 		var created = minutes + ' minutes';
				 	}
				 	else if(minutes > 60 && minutes < 1440 ){
				 		var created = hours + ' hours';
				 	}
				 	else if(hours >= 24 && hours < 720){
				 		var created = days + ' days';
				 	}else{
				 		var created = months + ' months';
				 	}
					$scope.enquiries[i].createdAt = created;
                }
            };
        })
    }

	$scope.getProfileEnquiries();

	/***************Enquiry Modal***********/
    $scope.postRequirements = function() {
        $scope.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'requirementModal.html',
            controller: 'RequirementModalController',
            size: 'sm',
            resolve: {
                items: function() {
                    return $scope.profileId;
                }
            }
        });

        modalInstance.result.then(function(items) {
            console.log(items)
            $scope.getProfileEnquiries();
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}]);

