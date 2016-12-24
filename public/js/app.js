angular.module('mean', ["xeditable", "ui.select",'ngCookies', 'ngMessages', 'ngMeta','ngResource', 'ui.router','uiRouterStyles','ui.bootstrap', 'ui.route','ngStorage', 'mean.system', 'mean.articles', 'mean.auth','satellizer','angularFblogin'])
.config(function ($authProvider,ngMetaProvider) {

    $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri:  'http://localhost:3000/auth/twitter/callback',
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    });

    $authProvider.google({
        clientId: 'your google client id here', // google client id
        url: '/auth/google',
        redirectUri: 'http://localhost:3000/auth/google/callback'
    });

})
.run(['$rootScope', '$state', '$localStorage', '$AuthService', '$SessionService','SITE_CONSTANTS','$anchorScroll','$anchorScroll','$templateCache', function($rootScope, $state, $localStorage, $AuthService, $SessionService, SITE_CONSTANTS, $anchorScroll, $templateCache) {

          $rootScope.SITEURL = SITE_CONSTANTS.LOCALURl;
          $rootScope.$on('UpdateSession', function(event, args) {
               $rootScope.$broadcast('ReceiveSessionMessage', args);
          });

        
          $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
               $anchorScroll();
               if (!$AuthService.authorize(toState.data.access)) {
                    event.preventDefault();
                    $state.go('anon.home');
               }

               // if(Object.keys($SessionService.user()).length > 0) {
               //      if(toState.name == "anon.home") {
               //           event.preventDefault();
               //           $state.go("user.account");
               //      }
               // }
          });

}])
.run(['ngMeta', function(ngMeta) { 
  ngMeta.init();
}]);


angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.auth', []);


