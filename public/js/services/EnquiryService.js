angular.module('mean.auth').factory("$EnquiryService", ['$http', '$LocalService', 'AccessLevels', '$localStorage', function($http, $LocalService, AccessLevels, $localStorage) {

    return {
        get: function(cb) {
            $http.get('/enquiry/getAll')
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        getProfileId: function(id,cb) {
            $http.get('/enquiry/getProfileId/' + id)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },
        createEnquiry: function(data, cb) {
            $http.post('/enquiry/create',data)
                .then(function successCallback(response) {
                    cb(response.data);
                }, function errorCallback(response) {
                    cb(response.data);
                });
        },

    }

}]);
