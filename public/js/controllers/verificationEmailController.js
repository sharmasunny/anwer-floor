angular.module('mean.system').controller('VerificationEmailController', ['$scope', 'Global','$rootScope', '$stateParams', '$state', '$AuthService', '$localStorage', '$SessionService', '$LocalService','FlashService','$uibModal','$log','SignOut', function ($scope, Global, $rootScope, $stateParams, $state, $AuthService, $localStorage, $SessionService, $LocalService,FlashService,$uibModal , $log, SignOut) {
    $scope.global = Global;
     var verifyEmail = function(){
          $AuthService.confirmEmail($stateParams.token,function (response) {
               var serverMsg;
               console.log($SessionService.user(),'SessionService');
               if(response.resStatus == "error") {
                    serverMsg = {resStatus : response.resStatus, msg: response.msg};
                    $scope.serverMsg = serverMsg;
                    $state.go("anon.home", {message: serverMsg});
               } else if(response.resStatus == "success") {
                    serverMsg = {resStatus : response.resStatus, msg: response.msg};
                    if ($SessionService.user().id) {
                         $state.go("user.account", {message:serverMsg});
                    } else {
                         $LocalService.set('auth_user', JSON.stringify(response));
                         $scope.$emit('UpdateSession', {message: response.result});
                         $state.go("anon.home", {message: serverMsg});
                    }
               }
          })
     }
     if($state.current.name == 'anon.verifyEmail') {
          verifyEmail();
     }

}]); 
