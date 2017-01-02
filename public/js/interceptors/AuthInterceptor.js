angular.module('mean').config(['$httpProvider', function($httpProvider) {

     function AuthUserInterceptor ($q, $injector) {
          return {
               request: function(config) {
                    var LocalService = $injector.get('$LocalService');
                    if (LocalService.get('auth_user') && LocalService.get('auth_user') != 'undefined') {
                         var token;
                         token = angular.fromJson(LocalService.get('auth_user')).token;
                         if (token) {
                              config.headers.Authorization = 'BearerS ' + token;
                         }

                    }
                    return config;
               },
               responseError: function(response) {
                     var LocalService = $injector.get('$LocalService');
                    if (response.status === 403 || response.status === 401) {
                         LocalService.unset('auth_user');
                         var msg = (response.data && response.data.err) ? response.data.err : response.err;
                         $injector.get('$state').go('anon.home',{message:{resStatus:"error",msg : msg, isSession : false}});

                    } else if (response.status === 404) {
                         $injector.get('$state').go('anon.404');
                    } else if (response.status === 500) {
                         $injector.get('$state').go('anon.500');
                    }
                    return $q.reject(response);
               }
          }
     }

     $httpProvider.interceptors.push(AuthUserInterceptor);
}]);
