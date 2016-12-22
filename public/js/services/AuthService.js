angular.module('mean.auth').factory("$AuthService", ['$http', '$LocalService', 'AccessLevels', '$localStorage', function ($http, $LocalService, AccessLevels, $localStorage) {
     return {
          authorize: function(access) {
               if (access === AccessLevels.user) {
                    return this.isAuthenticated();
               } else {
                    return true;
               }
          },
          isAuthenticated: function() {
               if($LocalService.get('auth_user')) {
                    return ($LocalService.get('auth_user'));
               }
          },
          unLink : function(userId, type, cb) {
               var serviceInstance = $http.get('/auth/unlink/'+userId + '/' + type);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          login: function(credentials, cb) {
               $http.post('/auth/login', credentials)
               .then(function successCallback(response) {
                    if(response.data.resStatus == "success") {
                         if(response.data.result.role == "USER") {
                              $LocalService.set('auth_user', JSON.stringify(response.data));
                         }
                    }
                    cb(response.data);

               }, function errorCallback(response) {
                    cb(response.data);
               });
          },

          logout: function(userId, cb) {
               $http.post('/auth/logOut',{id:userId})
               .then(function successCallback(response) {

                    if(response.data.resStatus == "success") {
                        $LocalService.unset('auth_user');
                         cb(true);
                    }
               }, function errorCallback(response) {
                    cb(response.data);
               });
          },
          register: function(formData, cb) {
               $LocalService.unset('auth_user');
               $http.post('/auth/register', formData)
               .then(function successCallback(response) {
                    if(response.data.resStatus == "success") {
                         if(response.data.result.role == "USER") {
                              $LocalService.set('auth_user', JSON.stringify(response.data));
                         }
                    }
                    cb(response.data);

                 }, function errorCallback(response) {
                    cb(response.data);
                 });
               
          },

          confirmEmail: function(token,cb) {
               var emailConf = $http.post('/auth/varifyEmail',{token:token})
               .then(function successCallback(response) {
                    cb(response.data);
               }, function errorCallback(response) {
                    cb(response.data);
               });
          },

          confirmOtp: function(formData, cb) {
               var serviceInstance = $http.post('/auth/confirmAccount',formData);
               serviceInstance.success(function(response) {
                    if(response.resStatus == "success") {
                         if(response.result.role == "USER") {
                              $LocalService.set('auth_user', JSON.stringify(response));
                         }
                    }
                    cb(response);
               });
          },
          confirmOtpForgot: function(formData, cb) {
               var serviceInstance = $http.post('/auth/confirmAccountForgot',formData);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          reSendOtp: function(formData, cb) {
               var serviceInstance = $http.post('/auth/reSendOtp', formData);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          forgot: function(formData, cb) {
               var serviceInstance = $http.post('/auth/forgot-password', formData);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          verifyByEmail: function(activationToken,email, cb) {
               var serviceInstance = $http.get('/auth/verifyByEMail?token='+activationToken+'&email='+email);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          verifyByReset: function(activationToken,email, cb) {
               var serviceInstance = $http.get('/auth/verifyByReset?token='+activationToken+'&email='+email);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },

          resetPassword: function(postData, cb) {
               var serviceInstance = $http.post('/auth/resetPassword', postData);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          checkUniqueEmail : function (reqEmail, cb) {
               var serviceInstance = $http.get('/auth/checkUniqueEmail/?reqEmail='+reqEmail);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },
          checkUniqueMobile : function (reqMobile, cb) {
               var serviceInstance = $http.get('/auth/checkUniqueMobile/?reqMobile='+reqMobile);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },

          viewSeeker: function(reqId, cb) {
               var serviceInstance = $http.get('/auth/Api/seeker_profile/?reqId='+reqId);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },

          viewUser: function(reqId, cb) {
               var serviceInstance = $http.get('/auth/Api/user_profile/?reqId='+reqId);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          },

          getNotificationCount: function(reqId, cb) {
               var serviceInstance = $http.get('/auth/Api/getNotificationCount/?reqId='+reqId);
               serviceInstance.success(function(response) {
                    cb(response);
               });
          }


     }
}]);