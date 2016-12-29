angular.module('mean', ["xeditable", "ui.select", 'ngCookies', 'ngMessages', 'ngMeta', 'ngResource', 'ui.router', 'uiRouterStyles', 'ui.bootstrap', 'ui.route', 'ngStorage', 'mean.system', 'mean.articles', 'mean.auth', 'satellizer', 'angularFblogin', 'ngLodash'])
    .config(function($authProvider, ngMetaProvider) {

        $authProvider.google({
            clientId: '679573960512-p0125ptjv3pqid6j51ji1u1g3ene9m41.apps.googleusercontent.com',
            url: '/address-book',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin + '/address-book',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['https://www.google.com/m8/feeds'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 }
        });

        $authProvider.yahoo({
            clientId:'dj0yJmk9enJES1hibFR0WXFkJmQ9WVdrOWRuTlRlRUZ6TjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xNw--',
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            redirectUri: window.location.origin+'/address-book',
            scope: ['Contacts'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 559, height: 519 }
        });

    })
    .run(['$rootScope', '$state', '$localStorage', '$AuthService', '$SessionService', 'SITE_CONSTANTS', '$anchorScroll', '$anchorScroll', '$templateCache', function($rootScope, $state, $localStorage, $AuthService, $SessionService, SITE_CONSTANTS, $anchorScroll, $templateCache) {

        $rootScope.SITEURL = SITE_CONSTANTS.LOCALURl;
        $rootScope.$on('UpdateSession', function(event, args) {
            $rootScope.$broadcast('ReceiveSessionMessage', args);
        });


        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
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
