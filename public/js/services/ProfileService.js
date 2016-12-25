angular.module('mean.auth').factory("$ProfileService", ['$http', '$LocalService', 'AccessLevels', '$localStorage', function ($http, $LocalService, AccessLevels, $localStorage) {

	return {
		get: function(id, cb){
			 $http.get('/profile/1')
               .then(function successCallback(response) {
                    cb(response.data);
               }, function errorCallback(response) {
                    cb(response.data);
               });
		}

	}  

 }]);