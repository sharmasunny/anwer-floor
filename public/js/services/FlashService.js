angular.module('mean.auth').factory("FlashService", ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	return {
               hide : function() {
                    $timeout(function(){
                         $rootScope.statusMsg = false;
                    }, 5000);
               },
               show : function () {
                    $rootScope.statusMsg = true;
               }
          }

}]);