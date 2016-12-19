angular.module('mean.system').controller('defaultHeaderController', ['$scope', 'Global','$uibModal','$log','SignOut', function ($scope, Global, $uibModal, $log,SignOut) {
    $scope.global = Global;

      $scope.animationsEnabled = true;

    $scope.signIn = function (size){
    	
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'loginform.html',
	      controller: 'SignInController',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selected) {
	      $scope.selected = selected;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	}


	$scope.signUp = function (size){
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'signform.html',
	      controller: 'SignUpController',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selected) {
	      $scope.selected = selected;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	}



    $scope.SignOut = function(){
        SignOut.get(function(response){
            if(response.status === 'success'){
                $scope.global = null;
                //$state.go('home');
            }
        });
	}

}]);