angular.module('mean.system').controller('VerificationController', ['$scope', 'Global','$rootScope', '$stateParams', '$state', '$AuthService', '$localStorage', '$SessionService', '$LocalService','FlashService','$uibModal','$log','SignOut', function ($scope, Global, $rootScope, $stateParams, $state, $AuthService, $localStorage, $SessionService, $LocalService,FlashService,$uibModal , $log, SignOut) {
    $scope.global = Global;

    $scope.session = function(){
      var authUser = $SessionService.user();
      if(Object.keys(authUser).length) {
          $scope.authUser = authUser;
      }
      $scope.isAuthenticated = (authUser && authUser.id) ? true : false;
    }

    $scope.session();

    $scope.animationsEnabled = true;

    // logout
    $scope.logout = function() {
      $AuthService.logout($scope.authUser.id, function (response) {
          console.log(response,'response');
           if(response == true) {
                $scope.isAuthenticated = false;
                $state.go('anon.home');
           }
      });
    }

    // login
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

      modalInstance.result.then(function (serverMsg) {
        $scope.selected = serverMsg;
        $state.go("user.studentProfile");
        $scope.session();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    // register
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

      modalInstance.result.then(function (serverMsg) {
        $scope.serverMsg = serverMsg;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }


}]);


angular.module('mean.system').controller('SignInController', ['$scope','$window', 'Global','$uibModalInstance', 'items','$AuthService','FlashService','$RememberService', function ($scope ,$window ,Global ,$uibModalInstance ,items ,$AuthService,FlashService,$RememberService) {
    $scope.global = Global;
    $scope.user ={};
  $scope.signIn = function() {
        $AuthService.login($scope.user, function (response) {
               FlashService.show();
               var serverMsg = {resStatus : response.resStatus, msg: response.msg}
               if(response.resStatus == "error") {
                   
                    $scope.serverMsg = serverMsg;
                    
               } else if(response.resStatus == "success") {
                    var serverMsg = {resStatus : response.resStatus, msg: response.msg, verifyId : response.result.id};
                    if ($scope.user.remember_me) {
                         $RememberService('email', $scope.user.email);
                         $RememberService('password', $scope.user.password);
                    } else {
                         $RememberService('email', '');
                         $RememberService('password', '');
                    }
                    $scope.$emit('UpdateSession', {message: response.result});
                    $uibModalInstance.close(serverMsg);
               }
              FlashService.hide();             

          });

    };
 
    
    if($RememberService('email')  ) {
          $scope.user.remember_me = true;
          $scope.user.email = $RememberService('email');
          $scope.user.password = $RememberService('password');
     }


  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);


angular.module('mean.system').controller('SignUpController', ['$scope','$window' ,'Global','$uibModalInstance', 'items','$AuthService','FlashService','$timeout', function ($scope ,$window ,Global ,$uibModalInstance ,items ,$AuthService, FlashService,$timeout) {
    $scope.global = Global;

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.signUp = function(user) {
        $AuthService.register($scope.user, function (response) {
               FlashService.show();
               var serverMsg = {resStatus : response.resStatus, msg: response.msg};
               if(response.resStatus == "error") {
                    console.log('error');
                    $scope.serverMsg = serverMsg;
               } else if(response.resStatus == "success") {
                    serverMsg = {resStatus : response.resStatus, msg:'Please check your email and verify your Email Address', verifyId : response.result};
                    $scope.serverMsg = serverMsg;
                    $scope.$emit('UpdateSession', {message: response.result});
                    $timeout(function(){
                      $uibModalInstance.close(serverMsg);
                    }, 5000);
               }
               FlashService.hide();
        });
  };

}]);