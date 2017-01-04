angular.module('mean.auth').factory("$ProfileService", ['$http', '$LocalService', 'AccessLevels', '$localStorage', function($http, $LocalService, AccessLevels, $localStorage) {

    return {
        get: function(id, cb) {
            $http.get('/profile/'+id)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        imageUpload: function(data, cb) {
            $http.post('/profile/uploadIMage', data, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        createProfile: function(data, cb) {
            $http.post('/profile/create',data)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        updateProfile: function(data, cb) {
            $http.post('/profile/update/'+data.UserId, data)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        }

    }

}]);
