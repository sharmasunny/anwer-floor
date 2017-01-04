angular.module('mean.auth').factory("$SessionService", ['$http','$injector', function ($http ,$injector) {
	var LocalService = $injector.get('$LocalService');
     return {
          user: function() {
               var authUser = angular.fromJson(LocalService.get('auth_user'));
               if (authUser && authUser != undefined) {
                    return authUser.result;
               } else {
                    return {};
               }
          },
          getUser: function(){
               var authUser = angular.fromJson(LocalService.get('auth_user'));
               if (authUser && authUser != undefined) {
                    return authUser;
               } else {
                    return {};
               }
          }
     }

}]);