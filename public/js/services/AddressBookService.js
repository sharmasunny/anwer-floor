angular.module('mean.auth').factory("$AddressBookService", ['$http', '$LocalService', 'AccessLevels', '$localStorage', function($http, $LocalService, AccessLevels, $localStorage) {

    return {
        create: function(data, cb) {
            $http.post('/address-book/create', data)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        getOneAddressBook: function(id,cb){
        	$http.get('/address-book/'+id)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        getAllAddressBook: function(userid,cb){
        	$http.get('/address-book/all/'+userid)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        updateAddressBook: function(id,data,cb){
        	$http.post('/address-book/update/'+id,data)
        		.then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        deleteAddressBook: function(id,cb){
        	$http.get('/address-book/delete/'+id)
        		.then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        }

    }

}]);
