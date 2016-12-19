angular.module('mean.system').controller('homeHeaderController', ['$scope', 'Global','$uibModal','$log','SignOut', function ($scope, Global ,$uibModal , $log, SignOut) {
    $scope.global = Global;
 console.log( Global);
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


angular.module('mean.system').controller('SignInController', ['$scope','$window', 'Global','$uibModalInstance', 'items','LogIn', function ($scope ,$window ,Global ,$uibModalInstance ,items ,LogIn) {
    $scope.global = Global;

	$scope.signIn = function(user) {
        var logIn = new LogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function(response) {
            if(response.status === 'success'){

            	console.log({authenticated:true,user:response.user});
                $scope.global = {authenticated:true,user:response.user};
          		
                $uibModalInstance.close('success');
                //$window.location.reload();
            }else{

            }
        });
    };


	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

}]);

angular.module('mean.system').controller('SignUpController', ['$scope','$window' ,'Global','$uibModalInstance', 'items','SignUp', function ($scope ,$window ,Global ,$uibModalInstance ,items ,SignUp) {
    $scope.global = Global;

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.signUp = function(user) {

        var signUp = new SignUp({
            firstname: user.firstname,
            lastname:user.lastname,
            email: user.email,
            phone:user.phone,
            password : user.password
        });

        signUp.$save(function(response) {
            if(response.status === 'success'){
            	 $scope.global =  {authenticated:true,user:response.user};
            	$uibModalInstance.close('success');
            	//$window.location.reload();
            }
        });
    };

}]);